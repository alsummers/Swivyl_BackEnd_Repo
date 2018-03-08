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
    return jwt.encode({sub: clientId , iat: currentTime}, 'i_am_secret')
} 

router.post('/register',(req, res)  => {
    
    Client.create({
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
    )    
})


/// login needs email and password
router.post('/login', requireSignin , (req, res, next) => {

    const clientData = {
        firstName : req.client.firstname,
        lastName : req.client.lastname,
        email : req.client.email,
        token : createToken(req.user.uid)
    }

    res.json({message: "logged in successfully", client: clientData})
})

module.exports = router;