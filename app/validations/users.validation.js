const Joi = require('@hapi/joi');

//Registration validation
exports.registerValidation = (data) => {
	const schema = Joi.object({
		login: Joi.string().required(),
		password: Joi.string().required(),
		admin: Joi.boolean().required(),
	});
	return schema.validate(data);
};

//Login validation
exports.loginValidation = (data) => {
	const schema = Joi.object({
		login: Joi.string().required(),
		password: Joi.string().required(),
	});
	return schema.validate(data);
};

//Role update validation
exports.roleUpdateValidation = (data) => {
	const schema = Joi.object({
		id: Joi.number().required(),
		admin: Joi.boolean().required(),
	});
	return schema.validate(data);
};

//Get user validation
exports.getUserValidation = (data) => {
	const schema = Joi.object({
		id: Joi.number().required(),
	});
	return schema.validate(data);
};

//Delete user validation
exports.deleteUserValidation = (data) => {
	const schema = Joi.object({
		id: Joi.number().required(),
	});
	return schema.validate(data);
};
