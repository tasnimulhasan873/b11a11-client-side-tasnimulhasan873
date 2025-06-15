// ✅ Correct order: define 'app' first, then use it

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCItZ7MbXXR7Hn_F1evjBEDhFgumTh63xs",
  authDomain: "foodsharing-34cc3.firebaseapp.com",
  projectId: "foodsharing-34cc3",
  storageBucket: "foodsharing-34cc3.appspot.com",
  messagingSenderId: "71387349627",
  appId: "1:71387349627:web:e63ff5b7434378d36f58de"
};

// ✅ Initialize app first
const app = initializeApp(firebaseConfig);

// ✅ Then export auth after 'app' is defined
export const auth = getAuth(app);
