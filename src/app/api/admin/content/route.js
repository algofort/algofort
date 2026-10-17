import { database } from '../../../../lib/server/firebase';
import { requireAdmin, readBody, adminError, HttpError } from '../../../../lib/server/adminAccess';
import { readPortfolio } from '../../../../lib/server/portfolioStore';

export const runtime = 'nodejs';
const idPattern = /^[a-zA-Z0-9_-]{1,100}$/;
function url(value, optional = false) {
  if (optional && !value) return '';
  try { const parsed = new URL(value); if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password || value.length > 2000) throw Error(); return parsed.href; }
  catch { throw new HttpError(400, 'Enter a valid image or website URL.'); }
}
export async function GET(request) {
  try { await requireAdmin(request, 'portfolio'); return Response.json(await readPortfolio(true), { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) { return adminError(error); }
}
export async function POST(request) {
  try {
    const user = await requireAdmin(request, 'portfolio');
    const body = await readBody(request);
    const store = database();
    if (body.type === 'category') {
      const id = String(body.id || ''); const label = String(body.label || '').trim();
      if (!idPattern.test(id) || label.length < 1 || label.length > 60) throw new HttpError(400, 'Enter a category label and a valid ID.');
      const category = { label, sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0, updatedAt: new Date().toISOString(), updatedBy: user.uid };
      await store.runTransaction(async tx => {
        const ref = store.collection('portfolioCategories').doc(id); const current = await tx.get(ref);
        if (body.create && current.exists) throw new HttpError(409, 'This category ID already exists.');
        tx.set(ref, category);
      });
      return Response.json({ ok: true });
    }
    if (body.type !== 'project') throw new HttpError(400, 'Invalid content type.');
    const data = body.data || {}; const title = String(data.title || '').trim();
    const category = Array.isArray(data.category) ? [...new Set(data.category)] : [];
    if (!title || title.length > 160 || category.length > 12 || category.some(id => typeof id !== 'string' || !idPattern.test(id)) || !['home', 'portfolio'].includes(data.placement) || !['draft', 'published', 'archived'].includes(data.status)) throw new HttpError(400, 'Check title, categories, placement and status.');
    if (data.placement === 'portfolio' && !category.length) throw new HttpError(400, 'Select at least one category.');
    const image = url(data.image); if (new URL(image).hostname !== 'res.cloudinary.com') throw new HttpError(400, 'Upload an image or use a Cloudinary image URL.');
    const tags = Array.isArray(data.tags) ? data.tags.map(tag => String(tag).trim()).filter(Boolean) : [];
    if (tags.length > 10 || tags.some(tag => tag.length > 60) || String(data.description || '').length > 1000) throw new HttpError(400, 'Description or tags are too long.');
    const id = body.id || store.collection('portfolioProjects').doc().id;
    if (!idPattern.test(id)) throw new HttpError(400, 'Invalid project ID.');
    const record = { title, image, liveUrl: url(data.liveUrl, true), category, tags, description: String(data.description || '').trim(), placement: data.placement, status: data.status, sortOrder: Number.isFinite(Number(data.sortOrder)) ? Number(data.sortOrder) : 0, updatedAt: new Date().toISOString(), updatedBy: user.uid };
    await store.runTransaction(async tx => {
      for (const categoryId of category) {
        const doc = await tx.get(store.collection('portfolioCategories').doc(categoryId));
        if (!doc.exists) throw new HttpError(400, 'One of the selected categories no longer exists.');
      }
      const ref = store.collection('portfolioProjects').doc(id); const previous = await tx.get(ref);
      if (body.id && !previous.exists) throw new HttpError(404, 'Project not found.');
      tx.set(ref, { ...record, createdAt: previous.data()?.createdAt || new Date().toISOString() }, { merge: true });
    });
    return Response.json({ ok: true, id });
  } catch (error) { return adminError(error); }
}
export async function DELETE(request) {
  try {
    await requireAdmin(request, 'portfolio'); const body = await readBody(request);
    if (body.type !== 'category' || !idPattern.test(body.id)) throw new HttpError(400, 'Invalid category.');
    const store = database();
    await store.runTransaction(async tx => {
      const projects = await tx.get(store.collection('portfolioProjects').where('category', 'array-contains', body.id).limit(1));
      if (!projects.empty) throw new HttpError(409, 'Move projects out of this category before deleting it.');
      tx.delete(store.collection('portfolioCategories').doc(body.id));
    });
    return Response.json({ ok: true });
  } catch (error) { return adminError(error); }
}
