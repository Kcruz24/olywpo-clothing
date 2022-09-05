import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const { setCurrentUser } = useContext(UserContext);

	const signInGoogle = async () => {
		const response = await signInWithGooglePopup();
		await createUserDocumentFromAuth(response.user);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const {user} = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);

			setCurrentUser(user);

			resetFormFields();
		} catch (error) {
			const firebaseErrorCodes = [
				'auth/wrong-password',
				'auth/user-not-found',
			];

			switch (error.code) {
				case firebaseErrorCodes[0]:
					alert('Wrong Password For Email');
					break;

				case firebaseErrorCodes[1]:
					alert('No User associated with this email');
					break;

				default:
					console.log('Error signing in', error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-in-container">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					inputOptions={{
						type: 'text',
						required: true,
						name: 'email',
						onChange: handleChange,
						value: email,
					}}
				/>

				<FormInput
					label="Password"
					inputOptions={{
						type: 'password',
						required: true,
						name: 'password',
						onChange: handleChange,
						value: password,
					}}
				/>

				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						onClick={signInGoogle}
						buttonType="google"
					>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
