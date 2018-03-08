const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const db = require('../models/index').sequelize; 
const Client = db.import('../models/users');
const bcrypt = require('bcryptjs');

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

module.exports = passport;