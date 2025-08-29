import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC4c9XCWJm21xPz-ZClsJbcql8A3KP58bo",
  authDomain: "solsolhan-hankki-v2.firebaseapp.com",
  projectId: "solsolhan-hankki-v2",
  storageBucket: "solsolhan-hankki-v2.firebasestorage.app",
  messagingSenderId: "719329564465",
  appId: "1:719329564465:web:5fc279dbc864f2f4b8c210",
  measurementId: "G-BQNTZML441",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);