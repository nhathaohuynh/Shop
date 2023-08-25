'use strict';

const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_SECRET;

const generateToken = (options, expires) =>
	jwt.sign(options, JWT_KEY, { expiresIn: expires });
module.exports = {
	generateToken,
};
