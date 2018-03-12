const router = require('express').Router();
const db = require('../models/index');
const Shareholders = db.sequelize.import('../models/shareholders.js');
const passport = require('passport');
require('../services/authorizeClient');
const requireJWT = passport.authenticate('jwt', { session: false})

// CREATING ENTITY
router.post('/',(req, res)  => {
    var firstname = req.body.shareholders.firstname
    var lastname = req.body.shareholders.lastname
    var address = req.body.shareholders.address
    var ownership = req.body.shareholders.ownership
    var company = req.body.company.id

    Shareholders.create({
        firstname: firstname,
        lastname: lastname,
        address: address,
        ownership: ownership,
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
router.get('/:id', function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Shareholders
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
    var firstname = req.body.shareholders.firstname
    var lastname = req.body.shareholders.lastname
    var address = req.body.shareholders.address
    var ownership = req.body.shareholders.ownership
    var company = req.body.company.id
    var data = req.body.shareholders.id

    Shareholders.update({
        firstname: firstname,
        lastname: lastname,
        address: address,
        ownership: ownership,
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
	Shareholders
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