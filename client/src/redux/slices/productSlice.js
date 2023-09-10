import { createSlice } from '@reduxjs/toolkit';

import { getArrivalProducts } from '../actions/productAction';

const productSlice = createSlice({
	name: 'product',
	initialState: {
		arrivalProduct: null,
		loading: false,
		errorMessage: '',
	},
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(getArrivalProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getArrivalProducts.fulfilled, (state, action) => {
			console.log(action.payload);
			state.loading = false;
			state.arrivalProduct = action.payload;
		});
		builder.addCase(getArrivalProducts.rejected, (state, action) => {
			state.loading = false;
			state.errorMessage = action.payload?.message;
		});
	},
});
export const {} = productSlice.actions;
export default productSlice.reducer;
