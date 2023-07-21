import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABntFa_rz-pQIs1I4Dwt8Oco9bWzfSrLY",
  authDomain: "amigos-chat-702e0.firebaseapp.com",
  projectId: "amigos-chat-702e0",
  storageBucket: "amigos-chat-702e0.appspot.com",
  messagingSenderId: "434443174525",
  appId: "1:434443174525:web:badab12995a7a56f5f6714",
  measurementId: "G-BHJX43919Q"
};

export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);