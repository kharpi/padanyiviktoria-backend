const fs = require('fs');
const path = require('path');
const {
	error_template,
	simple_ok_template,
} = require('../templates/return_messages.template');

const uploadDir = '../../uploads';
const uploadPath = path.resolve(__dirname, uploadDir);

exports.upload_files = async (req, res) => {
	if (!req.file) {
		return error_template(res, 400, 'Bad request');
	} else {
		return simple_ok_template(res, 'Successfully uploaded');
	}
};

exports.get_files = (_, res) => {
	const file_list = fs.readdirSync(uploadPath).map((file) => file);
	simple_ok_template(res, file_list);
};

exports.download_file = (req, res) => {
	const file = `${uploadPath}/${req.params.file_name}`;
	if (!fs.existsSync(file)) {
		return error_template(res, 400, 'File not found');
	}
	res.download(file);
};

exports.delete_file = (req, res) => {
	const file = `${uploadPath}/${req.params.file_name}`;
	fs.unlink(file, (err) => {
		if (err) return error_template(res, 500, 'Cannot delete file');
		return simple_ok_template(res, 'Successfully deleted');
	});
};
