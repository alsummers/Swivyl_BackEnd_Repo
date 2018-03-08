module.exports = app => {
    app.use('/api/user', require('./controllers/userscontroller'));
    app.use('/api/property', require('./controllers/propertycontroller'));
    app.use('/api/client', require('./controllers/clientcontroller'));

    // Test page
    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + '/index.html')
    })
}