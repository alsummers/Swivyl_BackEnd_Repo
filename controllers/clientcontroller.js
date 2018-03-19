const router = require('express').Router();
const db = require('../models/index');
const Client = db.sequelize.import('../models/client.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../services/passport');
const requireSignin = passport.authenticate('local', {session: false});
const jwt = require('jwt-simple');


const createToken = (clientId) => {
    const currentTime = new Date().getTime();
    return jwt.encode({sub: clientId , iat: currentTime}, process.env.JWTSECRET )
} 

router.post('/register',(req, res)  => {
    if(req.body.password.length > 5){
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
        res.send('Password must have more than 5 characters and contain no spaces.')
    }    
})


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