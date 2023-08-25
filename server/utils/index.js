const _ = require('lodash');

const selectFields = (object, fields) => {
	return _.pick(object, fields);
};

const removeUndefineAndNullObject = (obj) => {
	Object.keys(obj).forEach((k) => {
		if (obj[k] === null || obj[k] === undefined) {
			delete obj[k];
		}
	});
	return obj;
};

const updateNestedObject = (obj) => {
	const final = {};
	Object.keys(obj || {}).forEach((k) => {
		if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
			const nestedObject = updateNestedObject(obj[k]);
			Object.keys(nestedObject || {}).forEach((j) => {
				final[`${k}.${j}`] = nestedObject[j];
			});
		} else {
			final[k] = obj[k];
		}
	});
	return final;
};

const roundedNumber = (number) => Math.round(number * 10) / 10;
module.exports = {
	selectFields,
	removeUndefineAndNullObject,
	updateNestedObject,
	roundedNumber
};
