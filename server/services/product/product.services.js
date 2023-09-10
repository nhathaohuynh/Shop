'use strict';

const { BadRequest } = require('../../middlewares/error.response');
const productModel = require('../../models/product/product.model');
const { findProductById } = require('../../models/responsibility/product.res');
const slugify = require('slugify');

class ProductService {
	async createProduct(payload) {
		const data = {
			...payload,
			slug: slugify(payload.title),
		};
		const product = await productModel.create(data);
		return {
			data: product,
		};
	}

	async updateProduct(productId, payload) {
		let data = payload;
		if (payload?.title) {
			data = {
				...data,
				slug: slugify(payload.title),
			};
		}
		const foundProduct = await findProductById(productId);
		if (!foundProduct)
			throw new BadRequest('Cannot update product not exsiting');
		console.log(payload);
		const product = await productModel.findByIdAndUpdate(productId, data, {
			new: true,
		});

		return {
			data: product,
		};
	}

	async deleteProduct(productId) {
		const foundProduct = await findProductById(productId);
		if (!foundProduct)
			throw new BadRequest('Cannot delete product not exsiting');

		const product = await productModel.findByIdAndDelete(productId);
		return {
			data: product,
		};
	}

	async getProduct(pid) {
		const foundProduct = await findProductById(pid);

		if (!foundProduct)
			throw new BadRequest('cannot get product id not existing');

		return {
			product: foundProduct,
		};
	}

	async getProducts(queries) {
		// TODO delete some fields
		console.log(queries);
		const queriesCoppy = {
			...queries,
		};
		const EXCLUER_FIELDS = ['limit', 'sort', 'page', 'fields'];
		EXCLUER_FIELDS.forEach((el) => delete queriesCoppy[el]);

		// TODO  formater gte|| gt || lt || lte => $gte || $gt || $lt || $lte  exact syntax mongoose
		let queriesString = JSON.stringify(queriesCoppy);

		const regex = /\b(gte|gt|lt|lte)\b/g;

		queriesString = queriesString.replace(
			regex,
			(matchedEl) => `$${matchedEl}`,
		);

		const formattedQueries = JSON.parse(queriesString);
		let sortBy = '';
		let fields = '';

		// TODO: filtering
		if (queries?.product_name)
			formattedQueries.product_name = {
				$regex: queries.product_name,
				$options: 'i',
			};

		if (queries?.sort) {
			if (typeof queries?.sort == 'object' && !Array.isArray(queries?.sort)) {
				Object.keys(queries?.sort).forEach((el) => {
					const arraySort = queries?.sort[el].split(',');
					arraySort.forEach((e) => {
						if (e.includes('-')) {
							const field = e.replace(/-/g, '');
							sortBy += `-${el}.${field} `;
						} else {
							sortBy += `${el}.${e} `;
						}
					});
				});
			} else {
				sortBy = queries?.sort.split(',').join(' ');
			}
		}

		if (queries.fields) {
			if (
				typeof queries?.fields == 'object' &&
				!Array.isArray(queries?.fields)
			) {
				Object.keys(queries?.fields).forEach((el) => {
					const arrayFields = queries?.fields[el].split(',');
					arrayFields.forEach((e) => {
						if (e.includes('-')) {
							const field = e.replace(/-/g, '');
							fields += `-${el}.${field} `;
						} else {
							fields += `${el}.${e} `;
						}
					});
				});
			} else {
				fields = queries?.fields.split(',').join(' ');
			}
		}

		const page = +queries.page || 1;
		const limit = +queries.limit || process.env.LIMIT_PRODUCT;
		const skip = (page - 1) * limit;

		const products = await productModel
			.find(formattedQueries)
			.sort(sortBy)
			.select(fields)
			.skip(skip)
			.limit(limit)
			.lean();

		return {
			data: {
				counts: await productModel.find(formattedQueries).countDocuments(),
				products,
			}
		};
	}
}

module.exports = new ProductService();
