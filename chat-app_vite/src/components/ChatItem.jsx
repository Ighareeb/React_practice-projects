import Avatar from './Avatar';
import { format } from 'timeago.js';
import PropTypes from 'prop-types';

export default function ChatItem({ chat, active, selectConversation }) {
	let lastMessage = '';
	if (chat?.last?.createdAt) {
		lastMessage = chat.last.message ? chat.last.message : 'No message';
	} else {
		lastMessage = `You: say hi! to ${chat?.friend?.username}`;
	}

	return (
		<div
			className={active ? 'chat-item active' : 'chat-item'}
			onClick={() => selectConversation(chat)}
		>
			<Avatar />
			<div className="chat-item-infos">
				<div className="avatar-infos">
					<span className="username">{chat?.friend?.username}</span>
					{chat?.last?.createdAt && (
						<span className="timeline">
							{format(chat?.last?.createdAt?.toData())}
						</span>
					)}
				</div>
				<p className="last-message">{lastMessage}</p>
			</div>
		</div>
	);
}

ChatItem.propTypes = {
	chat: PropTypes.object.isRequired,
	active: PropTypes.bool.isRequired,
	selectConversation: PropTypes.func.isRequired,
};
