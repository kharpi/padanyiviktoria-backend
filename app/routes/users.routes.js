const { checkRole } = require('../validations/permission.validation.js');
const users = require('../controllers/users.controller.js');
const auth = require('../validations/token.validation');
const roles = require('../../roles');

module.exports = (app) => {
	var router = require('express').Router();

	//Public routes
	router.get('/roles', users.get_roles);

	router.post('/login', users.login);

	//Private routes
	router.get('/', [auth, checkRole(roles.ADMIN)], users.get_users);

	router.post('/', [auth, checkRole(roles.ADMIN)], users.register);

	router.get('/:id', [auth, checkRole(roles.ADMIN)], users.get_user);

	router.delete('/:id', [auth, checkRole(roles.ADMIN)], users.delete_user);

	router.put('/roles', [auth, checkRole(roles.ADMIN)], users.role_update);

	app.use('/user', router);
};
