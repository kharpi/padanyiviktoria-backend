exports.error_template = (res, status, error) => {
	return res.status(status).json({ status: false, error: error });
};
exports.simple_ok_template = (res, message) => {
	return res.json({ status: true, message: message });
};
