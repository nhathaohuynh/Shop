'use strict';

const { BadRequest } = require('../../middlewares/error.response');
const {
	findUserByEmail,
	findUserById,
} = require('../../models/responsibility/user.res');
const { selectFields } = require('../../utils');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');
const userModel = require('../../models/access/user.model');
const sendMail = require('../../utils/sendMail');
const EXPIRES_RTK = '7d';
const EXPIRES_ATK = '3d';
const EXPIRES_FTK = '1h';

class AccessServices {
	async signUp({ email, password, username }) {
		// check email exist
		const foundUser = await findUserByEmail(email);
		if (foundUser) throw new BadRequest('Email address already exist');
		//
		const newUser = await userModel.create({ email, password, username });
		if (!newUser) throw new BadRequest('Something went wrong');

		return {
			user: selectFields(newUser, ['email', 'username']),
		};
	}

	async login({ email, password }, res) {
		const foundUser = await findUserByEmail(email);
		if (!foundUser) throw new BadRequest(`Email address doesn't exist`);

		const isMatchPassword = await bcrypt.compare(password, foundUser.password);
		if (!isMatchPassword) throw new BadRequest('Password or Email is wrong');

		const optionsATK = {
			id: foundUser._id,
			role: foundUser.role,
		};
		const optionsRTK = {
			id: foundUser._id,
		};

		const accessToken = generateToken(optionsATK, EXPIRES_ATK);
		const refreshToken = generateToken(optionsRTK, EXPIRES_RTK);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		await userModel.findByIdAndUpdate(
			foundUser._id,
			{ refreshToken },
			{ new: true },
		);

		return {
			accessToken,
			user: selectFields(foundUser, ['username', 'email']),
		};
	}

	async getUser({ id }) {
		const foundUser = await userModel.findById(id);

		return {
			user: selectFileds(foundUser, ['email', 'username', '_id']),
		};
	}
	async refreshToken({ _id, role }) {
		const optionsATK = {
			id: _id,
			role,
		};
		return {
			accessToken: generateToken(optionsATK, EXPIRES_ATK),
		};
	}

	async logout(refreshToken, { id }) {
		if (!refreshToken) throw new BadRequest('Invalid refresh token');

		const foundUser = await findUserById(id);
		const isMatchRefreshToken = refreshToken === foundUser.refreshToken;

		if (!isMatchRefreshToken) throw new BadRequest('Invalid refresh token');

		await userModel.findOneAndUpdate(
			{ refreshToken },
			{ refreshToken: '' },
			{ new: true },
		);
		return;
	}

	async changePassword({ password: newPassword, id }) {
		const foundUser = await findUserById(id);

		if (!foundUser) throw new BadRequest('Account is not existing');

		const salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(newPassword, salt);

		await userModel.findByIdAndUpdate(
			id,
			{ password, passwordChangeAt: Date.now() },
			{ new: true },
		);
		return;
	}
	async forgotPassword({ email, password: newPassword }) {
		const foundUser = await findUserByEmail(email);

		if (!foundUser) throw new BadRequest('Invalid email');

		// genereate chang token
		const optionsForgotPassword = {
			id: foundUser._id,
			newPassword,
		};
		const resetToken = generateToken(optionsForgotPassword, EXPIRES_FTK);

		await UserModel.findOneAndUpdate(
			{ email },
			{
				passwordResetToken: resetToken,
			},
			{ new: true },
		);

		const html = `Please click in link to get new password 
		<a href='${process.env.URL_SERVER}/api/shop/forgot-password/${resetToken}'>Click Here</a>`;

		const options = {
			html,
			to: email,
		};
		sendMail(options);

		return {
			resetToken,
		};
	}
	async comfirmPassword({ id, newPassword }) {
		const foundUser = await findUserById(id);
		if (!foundUser) throw new BadRequest('Account is not existing');

		const salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(newPassword, salt);

		await userModel.findByIdAndUpdate(
			id,
			{ password, passwordResetToken: '', passwordChangeAt: Date().now },
			{ new: true },
		);

		return;
	}

	async getUsers() {
		const foundUsers = await userModel
			.find({})
			.select('-password -role -refreshToken  -passwordResetToken')
			.lean();
		return {
			users: foundUsers,
		};
	}

	async removeUser({ id: userId }) {
		const foundUser = await findUserById(userId);
		if (!foundUser) throw new BadRequest('Cannot remove user not existing');

		const response = await userModel.findByIdAndDelete(userId);
		return {
			result: response,
		};
	}

	async updateUser({ body, id: userId }) {
		const foundUser = await findUserById(userId);
		if (!foundUser) throw new BadRequest('Cannot update user not existing');

		const response = await userModel
			.findByIdAndUpdate(userId, body, { new: true })
			.select('-password -role -refreshToken -passwordResetToken');

		return {
			user: response,
		};
	}

	async updateUserByAdmin({ body, id: userId }) {
		const foundUser = await findUserById(userId);
		if (!foundUser) throw new BadRequest('Cannot update user not existing');

		const response = await userModel
			.findByIdAndUpdate(userId, body, { new: true })
			.select('-password -role -refreshToken -passwordResetToken');

		return {
			user: response,
		};
	}
}

module.exports = new AccessServices();
