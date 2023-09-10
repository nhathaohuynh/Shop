'use strict';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const { Schema, model } = require('mongoose');

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			lowercase: true,
		},
		description: [
			{
				type: String,
			},
		],
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
		},

		sold: {
			type: Number,
			default: 0,
		},
		thumb: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
		brand: {
			type: String, 
		},
		ratings: [
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
		quantity: {
			type: Number,
		},
		totalRatings: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);


module.exports = model(DOCUMENT_NAME, productSchema);
