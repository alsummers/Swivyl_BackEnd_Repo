const router = require('express').Router();
const db = require('../models/index');
const User = db.sequelize.import('../models/user');
const Log = db.sequelize.import('../models/log.js')
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../services/userpassport');
const requireSignin = passport.authenticate('local', {session: false});
require('../services/authorizeClient');
const requireJwt = passport.authenticate('jwt', { session: false})
const jwt = require('jwt-simple');


const createToken = (userId) => {
    const currentTime = new Date().getTime();
    return jwt.encode({sub: userId , iat: currentTime}, process.env.JWTSECRET)
} 

router.post('/register', requireJwt, (req, res)  => {
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var email = req.body.email
    var password = req.body.password
    var entityId = req.body.entity.uid
    var company = req.body.company.uid
    var owner = req.user.uid
    var letters = /^[A-Za-z]+$/;
  
    if(req.body.password.length > 5 && req.body.firstname.match(letters) && req.body.lastname.match(letters)){

    User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: bcrypt.hashSync(password),
        entityId: entityId,
        companyId: company,
        owner: owner 
    }).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' created a user with an id of ' + successData.uid,
                message: 'created a user',
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
        res.send('Names must be letters only. Password must have more than 5 characters and contain no spaces.')
    }
})

router.post('/login', requireSignin , (req, res, next) => {

    const userData = {
        firstName : req.user.firstname,
        lastName : req.user.lastname,
        email : req.user.email,
        token : createToken(req.user.uid),
    }

    res.json({message: "logged in successfully", user: userData})
})

//FINDING ALL USERS OF SPECIFIC ENTITY
router.get('/all/:entityId' , requireJwt, function(req, res) {
    var data = req.params.entityId
	User.findAll(
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

//FIND ALL USERS
router.get('/company/:companyId' , requireJwt, function(req, res) {
    var data = req.params.companyId
	User.findAll(
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

//FINDING ONE SPECIFIC USER
router.get('/:uid', requireJwt, function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	User
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

// UPDATING USER
router.put('/', requireJwt, (req, res)  => {
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var email = req.body.email
    var password = req.body.password
    var entityId = req.body.entity.uid
    var company = req.body.company.uid
    var data = req.body.uid
    var owner = req.user.uid


    User.update({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: bcrypt.hashSync(password),
        entityId: entityId,
        companyId: company,
        owner: owner
    },
    {where: {uid: data}}
    ).then(
        (successData) => {
            Log.create({
                clientUid: owner,
                description: owner + ' updated a user with an id of ' + data,
                message: 'updated a user',
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

// DELETE SPECIFIC USER
router.delete('/:uid', requireJwt, function(req, res) {
	var data = req.params.uid;
	// console.log(data); here for testing purposes
	User
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