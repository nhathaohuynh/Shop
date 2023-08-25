'use strict';
const UserModel = require('../access/user.model');

class UserRes {
	async findUserByEmail(email) {
		return await UserModel.findOne({ email }).lean();
	}

	async findUserById(id) {
		return await UserModel.findById(id).lean();
	}
}

module.exports = new UserRes();
