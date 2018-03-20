const router = require('express').Router();
const db = require('../models/index');
const Property = db.sequelize.import('../models/property.js');
const Entity = db.sequelize.import('../models/entity.js');
const Log = db.sequelize.import('../models/log.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
// CREATING PROPERTY
router.post('/', requireJwt, (req, res)  => {
    var address = req.body.properties.address
    var building_sprink = req.body.properties.building_sprink
    var building_owner = req.body.properties.building_owner
    var sqft_of_building = req.body.properties.sqft_of_building
    var building_occ = req.body.properties.building_occ
    var location_employees = req.body.properties.location_employees
    var location_contents = req.body.properties.location_contents
    var location_inventory = req.body.properties.location_inventory
    var entityId = req.body.entity.uid
    var company = req.body.company.uid
    var owner = req.user.uid
    var letters = /^[a-zA-Z0-9\s-]+$/
    var numbers = /^\d+$/

if (req.body.properties.address.match(letters) && req.body.properties.building_owner.match(letters) && req.body.properties.sqft_of_building.match(numbers) && req.body.properties.building_occ.match(letters)
&& req.body.properties.location_employees.match(numbers) && req.body.properties.location_contents.match(letters) && req.body.properties.location_inventory.match(letters)){

    Property.create({
        address: address,
        building_sprink: building_sprink,
        building_owner: building_owner,
        sqft_of_building: sqft_of_building,
        building_occ: building_occ,
        location_employees: location_employees,
        location_contents: location_contents,
        location_inventory: location_inventory,
        entityId: entityId,
        companyId: company,
        owner: owner
    }).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' created a property with an id of ' + successData.uid,
                message: 'created a property',
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
        res.send("Invalid characters")
    }  
})

//FINDING ALL PROPERTIES OF SPECIFIC ENTITY
router.get('/all/:entityId' ,requireJwt,  function(req, res) {
    var data = req.params.entityId
	Property.findAll(
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

//FIND ALL PROPERTIES
router.get('/company/:companyId' , requireJwt, function(req, res) {
    var data = req.params.companyId
	Property.findAll(
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

//FINDING ONE SPECIFIC PROPERTY
router.get('/:uid', requireJwt, function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	Property
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

// UPDATING PROPERTY
router.put('/', requireJwt, (req, res)  => {
    var address = req.body.properties.address
    var building_sprink = req.body.properties.building_sprink
    var building_owner = req.body.properties.building_owner
    var sqft_of_building = req.body.properties.sqft_of_building
    var building_occ = req.body.properties.building_occ
    var location_employees = req.body.properties.location_employees
    var location_contents = req.body.properties.location_contents
    var location_inventory = req.body.properties.location_inventory
    var entityId = req.body.entity.uid
    var company = req.body.company.uid
    var data = req.body.properties.uid
    var owner = req.user.uid


    Property.update({
        address: address,
        building_sprink: building_sprink,
        building_owner: building_owner,
        sqft_of_building: sqft_of_building,
        building_occ: building_occ,
        location_employees: location_employees,
        location_contents: location_contents,
        location_inventory: location_inventory,
        entityId: entityId,
        companyId: company,
        owner: owner 
    },
    {where: {uid: data}}
    ).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' updated a property with an id of ' + data,
                message: 'updated a property',
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

// DELETE SPECIFIC PROPERTY
router.delete('/:uid', requireJwt, function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	Property
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