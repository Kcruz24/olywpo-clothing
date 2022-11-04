import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();

// Every time someone interacts with our Google auth provider we want them
// to select an account
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

// auth is a singleton that keeps track of the current authentication state of the user
export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('done');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const queryRef = query(collectionRef);

	const querySnapshot = await getDocs(queryRef);

	const categoryMap = querySnapshot.docs.reduce((acum, docSnapshot) => {
		const { title, items } = docSnapshot.data();

		acum[title.toLowerCase()] = items;

		return acum;
	}, {});

	return categoryMap;
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfo = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	// Data
	const userSnapshot = await getDoc(userDocRef);

	const userDoesNotExist = !userSnapshot.exists();
	if (userDoesNotExist) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (err) {
			console.error('Error creating the user', err.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
	return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
