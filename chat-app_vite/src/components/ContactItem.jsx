import Avatar from './Avatar';
import PropTypes from 'prop-types';

export default function ContactItem({ contact, createConversation }) {
	return (
		<div
			className="contact-item"
			onClick={() => createConversation(contact?.id)}
		>
			<Avatar
				src={contact?.profile ? contact.profile.url : ''}
				height={55}
				width={55}
				username={contact?.username}
			/>
		</div>
	);
}

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired,
	createConversation: PropTypes.func.isRequired,
};
