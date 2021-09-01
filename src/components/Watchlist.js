import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { ThemeContext } from '../context/ThemeContext';
import { PosterCard } from './PosterCard';
import { EmptyPage } from './EmptyPage';
import { ScrollToTop } from './ScrollToTop';

import './watchlist.css';

export const Watchlist = () => {
	// Theme Switcher
	const { darkTheme } = useContext(ThemeContext);

	let darkClass = darkTheme ? ' dark' : '';
	// Watchlists
	const { watchlist } = useContext(GlobalContext);
	return (
		<React.Fragment>
			<ScrollToTop />

			<div className={'watchlist__container' + darkClass}>
				<h2 className={'watchlist__title' + darkClass}>Your Watch List</h2>

				{watchlist.length > 0 ? (
					<React.Fragment>
						<h3 className={'watchlist__subtitle' + darkClass}>
							{watchlist.length === 1 ? '1 Movie / TVShow' : watchlist.length + ' Movies / TVShows'}
						</h3>
						<div className={'poster-card__container' + darkClass}>
							{watchlist.map((item) => (
								<PosterCard item={item} type="watchlist" key={item.id} />
							))}
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<h3 className={'watchlist__subtitle' + darkClass}>
							Here you'll find all the Movies and TV Shows you want to watch!
						</h3>
						<EmptyPage />
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};
