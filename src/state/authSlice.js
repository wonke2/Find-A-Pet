import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
	SPToken: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.token = action.payload.token;
		},
		setSPToken: (state, action) => {
      		state.SPToken = action.payload.SPToken;
    	},
		setLogout: (state) => {
			state.token = null;
			state.SPToken = null;
		},
	},
});


export const {setLogin, setSPToken, setLogout} = authSlice.actions;


export default authSlice.reducer;