import { createAsyncThunk } from '@reduxjs/toolkit';

import * as apis from '../../apis';

export const getArrivalProducts = createAsyncThunk(
	'/product/arrivalProducts',
	async (options, { rejectWithValue }) => {
		const response = await apis.getProducts(options);
		if (!response.code === 1) rejectWithValue(response);
		return response?.metaData?.data.products;
	},
);
