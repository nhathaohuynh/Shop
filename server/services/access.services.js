'use strict';

const { BadRequest } = require('../middlewares/error.response');
const { findUserByEmail } = require('../models/responsibility/user.res');

class AccessServices {
	signUp = async ({ email, password, username }) => {
		// check email exist
		const foundUser = await findUserByEmail(email);

		if (foundUser) return new BadRequest('Email address already exist');

		return {
			data: 'register successfully',
		};
	};
}

module.exports = new AccessServices();
