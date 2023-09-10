import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../actions/appAction';

const appSlice = createSlice({
	name: 'app',

	initialState: {
		categories: null,
		loading: false,
		errorMessage: false,
	},
  
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(getCategories.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(getCategories.fulfilled, (state, action) => {
			state.loading = false;
			state.categories = action.payload;
		});

		builder.addCase(getCategories.rejected, (state, action) => {
			state.loading = false;
			state.errorMessage = action.payload?.message;
		});
	},
});

export const {} = appSlice.actions;
export default appSlice.reducer;
