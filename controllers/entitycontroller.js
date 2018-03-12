const router = require('express').Router();
const db = require('../models/index');
const Company = db.sequelize.import('../models/company.js');
const Client = db.sequelize.import('../models/client.js')
const Entity = db.sequelize.import('../models/entity.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJWT = passport.authenticate('jwt', { session: false})

// CREATING ENTITY
router.post('/',(req, res)  => {
    var name = req.body.entity.name
    var company = req.body.company.id

    Entity.create({
        entity_name: name,
        companyId: company
    }).then(
        (successData) => {
            res.json({data: successData})
        },
        (err) => {
            res.send({error: err})
        }
    )    
})

//FINDING ALL ENTITIES OF SPECIFIC CLIENT
//RELOOK INTO WHEN DOING CLIENT SIDE
router.get('/all/:companyId' , function(req, res) {
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

//FINDING ONE SPECIFIC COMPANY
router.get('/:id', function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Entity
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

// UPDATING COMPANY
router.put('/',(req, res)  => {
    var name = req.body.entity.name
    var data = req.body.entity.id
    var company = req.body.company.id

    Entity.update({
        entity_name: name,
        companyId: company 
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

// DELETE SPECIFIC COMPANY
router.delete('/:id', function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Entity
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