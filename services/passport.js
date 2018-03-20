const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
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
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:4200/#/profile/company-welcome'
    }, (token, tokenSecret, profile, done) => {
        console.log(profile)
        // Client.findOrCreate({email: profile.email}, (err, user) => {
        //      return done(err, user)
        // })
        Client.findOrcreate({googleId: profile.id}).then(
                (successData) => {
                    console.log(successData)
                        const clientData = {
                                email : successData.email,
                                token : createToken(successData.token)
                            }
                            res.json({message: `Welcome ${clientData.email}`, data: clientData})
                        },
                        (err) => {
                                res.send({error: err, Client})
                        
                            }
                        )
        }
    ))


module.exports = passport;