import instance from '../utils/axios.config';

export const getCategories = () =>
	instance(
		{
			url: '/product-category',
			method: 'get',
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

