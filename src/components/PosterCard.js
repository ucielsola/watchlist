import React from 'react';
import { PosterCardControls } from './PosterCardControls';
import posterPlaceholder from "../assets/poster-placeholder.png"
import './poster-card.css';

export const PosterCard = ({ item, type }) => {
	return (
		<div className="poster-card" key={item.id}>
			<div className="poster-card__overlay"></div>

			{item.poster_path ? (
				<img
					src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
					alt={`${item.title} Poster`}
					className="poster-card__poster"
				/>
			) : (
				<img
					className="poster-card__placeholder"
					src={posterPlaceholder}
					alt={`Placeholder for ${item.title} Poster`}
				></img>
			)}
			<PosterCardControls type={type} item={item} />
		</div>
	);
};
