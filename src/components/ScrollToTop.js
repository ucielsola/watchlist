import React, { useState, useEffect } from 'react';
import './scroll-to-top.css';

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(' ');

	// Show button when page is scrolled up to given distance
	const toggleVisibility = () => {
		if (window.pageYOffset > 500) {
			setIsVisible(' show');
		} else {
			setIsVisible(' ');
		}
	};

	// Set the top cordinate to 0
	// make scrolling smooth
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<div className="scroll-to-top__container">
			<button onClick={scrollToTop} className={'scroll-to-top__button' + isVisible} title="Back to top!">
				<i className="fas fa-arrow-up"></i>
			</button>
		</div>
	);
};
