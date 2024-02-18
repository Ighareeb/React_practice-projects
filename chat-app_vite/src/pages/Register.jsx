import { useState, useRef } from 'react';
import '../assets/css/register.css';
import { registerAsync } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const emailRef = useRef();
	const nameRef = useRef();
	const passwordRef = useRef();

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const clearInputs = () => {
		if (emailRef?.current) {
			emailRef.current.value = '';
		}
		if (nameRef?.current) {
			nameRef.current.value = '';
		}
		if (passwordRef?.current) {
			passwordRef.current.value = '';
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const creds = {
			username: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		try {
			await registerAsync(creds);
			clearInputs();
			setLoading(false);
			navigate('/login');
		} catch (err) {
			const message = error.code;
			setError(message);
			setLoading(false);
		}
	};
	return (
		<div className="register">
			<div className="wrapper">
				<h2 className="heading">Register</h2>
				<form onSubmit={handleSubmit} className="form">
					{error && <span className="error-msg">{error}</span>}
					<input type="text" placeholder="username" ref={nameRef} required />
					<input type="email" placeholder="email" ref={emailRef} required />
					<input
						type="password"
						placeholder="password"
						ref={passwordRef}
						required
					/>
					<button type="submit" disabled={loading}>
						{loading ? 'Loading...' : 'Register'}
					</button>
					<span className="link">
						<a href="/login">Login here is you already have an account</a>
					</span>
				</form>
			</div>
		</div>
	);
}
