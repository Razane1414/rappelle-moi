import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuration de Firebase (depuis ta console Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAIc3uyyoyeLCenPyPcEP26D3LfB0IWWAc",
  authDomain: "rappelle-moi-c17e6.firebaseapp.com",
  projectId: "rappelle-moi-c17e6",
  storageBucket: "rappelle-moi-c17e6.firebasestorage.app",
  messagingSenderId: "942639587881",
  appId: "1:942639587881:web:5a6baf25404404a87f3238"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
export const db = getFirestore(app);
