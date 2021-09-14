const { checkRole } = require('../validations/permission.validation.js');
const files = require('../controllers/files.controller.js');
const auth = require('../validations/token.validation');
const roles = require('../../roles');
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function (_, _, cb) {
		cb(null, 'uploads/');
	},
	filename: function (_, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

module.exports = (app) => {
	var router = require('express').Router();

	router.get(
		'/',
		[upload.none(), auth, checkRole(roles.USER)],
		files.get_files
	);

	router.get(
		'/:file_name',
		[upload.none(), auth, checkRole(roles.USER)],
		files.download_file
	);

	router.post(
		'/',
		[upload.single('doc'), auth, checkRole(roles.ADMIN)],
		files.upload_files
	);

	app.use('/files', router);
};
