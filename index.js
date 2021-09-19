const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(function (req, _, next) {
	if (req.headers['content-type'] === 'application/json;') {
		req.headers['content-type'] = 'application/json';
	}
	next();
});

const whitelist = ['https://padanyiviktoria.hu', 'http://localhost:3000'];

app.use(
	cors({
		origin: whitelist,
		credentials: true,
	})
);

app.use(express.json());

app.use(function (_, res, next) {
	res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
	next();
});

const db = require('./models');
db.sequelize.sync();

require('./app/routes/users.routes')(app);
require('./app/routes/files.routes')(app);
require('./app/routes/homeworks.routes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () =>
	console.log(
		`Server listening in ${
			process.env.NODE_ENV || 'development'
		} mode on port ${port}`
	)
);
