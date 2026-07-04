import admin from 'firebase-admin';

/**
 * Firebase Admin SDK — used only to verify the ID token the client sends
 * during /api/auth/login. Requires a service account with at least the
 * "Firebase Authentication Admin" role. See the root README for how to
 * generate these three values from your Firebase project settings.
 */
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Private keys in .env files need their newlines escaped as \n — unescape them here.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

export const isFirebaseAdminConfigured = Boolean(projectId && clientEmail && privateKey);

if (isFirebaseAdminConfigured && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
} else if (!isFirebaseAdminConfigured) {
  console.warn(
    '[firebase-admin] Not configured — admin login will fail until FIREBASE_PROJECT_ID, ' +
      'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are set in server/.env'
  );
}

export default admin;
