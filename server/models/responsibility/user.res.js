'use strict';
const UserModel = require('../user.model');

class UserRes {
	async findUserByEmail(email) {
		return await UserModel.findOne({ email });
	}
}

module.exports = new UserRes();
