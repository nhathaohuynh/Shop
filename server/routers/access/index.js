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
	verifyAuthencationToken,
} = require('../../middlewares/verifyToken');
const {
	signUpSchema,
	loginSchema,
	forgotPasswordSchema,
} = require('../../validations');
const { isAdmin } = require('../../middlewares/checkAuthorization');

router.post(
	'/user/register',
	validator.body(signUpSchema),
	asyncHandler(AccessController.signUp),
);

router.get(
	'/user/authen-register/:token',
	asyncHandler(AccessController.authenRegister),
);

router.post(
	'/user/login',
	validator.body(loginSchema),
	asyncHandler(AccessController.login),
);

router.get('/user', verifyToken, asyncHandler(AccessController.getUser));

router.post(
	'/user/refresh-token',
	verifyRefreshToken,
	asyncHandler(AccessController.refreshToken),
);

router.post('/user/logout', verifyRefreshToken, asyncHandler(AccessController.logout));

router.post(
	'/user/change-password',
	verifyToken,
	asyncHandler(AccessController.changePassword),
);
router.post(
	'/user/forgot-password',
	validator.body(forgotPasswordSchema),
	asyncHandler(AccessController.forgotPassword),
);

router.get(
	'/user/forgot-password/:forgot_token',
	verifyAuthencationToken,
	asyncHandler(AccessController.comfirmPassword),
);

router.get(
	'/users',
	[verifyToken, isAdmin],
	asyncHandler(AccessController.getUsers),
);
router.delete(
	'/user/:id',
	[verifyToken, isAdmin],
	asyncHandler(AccessController.removeUser),
);
router.patch('/user', verifyToken, asyncHandler(AccessController.updateUser));
router.patch(
	'/user/:id',
	[verifyToken, isAdmin],
	asyncHandler(AccessController.updateUserByAdmin),
);

module.exports = router;
