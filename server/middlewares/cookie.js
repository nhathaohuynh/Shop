const { findUserByEmail } = require('../models/responsibility/user.res');

const addCookie = async (email, res) => {
	const foundUser = await findUserByEmail(email);
	return res.cookie('refreshToken', foundUser.refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};
const clearCookie = async (res) => {
	return res.clearCookie('refreshToken', { httpOnly: true, secure: true });
};

module.exports = {
	addCookie,
	clearCookie,
};
