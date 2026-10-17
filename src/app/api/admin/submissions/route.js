import { database } from '../../../../lib/server/firebase';
import { requireAdmin, readBody, adminError, HttpError } from '../../../../lib/server/adminAccess';
import { deliverSubmission } from '../../../../lib/server/submissions';
export async function POST(request) {
  try {
    await requireAdmin(request, 'submissions'); const body = await readBody(request);
    if (!/^[\w-]{1,100}$/.test(body.id)) throw new HttpError(400, 'Invalid enquiry.');
    const ref = await database().collection('submissions').doc(body.id).get();
    if (!ref.exists) throw new HttpError(404, 'Enquiry not found.');
    if (ref.data().deliveryLeaseUntil > Date.now()) throw new HttpError(409, 'Email delivery is already in progress.');
    await deliverSubmission({ ...ref.data(), id: ref.id });
    const updated = await ref.ref.get();
    return Response.json({ ok: true, delivery: updated.data().delivery });
  } catch (error) { return adminError(error); }
}
export async function GET(request) {
  try {
    await requireAdmin(request, 'submissions');
    const store = database(); let query = store.collection('submissions').orderBy('createdAt', 'desc').limit(40);
    const cursor = new URL(request.url).searchParams.get('cursor');
    if (cursor) { if (!/^[\w-]{1,100}$/.test(cursor)) throw new HttpError(400, 'Invalid cursor.'); const doc = await store.collection('submissions').doc(cursor).get(); if (!doc.exists) throw new HttpError(400, 'Invalid cursor.'); query = query.startAfter(doc); }
    const snapshot = await query.get();
    return Response.json({ submissions: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })), cursor: snapshot.size === 40 ? snapshot.docs.at(-1).id : null }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return adminError(error); }
}
export async function PATCH(request) {
  try {
    const user = await requireAdmin(request, 'submissions'); const body = await readBody(request);
    if (!/^[\w-]{1,100}$/.test(body.id) || !['new', 'in-progress', 'replied', 'archived'].includes(body.status) || typeof body.notes !== 'string' || body.notes.length > 5000) throw new HttpError(400, 'Invalid status or notes.');
    await database().collection('submissions').doc(body.id).update({ status: body.status, notes: body.notes, updatedAt: new Date().toISOString(), updatedBy: user.uid });
    return Response.json({ ok: true });
  } catch (error) { return adminError(error); }
}
