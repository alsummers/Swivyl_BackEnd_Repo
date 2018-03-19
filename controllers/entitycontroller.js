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
    var company = req.body.company.uid
    var owner = req.user.uid
    
    


    Entity.create({
        entity_name: name,
		companyId: company,
		owner: owner
		
    }).then(
        (successData) => {
            Log.create({
                clientUid: req.user.uid,
                description: req.user.uid + ' created a entity with an id of ' + successData.uid,
                message: 'created entity',
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
router.get('/:uid', requireJwt,function(req, res) {
	var data = req.params.uid;
	console.log("GEEEEEEEEEET", data.uid);
	Entity
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

// UPDATING COMPANY
router.put('/',requireJwt,(req, res)  => {
    var name = req.body.entity.name
    var data = req.body.entity.uid
    var company = req.body.company.uid
	var owner = req.user.uid


    Entity.update({
        entity_name: name,
		companyId: company,
		owner: owner 
    },
    {where: {uid: data}}
    ).then(
        (successData) => {
			Log.create({
                clientUid: req.user.uid,
                description: req.user.uid + ' updated the entity with an id of ' + data,
                message: 'upated the entity: ' + name,
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

// DELETE SPECIFIC COMPANY
router.delete('/:uid',requireJwt, function(req, res) {
    console.log("+++++++DATA+++++++", req.params)
	var data = req.params.uid;
    
	Entity
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