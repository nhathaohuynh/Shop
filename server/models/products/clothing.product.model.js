'use strict';

const { Schema, model } = require('mongoose');
const DOCUMENT_NAME = 'Clothing';
const COLLECTION_NAME = 'Clothings';
const CLOTHING_SIZE = ['S', 'M', 'L', 'XL'];

const clothingSchema = new Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			enum: CLOTHING_SIZE,
			default: CLOTHING_SIZE[1],
		},
		color: {
			type: String,
		},
		metirial: {
			type: String,
		},
		product_shop: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

module.exports = model(DOCUMENT_NAME, clothingSchema);
