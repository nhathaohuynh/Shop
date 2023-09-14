const { findUserByEmail } = require('../models/responsibility/user.res');

const addCookie = async (email, res) => {
	const foundUser = await findUserByEmail(email);
	console.log('add cookie')
	return res.cookie('refreshToken', foundUser.refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};
const clearCookie = async (res) => {
	return res.clearCookie('refreshToken', {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
	});
};

module.exports = {
	addCookie,
	clearCookie,
};
