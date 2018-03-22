const router = require('express').Router();
const db = require('../models/index');
const Client = db.sequelize.import('../models/client.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../services/passport');
const requireSignin = passport.authenticate('local', {session: false});
const jwt = require('jwt-simple');
const requireJwt = passport.authenticate('jwt', { session: false})


const createToken = (clientId) => {
    const currentTime = new Date().getTime();
    return jwt.encode({sub: clientId , iat: currentTime}, process.env.JWTSECRET )
} 

router.post('/register',(req, res)  => {

    var letters = /^[A-Za-z_'_-]+$/;
  

    if(req.body.password.length > 5 && req.body.firstname.match(letters) && req.body.lastname.match(letters)){

    Client.create(
        {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password) 
    }).then(
        (successData) => {
            const clientData = {
                firstname : successData.firstname,
                lastname : successData.lastname,
                email : successData.email,
                token : createToken(successData.uid)
            }
            res.json({message: `Welcome ${clientData.firstname}`, data: clientData})
        },
        (err) => {
            res.send({error: err})
        }
    )} else {
        res.send('Names must be letters only. Password must have more than 5 characters and contain no spaces.')
    }    
})

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
    res.send("you've reached the callback URL!")
})

router.get('/all' , requireJwt,function(req, res) {

	Client.findAll(
       
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
/// login needs email and password
router.post('/login', requireSignin , (req, res, next) => {

    const clientData = {
        firstName : req.user.firstname,
        lastName : req.user.lastname,
        email : req.user.email,
        uid: req.user.uid,
        token : createToken(req.user.uid)
    }

    res.json({message: "logged in successfully", client: clientData})
})

module.exports = router;