import { useState, useEffect } from 'react';
import './styles.css';

export default function LoadMoreData() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [count, setCount] = useState(0);
	const [disableButton, setDisableButton] = useState(false);

	async function fetchProducts() {
		try {
			setLoading(true);
			const res = await fetch(
				`https://dummyjson.com/products?limit=20&skip=${
					count === 0 ? 0 : count * 20
				}`,
			);
			const data = await res.json();

			if (data && data.products && data.products.length > 0) {
				setProducts((prevData) => [...prevData, ...data.products]);
				setLoading(false);
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchProducts();
	}, [count]);

	// if products length is 100, disable button
	useEffect(() => {
		if (products && products.length === 100) setDisableButton(true);
	}, [products]);

	//loading message
	if (loading) {
		return <div>Loading Products...</div>;
	}

	return (
		<div className="load-more-container">
			<div className="product-container">
				{products && products.length
					? products.map((item) => (
							<div className="product" key={item.id}>
								<img src={item.thumbnail} alt={item.title} />
								<p>{item.title}</p>
							</div>
					  ))
					: null}
			</div>
			<div className="button-container">
				<button disabled={disableButton} onClick={() => setCount(count + 1)}>
					Load More Products
				</button>
				{disableButton ? (
					<p>Only 100 products can be loaded at a time</p>
				) : null}
			</div>
		</div>
	);
}
