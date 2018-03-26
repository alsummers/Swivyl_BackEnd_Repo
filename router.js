const router = require('express').Router();
const path = require('path')

const bcrypt = require('bcryptjs');
const passport = require('passport');

const requireSignin = passport.authenticate('local', {session: false});
const jwt = require('jwt-simple');
const requireJwt = passport.authenticate('jwt', { session: false})
module.exports = app => {
    app.use('/api/user', require('./controllers/userscontroller'));
    app.use('/api/property', require('./controllers/propertycontroller'));
    app.use('/api/client', require('./controllers/clientcontroller'));
    app.use('/api/company', require('./controllers/companycontroller'));
    app.use('/api/entity', require('./controllers/entitycontroller'));
    app.use('/api/fleet', require('./controllers/fleetcontroller'));
    app.use('/api/todo', require('./controllers/todocontroller'));
    app.use('/api/shareholders', require('./controllers/shareholderscontroller'));
    const passport = require('passport');
    app.use('/api/log', require('./controllers/logcontroller'));
    app.get('/profile/:id', (req,res)=>{
        res.sendFile(path.resolve(`./profile/${req.params.id}`))
    })

    // Test page
    app.use(passport.initialize())
    app.use(passport.session())
    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + '/index.html')
    })
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    


    app.get('/auth/google/callback', passport.authenticate('google', {successRedirect: 'http://localhost:4200/#/profile/company-welcome', failureRedirect: '/', session: false}), 
    function(req, res) {
        var token = TokenService.encode(req.user);
        res.redirect("/api?token=" + token);
    });

}