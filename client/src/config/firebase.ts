import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

/**
 * Firebase is used only to authenticate the admin (you) for the
 * protected /admin routes. Visitors never touch Firebase, and the public
 * portfolio must keep working even if these values are still blank —
 * so initialization here is defensive on purpose.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
  } catch (err) {
    console.warn('[firebase] failed to initialize:', (err as Error).message);
  }
} else if (import.meta.env.DEV) {
  console.warn(
    '[firebase] Not configured yet — /admin login is disabled until you add your Firebase credentials to client/.env (see .env.example).'
  );
}

export { auth, isFirebaseConfigured };
