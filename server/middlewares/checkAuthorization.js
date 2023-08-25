'use strict';

const asyncHandler = require('express-async-handler');
const { Forbidden } = require('./error.response');

const isAdmin = asyncHandler(async (req, res, next) => {
	const { role } = req.user;
	const isMatchAdmin = role === 'admin';
	if (!isMatchAdmin) return next(new Forbidden('Forbidden'));
	next();
});

module.exports = {
	isAdmin,
};
