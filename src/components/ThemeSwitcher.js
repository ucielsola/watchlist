import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './theme-switcher.css';

export const ThemeSwitcher = () => {
	const { darkTheme, setDarkTheme } = useContext(ThemeContext);
	let darkClass = darkTheme ? ' dark' : '';
	let themeName = darkTheme ? 'Dark ' : 'Light ';
	const label = (
		<label htmlFor="switch" className={'switch__label' + darkClass}>
			{themeName}Theme
		</label>
	);
	return (
		<div className="switch__wrapper" onClick={() => setDarkTheme(!darkTheme)}>
			<div className="label-wrapper">{!darkTheme && label}</div>
			<input
				name="switch"
				className={'switch__input' + darkClass}
				type="checkbox"
				defaultChecked={darkTheme}
			></input>
			<div className="label-wrapper ">{darkTheme && label}</div>
		</div>
	);
};
