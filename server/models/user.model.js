'use strict';

const { Schema, model, default: mongoose } = require('mongoose');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
const userSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
		},
		password: {
			type: String,
			min: [3, 'Password least character is 6'],
			max: [20, 'Password maximum character is 20'],
			select: false,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
		},
		cart: {
			type: Array,
			default: [],
		},
		address: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Address',
			},
		],
		wishlist: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Product',
			},
		],
		isBlocked: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
		},

		passwordChangeAt: {
			type: String,
		},
		passwordResetToken: {
			type: String,
		},
		passwordResetExpires: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
