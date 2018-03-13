const router = require('express').Router();
const db = require('../models/index');
const Company = db.sequelize.import('../models/company.js');
const Client = db.sequelize.import('../models/client.js')
const Entity = db.sequelize.import('../models/entity.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
const Log = db.sequelize.import('../models/log.js')
// CREATING ENTITY
router.post('/',requireJwt,(req, res)  => {
    var name = req.body.entity.name
    var company = req.body.company.id
	var owner = req.body.client.uid


    Entity.create({
        entity_name: name,
		companyId: company,
		owner: owner
		
    }).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' created a entity with an id of ' + successData.id,
                message: 'created entity'
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
})

//FINDING ALL ENTITIES OF SPECIFIC CLIENT
//RELOOK INTO WHEN DOING CLIENT SIDE
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

//FINDING ONE SPECIFIC COMPANY
router.get('/:id', requireJwt,function(req, res) {
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
router.put('/',requireJwt,(req, res)  => {
    var name = req.body.entity.name
    var data = req.body.entity.id
    var company = req.body.company.id
	var owner = req.body.client.uid


    Entity.update({
        entity_name: name,
		companyId: company,
		owner: owner 
    },
    {where: {id: data}}
    ).then(
        (successData) => {
			Log.create({
                clientUid: owner,
                description: owner + ' updated the entity with an id of ' + data,
                message: 'upated the entity: ' + name
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

// DELETE SPECIFIC COMPANY
router.delete('/:id',requireJwt, function(req, res) {
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