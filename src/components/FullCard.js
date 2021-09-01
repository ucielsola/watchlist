import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { ThemeContext } from '../context/ThemeContext';
import posterPlaceholder from '../assets/poster-placeholder.png';
import './fullcard.css';

export const FullCard = ({ item, type }) => {
	// Theme Switcher
	const { darkTheme } = useContext(ThemeContext);
	let darkClass = darkTheme ? ' dark' : '';
	// FullCard
	const { watchlist, watched, addToWatchlist, moveToWatched } = useContext(GlobalContext);

	let isInWatchlist = watchlist.find((obj) => obj.id === item.id);
	let isInWatched = watched.find((obj) => obj.id === item.id);

	const watchlistBtnDisabled = isInWatchlist ? true : isInWatched ? true : false; // disables AddButton if item exist
	const watchedBtnDisabled = isInWatched ? true : false; // disables AddButton if item exist

	let overview = item.overview;
	if (overview.length > 375) {
		// limit character length for overview
		let truncated = overview.substring(0, 375);
		overview = truncated + '...';
	}

	return (
		<li className={'fullcard__item' + darkClass}>
			<div className={'fullcard__poster-wrapper' + darkClass}>
				{item.poster_path ? (
					<img
						src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
						alt={`${item.title} Poster`}
						className={'fullcard__poster' + darkClass}
					/>
				) : (
					<img
						className={'fullcard__placeholder' + darkClass}
						src={posterPlaceholder}
						alt={`Placeholder for ${item.title} Poster`}
					></img>
				)}
			</div>

			<div className={'fullcard__info' + darkClass}>
				<h3 className={'fullcard__title' + darkClass}>{item.title}</h3>
				{item.release_date ? (
					<h4 className={'fullcard__date' + darkClass}>Released on {item.release_date.substring(0, 4)}</h4>
				) : (
					<h4 className={'fullcard__date' + darkClass}>-</h4>
				)}
				{overview ? (
					<p className={'fullcard__overview' + darkClass}>{overview}</p>
				) : (
					<p className={'fullcard__overview' + darkClass}>No overview found.</p>
				)}

				<div className={'fullcard__controls' + darkClass}>
					<button
						className={'fullcard__button' + darkClass}
						onClick={() => addToWatchlist(item)}
						disabled={watchlistBtnDisabled}
					>
						Add to Watch List
					</button>
					<button
						className={'fullcard__button' + darkClass}
						onClick={() => moveToWatched(item)}
						disabled={watchedBtnDisabled}
					>
						Add to Watched
					</button>
				</div>
			</div>
		</li>
	);
};
