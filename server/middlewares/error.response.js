const StatusCode = {
	FORBIDDEN: 403,
	BAD_REQUEST: 400,
};

const StatusMessage = {
	FORBIDDEN: 'forbidden',
	BAD_REQUEST: ' Bad request error',
};

class ErrorResponse extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

class BadRequest extends ErrorResponse {
	constructor(
		message = StatusMessage.BAD_REQUEST,
		status = StatusCode.BAD_REQUEST,
	) {
		super(message, status);
	}
}

class Forbidden extends ErrorResponse {
	constructor(
		message = StatusMessage.FORBIDDEN,
		status = StatusCode.FORBIDDEN,
	) {
		super(message, status);
	}
}

module.exports = {
	Forbidden,
	BadRequest,
};
