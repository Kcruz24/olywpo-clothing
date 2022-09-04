import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { useState } from 'react';
import './sign-in-form.styles.scss';

import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

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
		const response = await signInWithGooglePopup();
		await createUserDocumentFromAuth(response.user);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(response);

			resetFormFields();
		} catch (error) {
			const firebaseErrorCode = 'auth/wrong-password';

			if (error.code === firebaseErrorCode) {
				alert('Wrong Password');
			} else {
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
					<Button onClick={signInGoogle} buttonType="google">
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
