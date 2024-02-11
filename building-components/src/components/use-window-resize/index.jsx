//State changes --> react re-renders component --> DOM is updated --> browser repaints the screen --> useEffect runs
//useEffect used to perform side effects in function components (eg. fetching data). RUNS ASYNCHRONOUSLY
//State changes --> react re-renders component --> DOM is updated --> useLayoutEffect runs --> browser repaints the screen
//useLayoutEffect used to perform side effects focused on layout of compoinent.  Runs SYNCHRONOUSLY

import { useState, useLayoutEffect } from 'react';

export default function useWindowResize() {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	function handleResize() {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useLayoutEffect(() => {
		//first call is the set up initial state
		handleResize();

		///event listener watching for window resize that uses the callback to change state
		window.addEventListener('resize', handleResize);
		//cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return windowSize;
}
