import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			const additionalInfo = { displayName };
			await createUserDocumentFromAuth(user, additionalInfo);
			resetFormFields();
		} catch (error) {
			const firebaseErrorCode = 'auth/email-already-in-use';
			if (error.code === firebaseErrorCode) {
				alert('Cannot create User, email already in use');
			} else {
				console.log('Error', error);
			}
		}

		//console.log(event.target)
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div>
			<h1>Sign up with your email and password</h1>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					inputOptions={{
						type: 'text',
						required: true,
						onChange: handleChange,
						name: 'displayName',
						value: displayName,
					}}
				/>

				<FormInput
					label="Email"
					inputOptions={{
						type: 'email',
						required: true,
						onChange: handleChange,
						name: 'email',
						value: email,
					}}
				/>

				<FormInput
					label="Password"
					inputOptions={{
						type: 'password',
						required: true,
						onChange: handleChange,
						name: 'password',
						value: password,
					}}
				/>

				<FormInput
					label="Confirm Password"
					inputOptions={{
						type: 'password',
						required: true,
						onChange: handleChange,
						name: 'confirmPassword',
						value: confirmPassword,
					}}
				/>

				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default SignUpForm;
