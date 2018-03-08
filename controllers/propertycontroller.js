const router = require('express').Router();
const db = require('../models/index');
const Property = db.sequelize.import('../models/property.js');

// CREATING PROPERTY
router.post('/',(req, res)  => {
    address: req.body.properties.address
    building_sprink: req.body.properties.building_sprink
    building_owner: req.body.properties.building_owner
    sqft_of_building: req.body.properties.sqft_of_building
    building_occ: req.body.properties.building_occ
    location_employees: req.body.properties.location_employees
    location_contents: req.body.properties.location_contents
    location_inventory: req.body.properties.location_inventory
    entityId: req.entity.id

    Property.create({
        address: address,
        building_sprink: building_sprink,
        building_owner: building_owner,
        sqft_of_building: sqft_of_building,
        building_occ: building_occ,
        location_employees: location_employees,
        location_contents: location_contents,
        location_inventory: location_inventory,
        entityId: entityId 
    }).then(
        (successData) => {
            res.json({data: successData})
        },
        (err) => {
            res.send({error: err})
        }
    )    
})

//FINDING ALL PROPERTIES
router.get('/' , function(req, res) {
	Property.findAll()
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
router.get('/:id', function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Videos
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
router.put('/',(req, res)  => {
    address: req.body.properties.address
    building_sprink: req.body.properties.building_sprink
    building_owner: req.body.properties.building_owner
    sqft_of_building: req.body.properties.sqft_of_building
    building_occ: req.body.properties.building_occ
    location_employees: req.body.properties.location_employees
    location_contents: req.body.properties.location_contents
    location_inventory: req.body.properties.location_inventory
    entityId: req.entity.id
    data: req.body.properties.id

    Property.update({
        address: address,
        building_sprink: building_sprink,
        building_owner: building_owner,
        sqft_of_building: sqft_of_building,
        building_occ: building_occ,
        location_employees: location_employees,
        location_contents: location_contents,
        location_inventory: location_inventory,
        entityId: entityId 
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
router.delete('/:id', function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Videos
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