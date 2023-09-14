import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../actions/userAction';

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
		builder.addCase(getCurrentUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
		});
		builder.addCase(getCurrentUser.rejected, (state) => {
			state.loading = false;
			state.currentUser = null;
		});
	},
});

export const { login } = userReducer.actions;
export default userReducer.reducer;
