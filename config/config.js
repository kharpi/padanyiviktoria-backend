require('dotenv').config();
module.exports = {
	development: {
		dialect: 'sqlite',
		storage: 'data.sqlite3',
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOSTNAME,
		dialect: 'mysql',
	},
};
