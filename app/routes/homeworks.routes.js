const { checkRole } = require('../validations/permission.validation.js');
const homeworks = require('../controllers/homeworks.controller.js');
const auth = require('../validations/token.validation');
const roles = require('../../roles');
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function (_, _, cb) {
		cb(null, 'homeworks/');
	},
	filename: function (_, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

module.exports = (app) => {
	var router = require('express').Router();

	router.post(
		'/',
		[auth, checkRole(roles.USER), upload.single('doc')],
		homeworks.upload_homework
	);

	router.get(
		'/',
		[upload.none(), auth, checkRole(roles.ADMIN)],
		homeworks.get_homeworks
	);

	router.get(
		'/:file_name',
		[upload.none(), auth, checkRole(roles.ADMIN)],
		homeworks.download_homework
	);

	router.delete(
		'/:file_name',
		[upload.none(), auth, checkRole(roles.ADMIN)],
		homeworks.delete_homework
	);

	app.use('/homeworks', router);
};
