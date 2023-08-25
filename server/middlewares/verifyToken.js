'use strict';

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { BadRequest, Forbidden } = require('./error.response');
const { findUserById } = require('../models/responsibility/user.res');
const JWT_KEY = process.env.JWT_SECRET;

const verifyToken = asyncHandler(async (req, res, next) => {
	const isFormatToken = req.headers?.authorization?.startsWith('Bearer');

	if (!isFormatToken) return next(new BadRequest('Required authentication!!'));

	const token = req.headers?.authorization?.split(' ')[1];

	jwt.verify(token, JWT_KEY, async function (err, decoded) {
		if (err) {
			const message =
				err.name === 'JsonWebTokenError' ? 'Authorization !!' : err.message;
			return next(new BadRequest(message));
		}
		const foundUser = await findUserById(decoded.id);
		if (!foundUser) return next(new BadRequest('User is not existing'));
		req.user = decoded;
		next();
	});
});

const verifyRefreshToken = asyncHandler(async (req, res, next) => {
	const refreshToken = req?.cookies?.refreshToken;

	if (!refreshToken) {
		return next(new Forbidden('Provide refresh token please !!'));
	}

	jwt.verify(refreshToken, JWT_KEY, async (err, decoded) => {
		if (err) {
			const message =
				err.name === 'JsonWebTokenError' ? 'Authorization !!' : err.message;
			return next(new BadRequest(message));
		}

		const foundUser = await findUserById(decoded.id);
		if (!foundUser) return next(new BadRequest('User is not existing'));

		const isMatchRefreshToken = refreshToken === foundUser.refreshToken;
		if (!isMatchRefreshToken)
			return next(new BadRequest('Invalid refresh token'));

		req.user = foundUser;
		next();
	});
});

const verifyForgotToken = asyncHandler(async (req, res, next) => {
	const forgot_token = req?.params?.forgot_token;
	if (!forgot_token) throw new BadRequest('Please provide forgot token');

	jwt.verify(forgot_token, JWT_KEY, async (err, decoded) => {
		if (err) {
			const message =
				err.name === 'JsonWebTokenError' ? 'Authorization !!' : err.message;
			return next(new BadRequest(message));
		}

		const foundUser = await findUserById(decoded.id);
		if (!foundUser) throw new BadRequest('Account is not existing');

		const isMatchedToken = forgot_token === foundUser.passwordResetToken;
		if (!isMatchedToken)
			return next(new BadRequest('forgot token is not matching'));

		req.infoForgot = decoded;
		next();
	});
});
module.exports = {
	verifyToken,
	verifyRefreshToken,
	verifyForgotToken,
};
