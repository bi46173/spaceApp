import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqRcp88zhXuIcE9Vm4bO7W2g45UQbDN_8",
  authDomain: "spacex-afa29.firebaseapp.com",
  projectId: "spacex-afa29",
  storageBucket: "spacex-afa29.appspot.com",
  messagingSenderId: "655258655812",
  appId: "1:655258655812:web:1ff152631bb8ffe76b3011",
  measurementId: "G-GV569C6369",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
