import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './styles.css'; //for active or inactive star

export default function StarRating({ numOfStars = 5 }) {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	function handleClick(getCurrentIndex) {
		setRating(getCurrentIndex);
	}
	function handleMouseEnter(getCurrentIndex) {
		setHover(getCurrentIndex);
	}
	function handleMouseLeave() {
		setHover(rating);
	}

	return (
		<div className="star-rating">
			{[...Array(numOfStars)].map((_, index) => {
				index += 1; //array zero-indexed but want star-rating to start from 1
				return (
					<FaStar
						key={index}
						className={index <= (hover || rating) ? 'active' : 'inactive'}
						onClick={() => handleClick(index)}
						onMouseMove={() => handleMouseEnter(index)}
						onMouseLeave={() => handleMouseLeave()}
						size={40}
					/>
				);
			})}
		</div>
	);
}
