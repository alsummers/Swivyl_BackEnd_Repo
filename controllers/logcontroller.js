const router = require('express').Router();
const db = require('../models/index');
const Company = db.sequelize.import('../models/company.js');
const Client = db.sequelize.import('../models/client.js')
const Entity = db.sequelize.import('../models/entity.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
const Log = db.sequelize.import('../models/log.js')

router.get('/all/:companyId' , requireJwt,function(req, res) {
    var data = req.params.companyId;

	Entity.findAll(
        {
            where: {companyId: data}
        }
    )
	.then(
		//success
		function findAllSuccess(data) {
			// console.log(data);
			res.json(data);
		},
		//failure
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});

module.exports = router;