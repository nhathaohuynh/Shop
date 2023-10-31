'use strict'
const notFound = (req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
}
const errorHandler = (error, req, res, next) => {
	const statusCode = error.status || 500
	return res.status(statusCode).json({
		status: 'error',
		code: -1,
		message: error.message || 'Internal server',
		error: error.stack,
	})
}

module.exports = {
	notFound,
	errorHandler,
}
