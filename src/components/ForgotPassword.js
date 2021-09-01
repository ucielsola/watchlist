import React, { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import './login-signup-forgot-profile.css';

export const ForgotPassword = () => {
	// Theme Switcher
	const { darkTheme } = useContext(ThemeContext);
	let darkClass = darkTheme ? ' dark' : '';
	// Login
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const history = useHistory();


	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instructions');
			setTimeout(() => {
				history.push("/watchlist/login");
			}, 3000);
		} catch (error) {
			setError('Failed to reset password');
		}
		setLoading(false);
	}
	return (
		<div className={'page__container' + darkClass}>
			<div className={'page__wrapper' + darkClass}>
				<h2 className={'page__title' + darkClass}>Reset your password</h2>
				{error && <h3 className={'page__error-msg' + darkClass}>{error}</h3>}
				{message && <h3 className={'page__msg' + darkClass}>{message}</h3>}
				<form action="" onSubmit={handleSubmit}>
					<div className={'form__group' + darkClass}>
						<input type="email" name="password" ref={emailRef} className={'form__input' + darkClass} />
						<label htmlFor="email" className={'form__label' + darkClass} tabIndex="-1">
							Email
						</label>
					</div>

					<div className={'form__group--inline' + darkClass}>
						<button disabled={loading} type="submit" className={'form__submit' + darkClass}>
							Reset Password
						</button>
						<Link to="/watchlist/login" className="cancel">
							Cancel
						</Link>
					</div>
				</form>
				<div className={'to-signup' + darkClass}>
					New in town? <Link to="/watchlist/signup">Sign Up!</Link>{' '}
				</div>
			</div>
		</div>
	);
};
