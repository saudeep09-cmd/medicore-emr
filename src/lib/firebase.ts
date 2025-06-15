
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyWzxPCtE84tkWLw-W24ZWCicf0LBjvnw",
  authDomain: "medicore-emr-50f54.firebaseapp.com",
  projectId: "medicore-emr-50f54",
  storageBucket: "medicore-emr-50f54.firebasestorage.app",
  messagingSenderId: "250774993144",
  appId: "1:250774993144:web:66e136cf8681b253fea30d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
