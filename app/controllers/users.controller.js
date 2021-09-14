const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../models');
const {
	loginValidation,
	registerValidation,
	getUserValidation,
	roleUpdateValidation,
	deleteUserValidation,
} = require('../validations/users.validation');
const {
	error_template,
	simple_ok_template,
} = require('../templates/return_messages.template');
const Users = db.User;

/*
 ** USER LOGIN
 */
exports.login = async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return error_template(res, 400, error.details[0].message);

	const user_data = await Users.findOne({ where: { login: req.body.login } });
	if (!user_data) return error_template(res, 400, 'Bad request');

	const validPass = await bcrypt.compare(req.body.password, user_data.password);
	if (!validPass) return error_template(res, 401, 'Authentication error');
	else {
		const token = jwt.sign(
			{ id: user_data.id, admin: user_data.admin },
			process.env.JWT_SECRET,
			{
				expiresIn: '24h',
			}
		);

		return simple_ok_template(res, {
			token: token,
		});
	}
};

/*
 ** USER REGISTER
 */
exports.register = async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return error_template(res, 400, error.details[0].message);

	const user_data = await Users.findOne({ where: { login: req.body.login } });
	if (user_data)
		return error_template(res, 400, 'Login name already registered');

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = {
		login: req.body.login,
		password: hashedPassword,
		admin: req.body.admin,
	};

	const created_user = await Users.create(user);
	if (created_user) return simple_ok_template(res, 'Successfully created user');
	else return error_template(res, 500, 'Cannot create the user');
};

/*
 ** USER ROLE UPDATE
 */
exports.role_update = async (req, res) => {
	const { error } = roleUpdateValidation(req.body);
	if (error) return error_template(res, 400, error.details[0].message);

	const user_data = await Users.findOne({
		where: { id: req.body.id },
	});
	if (!user_data) return error_template(res, 400, 'Cannot find user');

	const update_user = await Users.update(
		{ admin: req.body.admin },
		{
			where: { id: user_data.id },
		}
	);
	if (update_user != 1) return error_template(res, 400, 'Cannot update user');
	return simple_ok_template(res, 'Successfully updated role');
};

/*
 ** GET ALL USERS DATA
 */
exports.get_users = async (_, res) => {
	const user_data = await Users.findAll({
		attributes: { exclude: ['password'] },
	});
	return simple_ok_template(res, user_data);
};

/*
 ** GET ONE USER DATA
 */
exports.get_user = async (req, res) => {
	const { error } = getUserValidation(req.params);
	if (error) return error_template(res, 400, error.details[0].message);
	const user_data = await Users.findOne({
		where: { id: req.params.id },
		attributes: { exclude: ['password'] },
	});
	if (!user_data) return error_template(res, 400, 'Cannot find user');
	return simple_ok_template(res, user_data);
};

/*
 ** GET ALL USER ROLES
 */
exports.get_roles = async (_, res) => {
	return simple_ok_template(res, roles);
};

/*
 ** DELETE USER
 */
exports.delete_user = async (req, res) => {
	const { error } = deleteUserValidation(req.params);
	if (error) return error_template(res, 400, error.details[0].message);

	const id = req.params.id;
	const user_delete = await Users.destroy({
		where: { id: id },
	});
	if (user_delete != 1) return error_template(res, 400, 'Cannot delete user');
	return simple_ok_template(res, 'User successfully deleted');
};
