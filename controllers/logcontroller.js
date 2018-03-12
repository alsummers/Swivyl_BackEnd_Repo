const router = require('express').Router();
const db = require('../models/index');
const Log = db.sequelize.import('../models/log.js');
const passport = require('passport');
require('../services/authorizeClient');
const requireJWT = passport.authenticate('jwt', { session: false})

// CREATING ENTITY
router.post('/',(req, res)  => {
    var date = req.body.log.date
    var company = req.body.company.id

    Log.create({
        dateCreated: date,
        companyID: company
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
router.get('/all/:companyID' , function(req, res) {
    var data = req.params.companyID;

	Log.findAll(
        {
            where: {companyID: data}
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
	Log
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
    var date = req.body.log.date
    var data = req.body.log.id
    var company = req.body.company.id

    Log.update({
        dateCreated: date,
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
	Log
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