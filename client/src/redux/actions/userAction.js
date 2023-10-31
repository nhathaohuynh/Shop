import { createAsyncThunk } from '@reduxjs/toolkit';

import * as apis from '../../apis';

export const getCurrentUser = createAsyncThunk(
	'user/user-current',
	async (data, { rejectWithValue }) => {
		const response = await apis.apiGetCurrentUser();
		if (response.code !== 1) {
			return rejectWithValue(response);
		}
		return response.metaData?.user;
	},
);

export const logout = createAsyncThunk(
	'user/logout',
	async (data, { rejectWithValue }) => {
		const response = await apis.logout();
		if (response.code !== 1) {
			return rejectWithValue(response);
		}
		return response?.metaData;
	},
);
