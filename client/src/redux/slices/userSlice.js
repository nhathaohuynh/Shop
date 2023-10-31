import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../actions/userAction';

const userReducer = createSlice({
	name: 'user',
	initialState: {
		currentUser: null,
		isLogin: false,
		loading: false,
		token: '',
	},

	reducers: {
		login: (state, action) => {
			console.log(action);
			state.isLogin = action.payload.isLogin;
			state.currentUser = action.payload.currentUser;
			state.token = action.payload.token;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logout.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state.loading = false;
			state.currentUser = null;
			state.isLogin = false;
		});
		builder.addCase(logout.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const { login } = userReducer.actions;
export default userReducer.reducer;
