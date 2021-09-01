import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import TravoltaGif from '../assets/travolta.webp';
import './empty-page.css';

export const EmptyPage = () => {
	// Theme Switcher
	const { darkTheme } = useContext(ThemeContext);

	let darkClass = darkTheme ? ' dark' : '';
	// watched
	return (
		<div className={'empty-page__container' + darkClass}>
			<h3 className={'empty-page__title' + darkClass}>
				Wow!{' '}
				<span role="img" aria-label="crying emoji">
					😢
				</span>{' '}
				...Such emptiness... Lets find something to watch!{' '}
				<span className="btn">
					<Link to="/watchlist/add" className={'empty-page__add-btn' + darkClass}>
						+ Add
					</Link>
				</span>{' '}
			</h3>
			<img src={TravoltaGif} alt="Confused Travolta Gif Meme" className={'empty-page__img' + darkClass} />
		</div>
	);
};
