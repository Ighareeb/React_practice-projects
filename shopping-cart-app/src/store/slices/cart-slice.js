import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			console.log(action);
			state.push(action.payload); //where payload is the cart item to be added ( or used to filter)
		},
		// removeFromCart(state, action) {
		// 	return state.filter((item) => item.id !== action.payload);
		// },
		// redux toolkit allows writing code as if directly mutating state while actually it creates a safe copy of the state
		removeFromCart(state, action) {
			const index = state.findIndex((item) => item.id === action.payload);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
