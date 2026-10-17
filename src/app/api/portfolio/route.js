import { readPortfolio, publicPortfolio } from '../../../lib/server/portfolioStore';
export const runtime = 'nodejs';
export async function GET() {
  try { return Response.json(publicPortfolio(await readPortfolio()), { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) { console.error('Portfolio unavailable:', error.code || error.name); return Response.json({ error: 'Portfolio temporarily unavailable.' }, { status: 503 }); }
}
