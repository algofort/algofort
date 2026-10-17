import { randomBytes } from 'node:crypto';
import { adminAuth, database } from '../../../../lib/server/firebase';
import { requireAdmin, readBody, adminError, HttpError } from '../../../../lib/server/adminAccess';
import { mailTransport, sender } from '../../../../lib/server/mail';
import { invitationEmail } from '../../../../lib/server/emailTemplates';

const roles = ['owner', 'editor', 'support'];
async function invite(email, role) {
  const link = await adminAuth().generatePasswordResetLink(email);
  const transport = await mailTransport();
  try {
    const result = await transport.sendMail({ from: sender(), to: email, ...await invitationEmail(email, link, role) });
    if (!result.accepted?.length) throw Error('Invitation rejected');
  } finally { transport.close(); }
}
export async function GET(request) {
  try {
    await requireAdmin(request, 'users');
    const records = await database().collection('adminUsers').orderBy('createdAt', 'desc').get();
    return Response.json({ users: records.docs.map(doc => ({ ...doc.data(), id: doc.id })) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return adminError(error); }
}
export async function POST(request) {
  try {
    const actor = await requireAdmin(request, 'users'); const body = await readBody(request);
    if (body.action === 'invite') {
      if (typeof body.id !== 'string' || !/^[\w-]{1,128}$/.test(body.id)) throw new HttpError(400, 'Invalid user.');
      const profile = await database().collection('adminUsers').doc(body.id).get();
      if (!profile.exists || !profile.data().active) throw new HttpError(404, 'Active user not found.');
      await invite(profile.data().email, profile.data().role);
      return Response.json({ ok: true });
    }
    const email = String(body.email || '').trim().toLowerCase(); const displayName = String(body.displayName || '').trim();
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !displayName || displayName.length > 120 || !roles.includes(body.role)) throw new HttpError(400, 'Enter a name, valid email and role.');
    // Existing Firebase accounts must not gain workspace access implicitly.
    let user;
    try { user = await adminAuth().createUser({ email, displayName, password: randomBytes(24).toString('base64url'), emailVerified: false }); }
    catch (error) { if (error.code === 'auth/email-already-exists') throw new HttpError(409, 'This email already has an account. Manage its existing workspace profile.'); throw error; }
    try {
      await database().collection('adminUsers').doc(user.uid).create({ email, displayName, role: body.role, active: true, createdAt: new Date().toISOString(), createdBy: actor.uid });
    } catch (error) { await adminAuth().deleteUser(user.uid); throw error; }
    let invitationSent = true;
    try { await invite(email, body.role); } catch { invitationSent = false; }
    return Response.json({ ok: true, invitationSent });
  } catch (error) { return adminError(error); }
}
export async function PATCH(request) {
  try {
    const actor = await requireAdmin(request, 'users'); const body = await readBody(request);
    if (typeof body.id !== 'string' || !/^[\w-]{1,128}$/.test(body.id) || !roles.includes(body.role) || typeof body.active !== 'boolean') throw new HttpError(400, 'Invalid role or user.');
    if (body.id === actor.uid && (!body.active || body.role !== 'owner')) throw new HttpError(409, 'You cannot remove your own owner access.');
    const store = database(); const ref = store.collection('adminUsers').doc(body.id);
    const changed = await store.runTransaction(async tx => {
      const current = await tx.get(ref);
      const owners = await tx.get(store.collection('adminUsers').where('role', '==', 'owner'));
      if (!current.exists) throw new HttpError(404, 'User not found.');
      if (current.data().role === 'owner' && current.data().active && (!body.active || body.role !== 'owner') && owners.docs.filter(doc => doc.data().active).length <= 1) throw new HttpError(409, 'At least one active owner is required.');
      tx.update(ref, { role: body.role, active: body.active, updatedAt: new Date().toISOString(), updatedBy: actor.uid });
      return current.data().role !== body.role || current.data().active !== body.active;
    });
    await adminAuth().updateUser(body.id, { disabled: !body.active });
    if (changed) await adminAuth().revokeRefreshTokens(body.id);
    return Response.json({ ok: true });
  } catch (error) { return adminError(error); }
}
