module.exports = app => {
    app.use('/api/user', require('./controllers/userscontroller'));
    app.use('/api/property', require('./controllers/propertycontroller'));
    app.use('/api/client', require('./controllers/clientcontroller'));
    app.use('/api/company', require('./controllers/companycontroller'));
    app.use('/api/entity', require('./controllers/entitycontroller'));
    app.use('/api/fleet', require('./controllers/fleetcontroller'));


    // Test page
    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + '/index.html')
    })
}