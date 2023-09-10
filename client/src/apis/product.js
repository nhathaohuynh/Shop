import instance from '../utils/axios.config';

export const getProducts = (params) =>
	instance({
		url: '/product',
		method: 'get',
		params,
	});
