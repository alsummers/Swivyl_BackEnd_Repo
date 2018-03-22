const router = require('express').Router();
const db = require('../models/index');
const Fleet = db.sequelize.import('../models/fleet.js');
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
const Log = db.sequelize.import('../models/log.js')
// CREATING FLEET
router.post('/',requireJwt,(req, res)  => {
    var year = req.body.fleets.year
    var make = req.body.fleets.make
    var model = req.body.fleets.model
    var vin_number = req.body.fleets.vin
    var driver = req.body.fleets.driver
    var garaging_zip = req.body.fleets.gzip
    var date_added = req.body.fleets.date
    var titled_to = req.body.fleets.titledto
    var entityId = req.body.entity.uid
    var company = req.body.company.uid
    var owner = req.user.uid
    var letters = /^[,\%\.\w\d\s-]+$/

    if(req.body.fleets.year.match(letters) && req.body.fleets.make.match(letters) && req.body.fleets.model.match(letters) && req.body.fleets.vin.match(letters) && req.body.fleets.driver.match(letters)
    && req.body.fleets.gzip.match(letters) && req.body.fleets.date.match(letters) && req.body.fleets.titledto.match(letters)){
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
        companyId: company,
        owner: owner
    }).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' created a fleet with an id of ' + successData.uid,
                message: 'created a fleet',
                companyId: company
            }).then(
                (successLog) => {
                    res.json({log : successLog})
                }
            )
        },
        (err) => {
            res.send({error: err})
        }
    )
} else {
    res.send("Only letters A-Z, and numbers 0-9 allowed")
}    
})

//FINDING ALL FLEETS OF SPECIFIC ENTITY
router.get('/all/:entityId' , requireJwt,function(req, res) {
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
router.get('/company/:companyId' , requireJwt,function(req, res) {
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
router.get('/:uid', requireJwt,function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	Fleet
	.findOne({
		where: {uid: data}
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
router.put('/',requireJwt,(req, res)  => {
    var year = req.body.fleets.year
    var make = req.body.fleets.make
    var model = req.body.fleets.model
    var vin_number = req.body.fleets.vin
    var driver = req.body.fleets.driver
    var garaging_zip = req.body.fleets.gzip
    var date_added = req.body.fleets.date
    var titled_to = req.body.fleets.titledto
    var entityId = req.body.entity.uid
    var company = req.body.company.uid
    var data = req.body.fleets.uid
    var owner = req.user.uid


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
        companyId: company,
        owner: owner
    },
    {where: {uid: data}}
    ).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' updated fleet with an id of ' + data,
                message: 'updated a fleet',
                companyId: company
            }).then(
                (successLog) => {
                    res.json({log : successLog})
                }
            )
        },
        (err) => {
            res.send({error: err})
        }
    )    
});

// DELETE SPECIFIC FLEET
router.delete('/:uid', requireJwt,function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	Fleet
	.destroy({
		where: {uid: data}
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