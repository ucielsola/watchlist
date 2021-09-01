import React from 'react';
import { Link } from 'react-router-dom';
import "./not-logged-in.css"

export const NotLoggedInBtns = () => {
	return (
		<div className="nli__container">
			<Link to="/watchlist/login" className="nli__button">
				Log In
			</Link>
			<Link to="/watchlist/signup" className="nli__button">
				Sign Up
			</Link>
		</div>
	);
};
