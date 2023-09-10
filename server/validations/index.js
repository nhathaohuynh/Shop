'use strict';
const joi = require('joi');

const signUpSchema = joi.object({
	username: joi.string().min(5).max(20),
	password: joi.string().min(5).max(20).required(),
	email: joi.string().email().required(),
	role : joi.string()
});

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(5).max(20).required(),
});

const forgotPasswordSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(5).max(20).required(),
});

module.exports = {
	signUpSchema,
	loginSchema,
	forgotPasswordSchema,
};
