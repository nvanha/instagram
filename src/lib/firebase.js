import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// here is where I want to call the seed file (only ONCE!)
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyDwqCeF0jrRL3TQttuVt6D76zjbCnJy_Qw",
  authDomain: "instagram-nvha.firebaseapp.com",
  projectId: "instagram-nvha",
  storageBucket: "instagram-nvha.appspot.com",
  messagingSenderId: "406995634453",
  appId: "1:406995634453:web:235044693f01bdeb86811c",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where I want to call the seed file (only ONCE!)
// seedDatabase(firebase);

export { firebase, FieldValue };
