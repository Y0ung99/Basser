import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithPopup, 
         GoogleAuthProvider, 
         signOut,
         onAuthStateChanged  } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const login = () => {
  signInWithPopup(auth, provider).catch(console.log);
}

export const logout = () => {
  signOut(auth);
}

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => callback(user))
}
