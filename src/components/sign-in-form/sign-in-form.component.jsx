import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

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

	const signInGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);

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
		<SignInContainer>
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

				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						onClick={signInGoogle}
						buttonType={BUTTON_TYPE_CLASSES.google}
					>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
