import { database } from '../../../../lib/server/firebase';
import { readSiteSettings } from '../../../../lib/server/siteSettingsStore';
import { requireAdmin, readBody, adminError, HttpError } from '../../../../lib/server/adminAccess';

export const runtime = 'nodejs';
export async function GET(request) {
  try {
    await requireAdmin(request, 'settings');
    return Response.json(await readSiteSettings(), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return adminError(error); }
}
export async function PUT(request) {
  try {
    const user = await requireAdmin(request, 'settings');
    const body = await readBody(request);
    if (typeof body.whatsappNumber !== 'string' || body.whatsappNumber.length > 40 || !/^\+?[\d\s().-]+$/.test(body.whatsappNumber)) throw new HttpError(400, 'Enter a WhatsApp number with its country code.');
    const digits = body.whatsappNumber.replace(/[\s().+-]/g, '');
    if (!/^[1-9]\d{7,14}$/.test(digits)) throw new HttpError(400, 'Use 8–15 digits including the country code, without a leading zero.');
    if (typeof body.whatsappEnabled !== 'boolean' || typeof body.whatsappMessage !== 'string' || body.whatsappMessage.length > 500) throw new HttpError(400, 'Check the visibility setting and message (maximum 500 characters).');
    const settings = { whatsappNumber: `+${digits}`, whatsappEnabled: body.whatsappEnabled, whatsappMessage: body.whatsappMessage.trim() };
    await database().collection('siteSettings').doc('contact').set({ ...settings, updatedAt: new Date().toISOString(), updatedBy: user.uid }, { merge: true });
    return Response.json(settings, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return adminError(error); }
}
