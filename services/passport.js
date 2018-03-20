const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const db = require('../models/index').sequelize; 
const Client = db.import('../models/client.js');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys')

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
        consumerKey: keys.google.consumerKey,
        consumerSecret: keys.google.consumerSecret,
        callbackURL: '/profile/company-welcome'
    }, (token, tokenSecret, profile, done) => {
        console.log(profile)
        Client.findOrCreate({email: profile.email}, (err, user) => {
             return done(err, user)
        })
    }
))
        // Client.findOrcreate({googleId: profile.id}).then(
        //     (successData) => {
        //         const clientData = {
        //             email : successData.email,
        //             token : createToken(successData.uid)
        //         }
        //         res.json({message: `Welcome ${clientData.firstname}`, data: clientData})
        //     },
        //     (err) => {
        //         res.send({error: err, Client})
   
        //     }
        // )


module.exports = passport;