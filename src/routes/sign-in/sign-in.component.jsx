import Button from '../../components/button/button.component';

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(response.user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<Button onClick={logGoogleUser} buttonType='google'>Sign In with Google</Button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
