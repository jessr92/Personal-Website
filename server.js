'use strict'

var path = require('path')
var express = require('express')
var logger = require('morgan')
var helmet = require('helmet')

var router = require('./src/js/routing')

var app = express()
app.use(helmet())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '/static')))
app.use(router)

var port = process.env.PORT || 1337

app.listen(port, function () {
  console.log('Listening on http://localhost:' + port)
})