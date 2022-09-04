import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
	auth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	useEffect(() => {
		const effect = async () => {
            const response = await getRedirectResult(auth);

            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }

			console.log(response);
		};

		effect();
	}, []);

	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(response.user);
	};

	const logGoogleRedirectUser = async () => {
		const response = await signInWithGoogleRedirect();
		console.log(response.user);
		// const userDocRef = await createUserDocumentFromAuth(response.user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In with Google</button>
			<button onClick={logGoogleRedirectUser}>
				Sign In with Google Redirect
			</button>
		</div>
	);
};

export default SignIn;
