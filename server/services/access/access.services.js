'use strict';

const { BadRequest, Forbidden } = require('../../middlewares/error.response');
const CryptoJS = require('crypto-js');
const {
	findUserByEmail,
	findUserById,
} = require('../../models/responsibility/user.res');
const { selectFields } = require('../../utils');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');
const userModel = require('../../models/access/user.model');
const sendMail = require('../../utils/sendMail');
const JWT = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET;
const EXPIRES_RTK = '7d';
const EXPIRES_ATK = '3d';
const EXPIRES_FTK = '300s';

class AccessServices {
	async signUp({ email, password, username, role }, res) {
		// check email exist
		const foundUser = await findUserByEmail(email);
		if (foundUser) throw new BadRequest('Email address already exist');
		//

		const optionsAUTK = {
			email,
			username,
		};
		const token = generateToken(optionsAUTK, EXPIRES_FTK);

		const data = {
			email,
			username,
			role,
			password: CryptoJS.AES.encrypt(password, JWT_KEY).toString(),
		};

		const html = `Please click in link to authenticate account 
		<a href='${process.env.URL_SERVER}/api/v1/user/authen-register/${token}'>Click Here</a>`;

		const options = {
			html,
			to: email,
			subject: 'Authenticate acoount ✔',
		};

		sendMail(options);

		return data;
	}

	async authenRegister(payload, tokenParam, res) {
		const CLIENT = process.env.CLIENT_URL;
		const { password, ...infoUser } = payload;

		const { email } = JWT.verify(tokenParam, JWT_KEY);
		if (!email) return res.redirect(`${CLIENT}/authen-register/failed`);

		const foundUser = await findUserByEmail(email);

		if (foundUser) return res.redirect(`${CLIENT}/authen-register/failed`);

		if (email !== infoUser.email)
			return res.redirect(`${CLIENT}/authen-register/failed`);

		const bytes = CryptoJS.AES.decrypt(password, JWT_KEY);
		const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
		const user = {
			...infoUser,
			password: originalPassword,
		};

		const newUser = await userModel.create(user);
		if (!newUser) return res.redirect(`${CLIENT}/authen-register/failed`);

		return res.redirect(301, `${CLIENT}/authen-register/success`);
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
			user: selectFields(foundUser, ['username', 'email', '_id']),
		};
	}

	async getUser({ id }) {
		const foundUser = await userModel.findById(id).select('-password');

		return {
			user: foundUser,
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

		const resetToken = CryptoJS.AES.encrypt(
			JSON.stringify(optionsForgotPassword),
			JWT_KEY,
		).toString();

		console.log(resetToken);
		const data = {
			id: foundUser._id,
			email: foundUser.email,
		};

		const token = generateToken(data, EXPIRES_FTK);

		await userModel.findByIdAndUpdate(
			foundUser._id,
			{
				passwordResetToken: resetToken,
			},
			{ new: true },
		);

		const html = `Please click in link to get new password 
		<a href='${process.env.URL_SERVER}/api/v1/user/forgot-password/${token}'>Click Here</a>`;

		const options = {
			html,
			to: email,
			subject: 'Forgot Password ✔',
		};
		sendMail(options);

		//if user not click to link server will delete automatic
		setTimeout(async () => {
			await userModel.findByIdAndUpdate(foundUser._id, {
				passwordResetToken: '',
			});
		}, 30000);

		return;
	}

	async comfirmPassword({ email, id }, res) {
		const CLIENT = process.env.CLIENT_URL;
		if (!email || !id) return res.redirect(`${CLIENT}/forgot-password/failed`);

		const foundUser = await findUserById(id);
		if (!foundUser) return res.redirect(`${CLIENT}/forgot-password/failed`);

		const bytes = CryptoJS.AES.decrypt(foundUser.passwordResetToken, JWT_KEY);
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

		console.log(decryptedData);
		if (decryptedData?.id !== id)
			return res.redirect(`${CLIENT}/forgot-password/failed`);

		const newPassword = decryptedData?.newPassword;

		const salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(newPassword, salt);

		console.log(newPassword);

		await userModel.findByIdAndUpdate(
			id,
			{ password, passwordResetToken: '', passwordChangeAt: Date().now },
			{ new: true },
		);

		return res.redirect(`${CLIENT}/forgot-password/success`);
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
