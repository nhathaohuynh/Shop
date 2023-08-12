'use strict';

const express = require('express');
const asyncHandler = require('../../middlewares/error.handler');
const AccessController = require('../../controllers/access.controller');
const router = express.Router();
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const signUpSchema = joi.object({
	username: joi.string().min(5).max(20),
	password: joi.string().min(5).max(20).required(),
	email: joi.string().email().required(),
});

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(5).max(20).required(),
});

router.post(
	'/shop/register',
	validator.body(signUpSchema),
	asyncHandler(AccessController.signUp),
);

module.exports = router;
