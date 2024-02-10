import { useState, useEffect } from 'react';
import './scroll.css';

export default function ScrollIndicator({
	url = 'https://jsonplaceholder.typicode.com/posts',
}) {
	const [products, setProducts] = useState([]);
	const [scrollPercentage, setScrollPercentage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	//fetch data function + useEffect
	async function fetchData(getUrl) {
		try {
			setLoading(true);
			const res = await fetch(getUrl);
			const data = await res.json();

			if (data && data.length) {
				setProducts(data);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setErrorMessage(err.message);
		}
	}

	useEffect(() => {
		fetchData(url);
	}, [url]);

	//handleScroll% function and useEffect with window event listener
	function handleScrollPercentage() {
		console.log(
			document.body.scrollTop, //<body> element (usually for older browsers)
			document.documentElement.scrollTop, //<html> document element (standard way of querying using document.documentElement)
			document.documentElement.scrollHeight,
			document.documentElement.clientHeight,
		);

		const howMuchScrolled =
			document.body.scrollTop || document.documentElement.scrollTop; //see note for console.log above

		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;

		setScrollPercentage((howMuchScrolled / height) * 100);
	}
	//only runs on initial render
	useEffect(() => {
		window.addEventListener('scroll', handleScrollPercentage);
	}, []);

	console.log(products, scrollPercentage);

	//if loading message
	if (loading) {
		return <div>Loading product data...</div>;
	}
	//if error message
	if (errorMessage) {
		return <div>Error: {errorMessage}</div>;
	}

	return (
		<>
			<div className="top-container">
				<h1>Custom Scroll Indicator</h1>
				<div className="scroll-progress-tracking-container">
					<div
						className="current-progress-bar"
						style={{
							width: `${scrollPercentage}%`,
						}}
					></div>
				</div>
			</div>
			<div className="data-container">
				{products && products.length > 0
					? products.map((product) => <p key={product.id}>{product.title}</p>)
					: null}
			</div>
		</>
	);
}
