import { useState, useEffect } from 'react';
import ProductTile from '../components/product-tile';
import { Circles } from 'react-loader-spinner';

export default function Home() {
	const [products, setProducts] = useState([]); //prop sent to <ProductTile />
	const [loading, setLoading] = useState(false);

	async function fetchListOfProducts() {
		setLoading(true);
		try {
			const res = await fetch('https://fakestoreapi.com/products');
			const data = await res.json();

			// if (data) {
			setLoading(false);
			setProducts(data);
			// }
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	}

	useEffect(() => {
		fetchListOfProducts();
	}, []);

	return (
		<div>
			{loading ? (
				<div className="min-h-screen w-full flex justify-center items-center">
					<Circles
						height={'120'}
						width={'120'}
						color="rgb(127,29,29)"
						visible={true}
					/>
				</div>
			) : (
				<div className="min-h-[80vh] grid sm:grid-cols-2 md-grid-cols-3 lg-grid-cols-4 max-w-6xl mx-auto p-3">
					{products && products.length
						? products.map((productItem) => (
								<ProductTile product={productItem} />
						  ))
						: null}
				</div>
			)}
		</div>
	);
}
