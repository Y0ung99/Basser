import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithPopup, 
         GoogleAuthProvider, 
         signOut,
         onAuthStateChanged  } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();

export function login() {
  signInWithPopup(auth, provider).catch(console.log);
}

export function logout() {
  signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  })
}

export function writeProductData(product, cld) {
  const {name, price, category, desc, options} = product;
  const {public_id, secure_url} = cld;
  return set(ref(db, 'products/' + public_id), {
    id: public_id,
    name,
    price: parseInt(price),
    image: secure_url,
    category,
    discription: desc,
    options: options.split(','),
  });
}

export async function readProductData() {
  return get(ref(db, 'products'))
  .then(snapshot => {
    if(snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return []
  });
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

export async function getCart(userId) {
  return get(ref(db, `carts/${userId}`))
  .then(snapshot => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(product, userId) {
  if (!userId) throw Error('로그인을 하면 장바구니를 이용할 수 있습니다.');
  return set(ref(db, `carts/${userId}/${product.id}`), product)
}

export async function removeFromCart(productId, userId) {
  return remove(ref(db, `carts/${userId}/${productId}`))
}

export async function writePaymentResult(order) {
  return await set(ref(db, `payment/complete/${order.paymentId}`), order);
}