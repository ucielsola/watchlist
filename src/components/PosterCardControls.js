import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const PosterCardControls = ({ item, type }) => {
	const { moveToWatchlist, removeFromWatchlist, moveToWatched, removeFromWatched } =
		useContext(GlobalContext);

	return (
		<div className="poster-card-controls__container">
			{type === 'watchlist' && (
				<React.Fragment>
					<button
						className="poster-card__ctrl-btn eye"
						title="Move to Watched"
						onClick={() => moveToWatched(item)}
					>
						<i className="fa-fw far fa-eye"></i>
					</button>
					<button
						className="poster-card__ctrl-btn times"
						title="Remove from Watchlist"
						onClick={() => removeFromWatchlist(item.id)}
					>
						<i className="fa-fw fa fa-times"></i>
					</button>
				</React.Fragment>
			)}
			{type === 'watched' && (
				<React.Fragment>
					<button
						className="poster-card__ctrl-btn eye-slash"
						title="Move to Watchlist"
						onClick={() => moveToWatchlist(item)}
					>
						<i className="fa-fw far fa-eye-slash"></i>
					</button>
					<button
						className="poster-card__ctrl-btn times"
						title="Remove from Watched"
						onClick={() => removeFromWatched(item.id)}
					>
						<i className="fa-fw fa fa-times"></i>
					</button>
				</React.Fragment>
			)}
		</div>
	);
};
