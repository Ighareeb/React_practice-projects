import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mode: 'dark',
	userId: '63701cc1f03239b7f700000e',
};

//function to auto generate action creators, action types based on reducers
export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		//setMode reducer to toggle light-dark mode
		setMode: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
	},
});

// globalSlice.actions: object that contains generated action creators (setMode)
export const { setMode } = globalSlice.actions;

// export generated reducer function
export default globalSlice.reducer;
