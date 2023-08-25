'use strict';

const { Schema, model } = require('mongoose');
const DOCUMENT_NAME = 'Electronic';
const COLLECTION_NAME = 'Electronics';
const electronicSchema = new Schema(
	{
		manufacturer: {
			type: String,
			required: true,
		},
		model: {
			type: String,
		},
		color: {
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

module.exports = model(DOCUMENT_NAME, electronicSchema);
