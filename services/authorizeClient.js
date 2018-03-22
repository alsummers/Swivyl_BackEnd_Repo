const passport = require('passport'); 
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models/index').sequelize; 
const Client = db.import('../models/client.js');
require('dotenv').config()

passport.use(new JwtStrategy(
    {jwtFromRequest: ExtractJwt.fromHeader('authorization'), secretOrKey: process.env.JWTSECRET },
    (payload, done) => {
        Client.findOne({where: {id:payload.sub}}).then(
            (client) => {
                done(null, client)
            },
            (error) =>done(error)
        )
    }
))