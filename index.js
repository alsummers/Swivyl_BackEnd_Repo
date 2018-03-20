require('dotenv').config();
const express = require('express');
const app = express();
// change this to https soon.
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
require('./models/index')
const router = require('./router');
const googleSetup = require('./services/authorizeClient')

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// endpoints 
router(app);

http.listen(3000, function(){
    console.log(`listening on port 3000`)
})