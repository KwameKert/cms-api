const express = require('express');
var bodyParser = require('body-parser')
const app = express();

const router = require('./routes');

app.use(bodyParser.json())
app.use('/api', router );


module.exports = app


