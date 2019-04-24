const express = require('express')
const routes = require('./routes')
//body-parser is going to be used to parse the body of post request
const bodyParser = require('body-parser') 

// Create Express App
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.use('/', routes)

module.exports = app
