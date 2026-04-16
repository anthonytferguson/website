import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase SDK
let app: ReturnType<typeof initializeApp>;
let db: ReturnType<typeof getFirestore>;
let auth: ReturnType<typeof getAuth>;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Create fallback instances so the app doesn't crash
  app = initializeApp(firebaseConfig, 'fallback');
  db = getFirestore(app);
  auth = getAuth(app);
}

export { db, auth };
