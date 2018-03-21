const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const db = require('../models/index').sequelize; 
const Client = db.import('../models/client.js');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys')

passport.serializeUser((user, done) => { 
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy( 
    {usernameField: 'email'},
    (email, password, done) =>{        
        Client.findOne({ where: {email: email} }).then(
            (client) => {
                console.log(password)
                if(!client) return done(null, false, { message: 'Incorrect email.' });

                if(!bcrypt.compareSync(password, client.password)) return done(null, false, { message:  'Incorrect password' });

                return done(null, client);
            },
            (err) => done(err))
    })
)

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback', 
    }, (token, tokenSecret, profile, done) => {
        console.log('PROFILELELELEL', profile)
        console.log('EMAIILALALA', profile.emails[0].value)
        // Client.create({email: profile._json.name}, (err, user) => {
        //      return done(err, user)
        // })
        Client.findOne({ where: {email: profile.emails[0].value}}).then(
            (client) => {
                if(!client) return done(null, false, { message: 'Incorrect email.' });
                        },
                        (err) => done(err)
                        )
                        done(null, profile)
        }
    ))


module.exports = passport;