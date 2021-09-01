import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

import './login-signup-forgot-profile.css';

export const ProfilePage = () => {
	// Theme Switcher
	const { darkTheme } = useContext(ThemeContext);
	let darkClass = darkTheme ? ' dark' : '';
	// SignUp
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updateEmail, updatePassword, logout } = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleUpdate(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match!');
		}

		const promises = [];
		setError('');
		setLoading(true);
		if (emailRef.current.value !== currentUser.email) {
			// check if user wants to change email
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			// check if user wants to change password
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				// success message and switch to main page after changing mail/pass
				setMessage('Profile updated succesfully');
				setTimeout(() => {
					history.push('/watchlist/');
				}, 3000);
			})
			.catch(() => {
				setError('Failed to update account');
			})
			.finally(() => {
				setLoading(false);
			});
	}

	async function handleLogout() {
		setError('');
		try {
			history.push('/watchlist/login');
			await logout();
		} catch (error) {
			setError('Failed to log out');
		}
	}

	return (
		<div className={'page__container' + darkClass}>
			<div className={'page__wrapper' + darkClass}>
				<h2 className={'page__title' + darkClass}>Your Profile</h2>
				{error && <h3 className={'page__error-msg' + darkClass}>{error}</h3>}
				{message && <h3 className={'page__msg' + darkClass}>{message}</h3>}
				<form>
					<div className={'form__group' + darkClass}>
						<input
							type="email"
							name="password"
							ref={emailRef}
							defaultValue={currentUser.email}
							className={'form__input' + darkClass}
						/>
						<label htmlFor="email" className={'form__label' + darkClass} tabIndex="-1">
							Email
						</label>
					</div>
					<div className={'form__group' + darkClass}>
						<input
							type="password"
							name="password"
							ref={passwordRef}
							minLength="6"
							placeholder="Leave blank to keep the same"
							className={'form__input' + darkClass}
						/>
						<label htmlFor="password" className={'form__label' + darkClass} tabIndex="-1">
							New Password
						</label>
					</div>
					<div className={'form__group' + darkClass}>
						<input
							type="password"
							name="password-confirm"
							ref={passwordConfirmRef}
							minLength="6"
							placeholder="Leave blank to keep the same"
							className={'form__input' + darkClass}
						/>
						<label
							htmlFor="password-confirm"
							className={'form__label' + darkClass}
							minLength="6"
							tabIndex="-1"
						>
							Confirm New Password
						</label>
					</div>
					<div className={'form__group--inline' + darkClass}>
						<button
							disabled={loading}
							type="submit"
							className={'form__submit' + darkClass}
							onClick={handleUpdate}
						>
							Update Profile
						</button>
						<button className={'log-out__button' + darkClass} onClick={handleLogout}>
							Log Out
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
