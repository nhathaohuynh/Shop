'use strict';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const { Schema, model } = require('mongoose');
const PRODUCT_TYPE = ['Electronic', 'Clothing', 'Technology'];

const productSchema = new Schema(
	{
		product_name: {
			type: String,
			required: true,
			trim: true,
		},
		product_slug: {
			type: String,
			unique: true,
			lowercase: true,
		},
		product_description: {
			type: String,
		},
		product_price: {
			type: Number,
			required: true,
		},
		product_type: {
			type: String,
			required: true,
			enum: PRODUCT_TYPE,
			index: true,
		},
		product_attributes: {
			type: Schema.Types.Mixed,
			required: true,
		},
		product_sold: {
			type: Number,
			dèault: 0,
		},
		product_thumb: {
			type: Array,
		},
		product_shop: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		product_rating: [
			{
				star: {
					type: Number,
					required: true,
				},
				user_id: { type: Schema.Types.ObjectId, ref: 'User' },
				comment: { type: String },
				createdAt: {
					type: Date,
					default: Date.now,
				},
				updatedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		product_rating_likes: [
			{
				user_id: {
					type: Schema.ObjectId,
					ref: 'User',
					required: true,
				},
				rating_id: {
					type: Schema.ObjectId,
					ref: 'product_rating',
					required: true,
				},
				like: {
					type: Number,
					default: 0,
				},
			},
		],
		product_average_rating: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

productSchema.index({ product_name: 1 });

module.exports = model(DOCUMENT_NAME, productSchema);
