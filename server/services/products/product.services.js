'use strict';

const { BadRequest } = require('../../middlewares/error.response');
const productModel = require('../../models/products/product.model');
const { findProductById } = require('../../models/responsibility/product.res');
const Clothing = require('./clothing.product.services');
const Electronic = require('./electronic.product.services');
const asyncHandler = require('express-async-handler');

const ELECTRONIC = 'Electronic';
const CLOTHING = 'Clothing';

class ProductFactory {
	static productRegistry = {};

	static registerProductType(type, classRef) {
		this.productRegistry[type] = classRef;
	}

	static async createProduct(type, payload) {
		const productClass = this.productRegistry[type];
		if (!productClass) throw new BadRequest(`Invalid product types ${type}`);

		return new productClass(payload).createProduct();
	}

	static async updateProduct(type, productId, payload) {
		const productClass = this.productRegistry[type];
		if (!productClass) throw new BadRequest(`Invalid product types ${type}`);

		return new productClass(payload).updateProduct(productId);
	}

	static async deleteProduct(type, productId) {
		const productClass = this.productRegistry[type];
		if (!productClass) throw new BadRequest(`Invalid product types ${type}`);

		return new productClass({}).deleteProduct(productId);
	}

	static async getProduct(pid) {
		const foundProduct = await findProductById(pid);

		if (!foundProduct)
			throw new BadRequest('cannot get product id not existing');

		return {
			product: foundProduct,
		};
	}

	static async getProducts(queries) {
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
			counts: await productModel.find(formattedQueries).countDocuments(),
			products,
		};
	}
}

// register type product
ProductFactory.registerProductType(ELECTRONIC, Electronic);
ProductFactory.registerProductType(CLOTHING, Clothing);

module.exports = ProductFactory;
