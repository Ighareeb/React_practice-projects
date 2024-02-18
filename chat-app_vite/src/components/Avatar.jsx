import NoAvatar from '../assets/images/img4.png';

import PropTypes from 'prop-types';

export default function Avatar({ src, username, height, width }) {
	return (
		<div className="d-flex-row">
			<img
				src={src ? src : NoAvatar}
				alt="picture of user avatar"
				style={{
					height: `${height}px`,
					width: `${width}px`,
					borderRadius: '0.5rem',
					objectFit: 'cover',
				}}
			/>
			{username && (
				<span style={{ fontSize: '1rem' }} className="usern">
					{username ? username : 'No username'}
				</span>
			)}
		</div>
	);
}

Avatar.propTypes = {
	src: PropTypes.string,
	username: PropTypes.string,
	height: PropTypes.number,
	width: PropTypes.number,
};
