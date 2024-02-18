import { format } from 'date-fns';
import PropTypes from 'prop-types';
import '../assets/css/message.css';

export default function Message({ owner, msg, openImageViewer, scrollRef }) {
	return (
		<div className={owner ? 'message owner' : 'message'}>
			<div className="message-wrapper">
				{msg?.images.length > 0 && (
					<div
						className="image-wrapper"
						onClick={() => openImageViewer(msg.images)}
					>
						<img src={msg?.images[0]?.url} alt="" />
						{msg?.images.length > 1 && (
							<div className="image-count">+ {msg?.images.length - 1}</div>
						)}
					</div>
				)}
				<p>{msg?.message}</p>
			</div>
			<span className="timeline" ref={scrollRef}>
				{format(msg?.createdAt?.toDate())}
			</span>
		</div>
	);
}

Message.propTypes = {
	owner: PropTypes.bool.isRequired,
	msg: PropTypes.shape({
		images: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string.isRequired,
			}),
		).isRequired,
		message: PropTypes.string.isRequired,
		createdAt: PropTypes.object.isRequired,
	}).isRequired,
	openImageViewer: PropTypes.func.isRequired,
	scrollRef: PropTypes.object.isRequired,
};
