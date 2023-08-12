'use strict';

const StatusCode = {
	FORBIDDEN: 403,
	BAD_REQUEST: 400,
};

const StatusMessage = {
	FORBIDDEN: 'forbidden',
	BAD_REQUEST: ' Bad request error',
};
class ErrorResponse extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
	}
}

class BadRequest extends ErrorResponse {
	constructor(
		status = StatusCode.BAD_REQUEST,
		message = StatusMessage.BAD_REQUEST,
	) {
		super(status, message);
	}
}

class Forbidden extends ErrorResponse {
	constructor(
		status = StatusCode.FORBIDDEN,
		message = StatusMessage.FORBIDDEN,
	) {
		super(status, message);
	}
}

module.exports = {
	Forbidden,
	BadRequest,
};
