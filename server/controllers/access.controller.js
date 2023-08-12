'use strict';

const { CreatedResponse } = require('../middlewares/success.response');
const AccessServices = require('../services/access.services');

class AccessController {
	signUp = async (req, res, next) => {
		return new CreatedResponse({
			metaData: await AccessServices.signUp(req.body),
		}).send(res);
	};
}

module.exports = new AccessController();
