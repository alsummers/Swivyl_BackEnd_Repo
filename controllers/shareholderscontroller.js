const router = require('express').Router();
const db = require('../models/index');
const Shareholders = db.sequelize.import('../models/shareholders.js');
const Log = db.sequelize.import('../models/log.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})

// CREATING ENTITY
router.post('/', requireJwt, (req, res)  => {
    var firstname = req.body.shareholders.firstname
    var lastname = req.body.shareholders.lastname
    var address = req.body.shareholders.address
    var ownership = req.body.shareholders.ownership
    var company = req.body.company.uid
    var owner = req.user.uid


    Shareholders.create({
        firstname: firstname,
        lastname: lastname,
        address: address,
        ownership: ownership,
        companyId: company,
        owner: owner
    }).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' created a shareholder with an id of ' + successData.uid,
                message: 'created a shareholder',
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
router.get('/all/:companyId' , requireJwt, function(req, res) {
    var data = req.params.companyId;

	Shareholders.findAll(
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
router.get('/:uid', requireJwt, function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	Shareholders
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
router.put('/', requireJwt, (req, res)  => {
    var firstname = req.body.shareholders.firstname
    var lastname = req.body.shareholders.lastname
    var address = req.body.shareholders.address
    var ownership = req.body.shareholders.ownership
    var company = req.body.company.uid
    var data = req.body.shareholders.uid
    var owner = req.user.uid


    Shareholders.update({
        firstname: firstname,
        lastname: lastname,
        address: address,
        ownership: ownership,
        companyId: company,
        owner: owner
    },
    {where: {uid: data}}
    ).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' updated a shareholder with an id of ' + data,
                message: 'updated a shareholder',
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
router.delete('/:uid', requireJwt, function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	Shareholders
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