import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCTYxXOhDh30VuOh4-hk7oqPjdeJqSVstw",
    authDomain: "crwn-db-5fd2f.firebaseapp.com",
    databaseURL: "https://crwn-db-5fd2f.firebaseio.com",
    projectId: "crwn-db-5fd2f",
    storageBucket: "crwn-db-5fd2f.appspot.com",
    messagingSenderId: "972538569440",
    appId: "1:972538569440:web:d939d0d37892de68ab6685",
    measurementId: "G-2K3JM32WW5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;