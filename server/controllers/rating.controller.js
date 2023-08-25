'use strict';

const {
	CreatedResponse,
	OkResponse,
} = require('../middlewares/success.response');
const RatingService = require('../services/products/rating');

class RatingController {
	async createRating(req, res, next) {
		const id = req?.user?.id;
		const body = req?.body;
		return new CreatedResponse({
			metaData: await RatingService.createRating({ id, body }),
			message: 'Created rating successfully',
		}).send(res);
	}

	async deleteRating(req, res, next) {
		const id = req?.user?.id;
		const ratingId = req.params.id;
		const pid = req.body.pid;

		return new OkResponse({
			metaData: await RatingService.deleteRating({ id, ratingId, pid }),
			message: 'delete rating successfully',
		}).send(res);
	}
}

module.exports = new RatingController();
