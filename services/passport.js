const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const db = require('../models/index').sequelize; 
const User = db.import('../models/users');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy( 
    {usernameField: 'email'},
    (email, password, done) =>{        
        User.findOne({ where: {email: email} }).then(
            (user) => {
                if(!user) return done(null, false, { message: 'Incorrect email.' });

                if(!bcrypt.compareSync(password, user.password)) return done(null,  'Incorrect password' );

                return done(null, user);
            },
            (err) => done(err))
    })
)

module.exports = passport;