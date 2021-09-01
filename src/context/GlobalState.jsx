import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
	watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [],
	watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : [],
	darkClass: ' dark',
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
		localStorage.setItem('watched', JSON.stringify(state.watched));
	}, [state]);

	// actions
	const addToWatchlist = (item) => {
		dispatch({ type: 'ADD_TO_WATCHLIST', payload: item });
	};
	const removeFromWatchlist = (id) => {
		dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: id });
	};
	const moveToWatchlist = (item) => {
		dispatch({ type: 'MOVE_TO_WATCHLIST', payload: item });
	};
	const moveToWatched = (item) => {
		dispatch({ type: 'MOVE_TO_WATCHED', payload: item });
	};
	const removeFromWatched = (id) => {
		dispatch({ type: 'REMOVE_FROM_WATCHED', payload: id });
	};

	return (
		<GlobalContext.Provider
			value={{
				watchlist: state.watchlist,
				watched: state.watched,
				addToWatchlist,
				removeFromWatchlist,
				moveToWatchlist,
				moveToWatched,
				removeFromWatched,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
};
