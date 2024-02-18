import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/css/imageSlider.css';

export default function ImageSlider({ images, onClose }) {
	return (
		<div className="images-slider">
			<div className="images-slider-close" onClick={onClose}>
				<i className="fa-solid fa-xmark"></i>
			</div>
			<div className="slider-container">
				<Swiper
					loop={true}
					navigation={false}
					pagination={true}
					modules={[Pagination]}
					spaceBetween={0}
					slidesPerView={1}
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<img src={image?.url} alt="" className="image-slide" />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

ImageSlider.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
		}),
	).isRequired,
	onClose: PropTypes.func.isRequired,
};
