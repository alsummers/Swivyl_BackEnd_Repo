module.exports = app => {
    app.use('/api/user', require('./controllers/userscontroller'));

    // Test page
    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + '/index.html')
    })
}