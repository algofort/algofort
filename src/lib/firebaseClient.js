import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export function clientAuth() {
  const app = getApps().length ? getApp() : initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBEsRew4ITMYgLFBBvvz42EKpggf36U0Gk',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'algofort-f0745.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'algofort-f0745',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'algofort-f0745.firebasestorage.app',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '767688399013',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:767688399013:web:5719eaadc9f493a8b5554c',
  });
  return getAuth(app);
}
