import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export function firebaseAdmin() {
  const existing = getApps().find(app => app.name === 'algofort-admin');
  if (existing) return existing;
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!encoded) throw new Error('Firebase server configuration is missing.');
  const credentials = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  return initializeApp({ credential: cert(credentials), projectId: credentials.project_id }, 'algofort-admin');
}
export function database() { return getFirestore(firebaseAdmin()); }
export function adminAuth() { return getAuth(firebaseAdmin()); }
