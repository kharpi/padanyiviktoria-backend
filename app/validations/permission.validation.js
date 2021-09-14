exports.checkRole = function (required_permission) {
	return (req, res, next) => {
		if (required_permission <= req.user.admin) next();
		else
			return res
				.status(401)
				.json({ status: false, error: 'No permission for this route' });
	};
};
