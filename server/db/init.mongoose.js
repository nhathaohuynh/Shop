'use strict';

const mongoose = require('mongoose');

const connectString = process.env.DB_URL;
class Database {
	constructor() {
		this.connect();
	}

	connect(type = 'mongoose') {
		if (1 === 1) {
			mongoose.set('debug', true);
			mongoose.set('debug', { color: true });
		}

		mongoose
			.connect(connectString)
			.then((_) =>
				console.log(`Connected mongoose successful`),
			)
			.catch((err) => console.log('error connect'));
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new Database();
		}
		return this.instance;
	}
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;
