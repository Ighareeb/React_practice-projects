// function createSlice({
//     // A name, used in action types
//     name: string,
//     // The initial state for the reducer
//     initialState: State,
//     // An object of "case reducers". Key names will be used to generate actions.
//     reducers: Record<string, ReducerFunction | ReducerAndPrepareObject>,
// })
// // reducers is object with function intended to handle specific action types (almost like switch case conditional)
// // the app dispatches actions matching reducer to call. Function components useDispatch and create a dipatch instance to dispatch(reducer(args)) from the args in that functional component. All the state is managed by the reducer not in the functional component. (therefore need to wrap the main index.js in a Provider)
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
