const router = require('express').Router();
const db = require('../models/index');
const Fleet = db.sequelize.import('../models/fleet.js');
const passport = require('passport');
require('../services/authorizeClient');
const requireJWT = passport.authenticate('jwt', { session: false})

// CREATING FLEET
router.post('/',(req, res)  => {
    var year = req.body.fleets.year
    var make = req.body.fleets.make
    var model = req.body.fleets.model
    var vin_number = req.body.fleets.vin
    var driver = req.body.fleets.driver
    var garaging_zip = req.body.fleets.gzip
    var date_added = req.body.fleets.date
    var titled_to = req.body.fleets.titledto
    var entityId = req.body.entity.id
    var companyId = req.body.company.id

    Fleet.create({
        year: year,
        make: make,
        model: model,
        vin_number: vin_number,
        driver: driver,
        garaging_zip: garaging_zip,
        date_added: date_added,
        titled_to: titled_to,
        entityId: entityId,
        companyId: companyId
    }).then(
        (successData) => {
            res.json({data: successData})
        },
        (err) => {
            res.send({error: err})
        }
    )    
})

//FINDING ALL FLEETS OF SPECIFIC ENTITY
router.get('/all/:entityId' , function(req, res) {
    var data = req.params.entityId
	Fleet.findAll(
        {
            where: {entityId: data}
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

//FIND ALL FLEETS
router.get('/company/:companyId' , function(req, res) {
    var data = req.params.companyId
	Fleet.findAll(
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

//FINDING ONE SPECIFIC FlEET
router.get('/:id', function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Fleet
	.findOne({
		where: {id: data}
	}).then(
		function getSuccess(updateData) {
			res.json(updateData);
		},
		function getError(err) {
			res.send(500, err.message);
		}
	);
});

// UPDATING FLEET
router.put('/',(req, res)  => {
    var year = req.body.fleets.year
    var make = req.body.fleets.make
    var model = req.body.fleets.model
    var vin_number = req.body.fleets.vin
    var driver = req.body.fleets.driver
    var garaging_zip = req.body.fleets.gzip
    var date_added = req.body.fleets.date
    var titled_to = req.body.fleets.titledto
    var entityId = req.body.entity.id
    var companyId = req.body.company.id
    var data = req.body.fleets.id

    Fleet.update({
        year: year,
        make: make,
        model: model,
        vin_number: vin_number,
        driver: driver,
        garaging_zip: garaging_zip,
        date_added: date_added,
        titled_to: titled_to,
        entityId: entityId,
        companyId: companyId
    },
    {where: {id: data}}
    ).then(
        (successData) => {
            res.json({data: successData})
        },
        (err) => {
            res.send({error: err})
        }
    )    
});

// DELETE SPECIFIC FLEET
router.delete('/:id', function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Fleet
	.destroy({
		where: {id: data}
	}).then(
		function getSuccess(updateData) {
			res.json(updateData);
		},
		function getError(err) {
			res.send(500, err.message);
		}
	);
});

module.exports = router;