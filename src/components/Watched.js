import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { ThemeContext } from '../context/ThemeContext';
import { PosterCard } from './PosterCard';
import { EmptyPage } from './EmptyPage';
import { ScrollToTop } from './ScrollToTop';
import './watched.css';

export const Watched = () => {
	// Theme Switcher
		const { darkTheme } = useContext(ThemeContext);

	let darkClass = darkTheme ? ' dark' : '';
	// watched
	const { watched } = useContext(GlobalContext);

	return (
		<React.Fragment>
			<ScrollToTop />
			<div className={'watched__container' + darkClass}>
				<h2 className={'watched__title' + darkClass}>Your Watched List</h2>

				{watched.length > 0 ? (
					<React.Fragment>
						<h3 className={'watched__subtitle' + darkClass}>
							{watched.length === 1 ? '1 Movie / TVShow' : watched.length + ' Movies / TVShows'}
						</h3>
						<div className={'poster-card__container' + darkClass}>
							{watched.map((item) => (
								<PosterCard item={item} type="watched" key={item.id} />
							))}
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<h3 className={'watched__subtitle' + darkClass}>
							Here you'll find all the Movies and TV Shows you've watched!
						</h3>
						<EmptyPage />
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};
