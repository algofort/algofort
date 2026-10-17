import { readSiteSettings } from '../../../lib/server/siteSettingsStore';
export const runtime = 'nodejs';
export async function GET() {
  try {
    return Response.json(await readSiteSettings(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Contact settings are temporarily unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
