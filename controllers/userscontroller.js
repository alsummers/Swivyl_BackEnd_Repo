const router = require('express').Router();
const db = require('../models/index');
const User = db.sequelize.import('../models/user');
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

router.post('/register', (req, res)  => {
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var email = req.body.email
    var password = req.body.password
    var entityId = req.body.entity.id
    var companyId = req.body.company.id

    User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: bcrypt.hashSync(password),
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

router.post('/login', requireSignin , (req, res, next) => {

    const userData = {
        firstName : req.user.firstname,
        lastName : req.user.lastname,
        email : req.user.email,
        token : createToken(req.user.id),
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
router.get('/:id', requireJwt, function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	User
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

// UPDATING USER
router.put('/', requireJwt, (req, res)  => {
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var email = req.body.email
    var password = req.body.password
    var entityId = req.body.entity.id
    var companyId = req.body.company.id
    var data = req.body.id
    User.update({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: bcrypt.hashSync(password),
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

// DELETE SPECIFIC USER
router.delete('/:id', requireJwt, function(req, res) {
	var data = req.params.id;
	// console.log(data); here for testing purposes
	User
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