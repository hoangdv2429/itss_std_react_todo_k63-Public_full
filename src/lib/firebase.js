import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6BcIMyDXr58k9UvQpCf07xCJL_J46OtQ",
  authDomain: "todos-4764c.firebaseapp.com",
  projectId: "todos-4764c",
  storageBucket: "todos-4764c.appspot.com",
  messagingSenderId: "410393197168",
  appId: "1:410393197168:web:2d83451ead0160da3592b5",
  measurementId: "G-Q6JCFXT45Y"
};

firebase.initializeApp(firebaseConfig);