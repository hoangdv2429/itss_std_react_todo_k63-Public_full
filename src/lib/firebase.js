import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB6BcIMyDXr58k9UvQpCf07xCJL_J46OtQ",
    authDomain: "todos-4764c.firebaseapp.com",
    projectId: "todos-4764c",
    storageBucket: "todos-4764c.appspot.com",
    messagingSenderId: "410393197168",
    appId: "1:410393197168:web:2d83451ead0160da3592b5",
    measurementId: "G-Q6JCFXT45Y"
};

const app = firebase.initializeApp(firebaseConfig);
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
        alert(err);
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
        alert(err);
    }
};

export const updateFirebaseItem = async (item, id) => {
    try {
        const todoRef = db.collection("todos").doc(id);
        await todoRef.update(item);
    } catch (err) {
        console.log(err);
        alert(err);
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


export const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export const storeUserInfo = async (user) => {
    const { uid } = user;
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
        await db.collection("users").doc(uid).set({ name: user.displayName });
        return {
            name: user.displayName,
            id: uid,
        };
    } else {
        return {
            id: uid,
            ...userDoc.data(),
        };
    }
};

export const updateUser = async (user, image) => {
    try {
        const userDoc = await firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .get();
        if (userDoc.exists) {
            await firebase
                .firestore()
                .collection("users")
                .doc(user.id)
                .update({ ...userDoc.data(), image: image });
        }
    } catch (err) {
        console.log(err);
    }
};

export const uploadImage = async (image) => {

    const storage = getStorage(app);

    const mountainsRef = ref(storage, `images/${image.name}`);
    await uploadBytesResumable(mountainsRef, image)
    const imageUrl = await getDownloadURL(mountainsRef)
    return imageUrl
};
