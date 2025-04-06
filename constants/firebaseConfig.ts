// constants/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6XdH-1uJnp4EkzIEYbFzbJdKdggXKnrA",
  authDomain: "mentalist-9db5a.firebaseapp.com",
  projectId: "mentalist-9db5a",
  storageBucket: "mentalist-9db5a.firebasestorage.app",
  messagingSenderId: "681268079100",
  appId: "1:681268079100:android:2772cb9782ab68d65e6a79"
};

// Uygulamayı başlat
//const app = initializeApp(firebaseConfig);

// Firebase servislerini dışa aktar
//export const auth = getAuth(app);
//export const db = getFirestore(app);
//export const app = initializeApp(firebaseConfig);

let app: FirebaseApp;

try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase başarıyla yüklendi");
} catch (error) {
  console.error("Firebase yüklenemedi:", error);
  throw error; // kritik hata varsa uygulamayı durdur
}

// ❗ Burada app garanti edildiği için Firestore güvenle alınabilir
const db = getFirestore(app);

export { app, db };
