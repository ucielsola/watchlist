import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./not-logged-in.css";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ThemeContext } from "../context/ThemeContext";

export const NotLoggedInBtns = () => {
	// Theme Switcher
	const { darkTheme } = useContext(ThemeContext);

	// let darkClass = darkTheme ? " dark" : "";

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
