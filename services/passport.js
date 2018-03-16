const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const GoogleStrategy = require('passport-google-oauth20')
const db = require('../models/index').sequelize; 
const Client = db.import('../models/client.js');
const bcrypt = require('bcryptjs');
const keys = require('./keys')

passport.use(new LocalStrategy( 
    {usernameField: 'email'},
    (email, password, done) =>{        
        Client.findOne({ where: {email: email} }).then(
            (client) => {
                if(!client) return done(null, false, { message: 'Incorrect email.' });

                if(!bcrypt.compareSync(password, client.password)) return done(null,  'Incorrect password' );

                return done(null, client);
            },
            (err) => done(err))
    })
)

passport.use(
    new GoogleStrategy({
        callbackURL: '/profile/company-welcome',
        ciendID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }), (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        // Client.create({
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname,
        //     email: req.body.email,
        //     password: bcrypt.hashSync(req.body.password) 
        // }).then(
        //     (successData) => {
        //         const clientData = {
        //             firstname : successData.firstname,
        //             lastname : successData.lastname,
        //             email : successData.email,
        //             token : createToken(successData.uid)
        //         }
        //         res.json({message: `Welcome ${clientData.firstname}`, data: clientData})
        //     },
        //     (err) => {
        //         res.send({error: err})
        //     }
        // )    
    }
)


module.exports = passport;