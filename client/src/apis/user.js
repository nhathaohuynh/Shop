import instance from '../utils/axios.config';
export const apiLogin = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch('http://localhost:5000/api/v1//user/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			resolve(response.json());
		} catch (err) {
			reject(err);
		}
	});
};

// export const apiGetCurrentUser = () =>
// 	instance(
// 		{ url: '/user', method: 'get' },
// 		{
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		},
// 	);

export const apiGetCurrentUser = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch('http://localhost:5000/api/v1/user', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			resolve(response.json());
		} catch (err) {
			reject(err);
		}
	});
};

export const logout = (data) =>
	instance(
		{
			url: '/user/logout',
			method: 'post',
			data,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);

export const apiRegister = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/user/register',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				},
			);
			resolve(response.json());
		} catch (err) {
			reject(err);
		}
	});
};

export const apiForgotPassword = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/v1/user/forgot-password',
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				},
			);
			resolve(response.json());
		} catch (err) {
			reject(err);
		}
	});
};
