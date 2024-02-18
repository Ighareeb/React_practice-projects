import { createContext, useEffect, useReducer } from 'react';
import { Reducer } from './Reducer';
import { checkAuthUser } from './Actions';
import PropTypes from 'prop-types';

const initialState = {
	auth: JSON.parse(localStorage.getItem('char_user')) || null,
	user: null,
	users: [],
	currentChat: null,
	chats: [],
};
export const Context = createContext();

export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);

	useEffect(() => {
		checkAuthUser(dispatch);
	}, []);

	useEffect(() => {
		localStorage.setItem('chat_user', JSON.stringify(state.auth));
	}, [state.auth]);

	return (
		<Context.Provider
			value={{
				auth: state.auth,
				user: state.user,
				users: state.users,
				currentChat: state.currentChat,
				chats: state.chats,
				dispatch,
			}}
		>
			{children}
		</Context.Provider>
	);
};

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
