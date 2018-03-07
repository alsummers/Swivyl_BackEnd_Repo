const router = require('express').Router();
const db = require('../models/index');
const User = db.sequelize.import('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../services/passport');
const requireSignin = passport.authenticate('local', {session: false});
const jwt = require('jwt-simple');


const createToken = (userId) => {
    const currentTime = new Date().getTime();
    return jwt.encode({sub: userId , iat: currentTime}, process.env.JWTSECRET)
} 

router.post('/signup',(req, res)  => {
    
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        img: req.body.img, 
        password: bcrypt.hashSync(req.body.password) 
    }).then(
        (successData) => {
            const userData = {
                firstName : successData.firstname,
                lastName : successData.lastname,
                email : successData.email,
                token : createToken(successData.uid),
                img: successData.img
            }
            res.json({message: `Welcome ${userData.firstName}`, data: userData})
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
        token : createToken(req.user.uid),
        img: req.user.img
    }

    res.json({message: "logged in successfully", user: userData})
})

module.exports = router;