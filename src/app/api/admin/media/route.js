import { requireAdmin, adminError, HttpError } from '../../../../lib/server/adminAccess';
export const runtime = 'nodejs';
export async function POST(request) {
  try {
    await requireAdmin(request, 'portfolio');
    if (Number(request.headers.get('content-length')) > 8500000) throw new HttpError(413, 'Image must be under 8 MB.');
    const file = (await request.formData()).get('file');
    if (!(file instanceof File) || file.size < 1 || file.size > 8 * 1024 * 1024 || !['image/jpeg','image/png','image/webp','image/avif'].includes(file.type)) throw new HttpError(400, 'Choose a JPG, PNG, WebP or AVIF image under 8 MB.');
    const bytes = Buffer.from(await file.arrayBuffer());
    const valid = bytes.subarray(0,3).equals(Buffer.from([255,216,255])) || bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || (bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP') || (bytes.toString('ascii',4,8) === 'ftyp' && /avif|avis/.test(bytes.toString('ascii',8,32)));
    if (!valid) throw new HttpError(400, 'Invalid image file.');
    const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
    if (!cloud || !key || !secret) throw new HttpError(503, 'Image upload is not configured.');
    const data = new FormData(); data.append('file', new Blob([bytes], { type: file.type }), 'portfolio-image'); data.append('folder', 'algofort/portfolio/admin');
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', headers: { Authorization: 'Basic ' + Buffer.from(key + ':' + secret).toString('base64') }, body: data, signal: AbortSignal.timeout(30000) });
    const result = await response.json(); if (!response.ok) throw new HttpError(502, 'Image upload failed.');
    return Response.json({ url: result.secure_url.replace('/upload/', '/upload/f_auto,q_auto:good/'), width: result.width, height: result.height });
  } catch (error) { return adminError(error); }
}
