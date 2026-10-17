import { requireAdmin, adminError } from '../../../../lib/server/adminAccess';
export async function GET(request) {
  try { const user = await requireAdmin(request); return Response.json({ email: user.email, uid: user.uid, role: user.role }, { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) { return adminError(error); }
}
