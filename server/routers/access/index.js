'use strict';

const express = require('express');
// const asyncHandler = require('../../middlewares/error.handler');
const asyncHandler = require('express-async-handler');
const AccessController = require('../../controllers/access.controller');
const router = express.Router();

const validator = require('express-joi-validation').createValidator({});
const {
	verifyToken,
	verifyRefreshToken,
	verifyForgotToken,
} = require('../../middlewares/verifyToken');
const {
	signUpSchema,
	loginSchema,
	forgotPasswordSchema,
} = require('../../validations');
const { isAdmin } = require('../../middlewares/checkAuthorization');

router.post(
	'/shop/register',
	validator.body(signUpSchema),
	asyncHandler(AccessController.signUp),
);
router.post(
	'/shop/login',
	validator.body(loginSchema),
	asyncHandler(AccessController.login),
);

router.get('/shop', verifyToken, asyncHandler(AccessController.getUser));

router.post(
	'shop/refresh-token',
	verifyRefreshToken,
	asyncHandler(AccessController.refreshToken),
);

router.post('/shop/logout', verifyToken, asyncHandler(AccessController.logout));

router.post(
	'/shop/change-password',
	verifyToken,
	asyncHandler(AccessController.changePassword),
);
router.post(
	'/shop/forgot-password',
	validator.body(forgotPasswordSchema),
	asyncHandler(AccessController.forgotPassword),
);

router.get(
	'/shop/forgot-password/:forgot_token',
	verifyForgotToken,
	asyncHandler(AccessController.comfirmPassword),
);

router.get(
	'/shops',
	[verifyToken, isAdmin],
	asyncHandler(AccessController.getUsers),
);
router.delete(
	'/shop/:id',
	[verifyToken, isAdmin],
	asyncHandler(AccessController.removeUser),
);
router.patch('/shop', verifyToken, asyncHandler(AccessController.updateUser));
router.patch(
	'/shop/:id',
	[verifyToken, isAdmin],
	asyncHandler(AccessController.updateUserByAdmin),
);

module.exports = router;
