const passport = require('passport'); 
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models/index').sequelize; 
const Client = db.import('../models/client.js');


passport.use(new JwtStrategy(
    {jwtFromRequest: ExtractJwt.fromHeader('authorization'), secretOrKey:'i_am_secret' },
    (payload, done) => {
        Client.findOne({where: {uid:payload.sub}}).then(
            (client) => {
                done(null, client)
            },
            (error) =>done(error)
        )
    }
))