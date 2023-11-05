import {
	createSlice
} from "@reduxjs/toolkit";

// Define the initial state for the authentication slice.
const initialState = {
	token: null, // User's authentication token
	SPToken: null, // Service Provider's authentication token
};

// Create the authentication slice using createSlice.
export const authSlice = createSlice({
	name: "auth", // Name of the slice
	initialState, // Initial state of the slice
	reducers: {
		setLogin: (state, action) => {
			state.token = action.payload.token; // Action to set the user's token
		},
		setSPToken: (state, action) => {
			state.SPToken = action.payload.SPToken; // Action to set the service provider's token
		},
		setLogout: (state) => {
			state.token = null; // Action to clear the user's token on logout
			state.SPToken = null; // Action to clear the service provider's token on logout
		},
	},
});

// Export the action creators for use in your application.
export const {
	setLogin,
	setSPToken,
	setLogout
} = authSlice.actions;

// Export the reducer function to manage the authentication state in your Redux store.
export default authSlice.reducer;
