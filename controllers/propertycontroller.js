const router = require('express').Router();
const db = require('../models/index');
const Property = db.sequelize.import('../models/property.js');
const Entity = db.sequelize.import('../models/entity.js');
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
    var entityId = req.body.entity.id
    var companyId = req.body.company.id

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
router.get('/:id', requireJwt, function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Property
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
    var entityId = req.body.entity.id
    var companyId = req.body.company.id
    var data = req.body.properties.id

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

// DELETE SPECIFIC PROPERTY
router.delete('/:id', requireJwt, function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Property
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