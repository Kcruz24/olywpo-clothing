import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCUe1OF3KtFOu3N0RJNMosIc6WY9pKLqe8',
	authDomain: 'olywpo-clothing-db.firebaseapp.com',
	projectId: 'olywpo-clothing-db',
	storageBucket: 'olywpo-clothing-db.appspot.com',
	messagingSenderId: '56234472587',
	appId: '1:56234472587:web:478ceddef95b876c2ed08e',
	measurementId: 'G-HHPWHM165R',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// Every time someone interacts with our Google auth provider we want them
// to select an account
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	console.log(userDocRef);

	// Data
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());
};
