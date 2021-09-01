import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import { FullCard } from './FullCard';
import { ScrollToTop } from './ScrollToTop';
import SearchGif from '../assets/search.webp';

import './add.css';

export const Add = () => {
	// Theme Switcher
	const { darkTheme } = useContext(ThemeContext);

	let darkClass = darkTheme ? ' dark' : '';
	// Add
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(2);
	const [totalPages, setTotalPages] = useState(1);
	const [error, setError] = useState(false);
	const nextDisabled = page - 1 === totalPages;
	const prevDisabled = page === 2;
	const PaginationRequest = (page) => {
		window.scrollTo({ top: 3, behavior: 'smooth' });
		axios
			.get(
				`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${query}&page=${page}`
			)
			.then((res) => {
				const results = res.data.results.filter((item) => {
					// Unifies name and title for Movies and TV Shows
					if (item.media_type === 'tv') item.title = item.name;
					// Filters Movie and TV Shows, excludes i.e. Persons
					return item.media_type === 'movie' || item.media_type === 'tv';
				});
				setResults(results);
				console.log('page ' + res.data.page);
			})
			.catch((err) => {
				setError(true);
				setResults([]);
			});
	};

	const Search = (e) => {
		// e.preventDefault();
		setQuery(e.target.value);
		setPage(2);

		axios
			.get(
				`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}&page=1`
			)
			.then((res) => {
				const results = res.data.results.filter((item) => {
					// Unifies name and title for Movies and TV Shows
					if (item.media_type === 'tv') item.title = item.name;
					// Filters Movie and TV Shows, excludes i.e. Persons
					return item.media_type === 'movie' || item.media_type === 'tv';
				});
				setResults(results);
				setTotalPages(res.data.total_pages);
			})
			.catch((err) => {
				setError(true);
				console.log(err);
				setResults([]);
			});
	};

	const nextPage = () => {
		setPage(page + 1);
		PaginationRequest(page);
	};
	const prevPage = () => {
		setPage(page - 1);
		PaginationRequest(page);
	};

	return (
		<React.Fragment>
			<ScrollToTop />

			<div className={'add__container' + darkClass}>
				<h2 className={'add__title' + darkClass}>Add Movies and TV Shows</h2>
				<div className={'input__wrapper' + darkClass}>
					<input type="text" placeholder="Search..." value={query} onChange={Search} autoFocus={true} />
				</div>

				{results.length > 0 ? (
					<React.Fragment>
						<ul className={'add__results' + darkClass}>
							{results.map((item) => (
								<FullCard item={item} key={item.id} />
							))}
						</ul>
						{totalPages > 1 && (
							<React.Fragment>
								<div className="add__pagination-controls">
									<button className="add__pagination-button" onClick={prevPage} disabled={prevDisabled}>
										Previous
									</button>

									<button className="add__pagination-button" onClick={nextPage} disabled={nextDisabled}>
										Next
									</button>
								</div>
								<h4 className={"add__page-counter"+darkClass}>
									Page {page - 1} of {totalPages} pages
								</h4>
							</React.Fragment>
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						{error && (
							<h4 className="add__error-msg">
								Mhh... nothing found{' '}
								<span role="img" aria-label="Fearful Face Emoji">
									😨
								</span>{' '}
								! Try something else...
							</h4>
						)}
						<div className={'add__gif-container' + darkClass}>
							<img src={SearchGif} alt="Sarch GIF from Giphy.com" className={'add__gif' + darkClass} />
						</div>
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};
