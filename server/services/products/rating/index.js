'use strict';

const { BadRequest } = require('../../../middlewares/error.response');
const productModel = require('../../../models/products/product.model');
const {
	findProductById,
	updateTotalRating,
	updateRating,
} = require('../../../models/responsibility/product.res');

class RatingService {
	async createRating({ id, body }) {
		const { pid, comment, star } = body;

		const foundProduct = await findProductById(pid);
		if (!foundProduct)
			throw new BadRequest('Cannot create rating for product not existing');

		const alreadyRating = foundProduct?.product_rating.find(
			(el) => el?.user_id.toString() === id,
		);

		//  TODO update rating
		if (alreadyRating) {
			const body = {
				$set: {
					'product_rating.$.star': star,
					'product_rating.$.comment': comment,
				},
			};
			const condition = {
				_id: pid,
				product_rating: { $elemMatch: alreadyRating },
			};

			await updateRating(condition, body);
			// TODO update star rating
			await updateTotalRating(pid);

			return {
				product: await findProductById(pid),
			};

			// TODO create rating
		} else {
			const body = {
				$push: {
					product_rating: {
						user_id: id,
						comment,
						star,
					},
				},
			};
			const condition = {
				_id: pid,
			};

			await updateRating(condition, body);
			// TODO update star rating
			await updateTotalRating(pid);
			return {
				product: await findProductById(pid),
			};
		}
	}

	async deleteRating({ id, ratingId, pid }) {
		const foundProduct = await findProductById(pid);
		if (!foundProduct)
			throw new BadRequest('Cannot remove rating for product not existing');

		const body = { $pull: { product_rating: { _id: ratingId, user_id: id } } };
		const condition = { _id: pid };

		// TODO delete rating
		await updateRating(condition, body);
		// TODO update star rating
		await updateTotalRating(pid);
		return {
			product: await findProductById(pid),
		};
	}
}

module.exports = new RatingService();
