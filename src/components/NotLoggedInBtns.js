import React from "react";
import { Link } from "react-router-dom";
import "./not-logged-in.css";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NotLoggedInBtns = () => {
	return (
		<div className="nli__container">
			<ThemeSwitcher />
			<Link to="/login" className="nli__button">
				Log In
			</Link>
			<Link to="/signup" className="nli__button">
				Sign Up
			</Link>
		</div>
	);
};
