import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlice';
import productReducer from '../slices/productSlice';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slices/userSlice';
import { persistReducer, persistStore } from 'redux-persist';

const commonConfig = {
	key: 'current-user',
	storage,
};

const userConfig = {
	...commonConfig,
	whitelist: ['isLogin', 'currentUser', 'token'],
};

const userPersist = persistReducer(userConfig, userReducer);

export const store = configureStore({
	reducer: {
		app: appReducer,
		products: productReducer,
		user: userPersist,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
