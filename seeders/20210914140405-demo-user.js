module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [
			{
				login: 'asd',
				password:
					'$2a$10$/qVL.CkQVmEwS3e2TgRac.BmR9wFbfi1ZTCkHeUJ2QtX.dblDRC5O',
				admin: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				login: 'asda',
				password:
					'$2a$10$/qVL.CkQVmEwS3e2TgRac.BmR9wFbfi1ZTCkHeUJ2QtX.dblDRC5O',
				admin: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
