import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCategories = createAsyncThunk(
	'app/category',
	async (data, { rejectWithValue }) => {
		const response = await apis.getCategories();
		if (!response.code === 1) return rejectWithValue(response);
		return response.metaData?.productCategories;
	},
);
