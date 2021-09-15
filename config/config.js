require('dotenv').config();
module.exports = {
	development: {
		dialect: 'sqlite',
		storage: 'data.test.sqlite3',
	},
	production: {
		dialect: 'sqlite',
		storage: 'data.sqlite3',
	},
};
