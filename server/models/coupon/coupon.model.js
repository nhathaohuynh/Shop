'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Coupon';
const COLLECTION_NAME = 'Coupons';

const couponSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			uppercase: true,
		},
		percent_discount: {
			type: Number,
			required: true,
		},
		maximun_discount: {
			type: Number,
		},
		expiry: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

module.exports = model(DOCUMENT_NAME, couponSchema);
