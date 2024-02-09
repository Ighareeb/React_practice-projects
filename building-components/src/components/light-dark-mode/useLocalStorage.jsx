import { useEffect, useState } from 'react';

export default function useLocalStorage(key, defaultValue) {
	//get initial state from localStorage for a given key else use default value
	const [value, setValue] = useState(() => {
		let currentValue;

		try {
			currentValue = JSON.parse(
				localStorage.getItem(key) || String(defaultValue),
			);
		} catch (err) {
			console.log(err);
			currentValue = defaultValue;
		}
		return currentValue;
	});
	//update value in localStorage when key or value changes
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
