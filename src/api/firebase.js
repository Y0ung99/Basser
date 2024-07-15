import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithPopup, 
         GoogleAuthProvider, 
         signOut,
         onAuthStateChanged  } from "firebase/auth";
         import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();

export const login = () => {
  signInWithPopup(auth, provider).catch(console.log);
}

export const logout = () => {
  signOut(auth);
}

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  })
}

async function adminUser(user) {
  return get(ref(db, 'admins'))
  .then((snapshot) => {
    if(snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return {...user, isAdmin};
    }
    return user;
  });
}