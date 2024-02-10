//custom useFetch hook code
import { useState, useEffect } from 'react';

export default function useFetch(url, options = {}) {
	const [data, setData] = useState(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);

	async function fetchData() {
		setPending(true);
		try {
			const res = await fetch(url, { ...options });

			if (!res.ok) {
				throw new Error(
					`Could not fetch ${url}, status: ${res.status} ${res.statusText}`,
				);
			}

			const result = await res.json();
			setData(result);
			setError(null);
			setPending(false);
		} catch (err) {
			setError(`${err.name}: ${err.message}`);
			setPending(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, [url]);

	return { data, error, pending };
}
