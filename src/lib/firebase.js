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
const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
    try {
        const snapshot = await db.collection("todos").get();
        const items = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return {
            success: true,
            items: items
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            items: []
        }
    }
};
export const addFirebaseItem = async (item) => {
    try {
        const todoRef = db.collection("todos");
        await todoRef.add(item);
    } catch (err) {
        console.log(err);
    }
};

export const updateFirebaseItem = async (item, id) => {
    try {
        const todoRef = db.collection("todos").doc(id);
        await todoRef.update(item);
    } catch (err) {
        console.log(err);
    }
};

export const clearFirebaseItem = async (item) => {
    const todoRef = db.collection("todos").doc(item.id);
    await todoRef
        .delete()
        .then(function () { })
        .catch(function (err) {
            console.log(err);
        });
};