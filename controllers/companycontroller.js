const router = require('express').Router();
const db = require('../models/index');
const Company = db.sequelize.import('../models/company.js');
const Client = db.sequelize.import('../models/client.js')
const passport = require('passport');
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
const Log = db.sequelize.import('../models/log.js')
const multer = require('multer')




// CREATING COMPANY
router.post('/', requireJwt, (req, res)  => {
    var name = req.body.company.name
    var img = req.body.company.img
    var owner = req.user.uid

    Company.create({
        name: name,
        img: img,
        owner: owner
    }).then(
        (successData) => {
            Log.create({
                clientUid: req.user.uid,
                description: req.user.uid + ' created a company with an id of ' + successData.id,
                message: 'created company'
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

//FINDING ALL COMPANIES OF SPECIFIC CLIENT
//RELOOK INTO WHEN DOING CLIENT SIDE
router.get('/' ,requireJwt, function(req, res) {
    var data = req.user.uid;

	Company.findAll(
        {
            where: {owner: data}
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
router.get('/:id',requireJwt, function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	Company
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
    var img = req.body
    var owner = req.user.uid
    

    Company.update({
        img: img,
        owner: owner 
    },
    {where: {id: data}}
    ).then(
        (successData) => {
            Log.create({
                clientUid: req.user.uid,
                description: req.user.uid + ' updated the company with an id of ' + data,
                message: 'updates company'
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
	Company
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