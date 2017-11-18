export const firebaseKey    = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
export const backendBaseUrl = process.env.BACKEND_BASE_URL || 'localhost:3000/';
export const logLevel   = process.env.LOG_LEVEL || process.env.NODE_ENV === 'development' ? 'trace' : 'silent';
