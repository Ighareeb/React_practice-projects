import { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './styles.css';

export default function ImageSlider({ url, limit = 5, page = 1 }) {
	const [images, setImages] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(false);

	//fetch images from url with query params for limit and page
	async function fetchImages(getUrl) {
		try {
			setLoading(true);
			const res = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
			const data = await res.json();
			if (data) {
				setImages(data);
				setLoading(false);
			}
		} catch (err) {
			setErrorMsg(err.message);
			setLoading(false);
		}
	}
	function handlePrevious() {
		setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
	}
	function handleNext() {
		setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
	}

	useEffect(() => {
		if (url !== '') fetchImages(url);
	}, [url]);

	console.log(images);

	//if loading message
	if (loading) {
		return <div>Loading Images...</div>;
	}
	//if error message
	if (errorMsg !== null) {
		return <div>Error: {errorMsg}</div>;
	}

	return (
		<div className="container">
			<BsArrowLeftCircleFill
				onClick={handlePrevious}
				className="arrow arrow-left"
			/>
			{images && images.length
				? images.map((imageItem, index) => (
						<img
							key={imageItem.id}
							alt={imageItem.download_url}
							src={imageItem.download_url}
							className={
								currentSlide === index
									? 'current-image'
									: 'current-image hide-current-image'
							}
						/>
				  ))
				: null}

			<BsArrowRightCircleFill
				onClick={handleNext}
				className="arrow arrow-right"
			/>
			{/* circle indicators */}
			<span className="circle-indicators">
				{images && images.length
					? images.map((_, index) => (
							<button
								key={index}
								className={
									currentSlide === index
										? 'current-indicator'
										: 'current-indicator inactive-indicator'
								}
								onClick={() => setCurrentSlide(index)}
							></button>
					  ))
					: null}
			</span>
		</div>
	);
}
