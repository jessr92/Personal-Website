'use strict'

var path = require('path')
var express = require('express')
var logger = require('morgan')
var helmet = require('helmet')

var htmlStore = require('./src/js/htmlStore.js')

var app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', function (req, res, next) {
  try {
    res.send(htmlStore.getPage('/'))
  } catch (e) {
    next(e)
  }
})

app.get('/projects', function (req, res, next) {
  try {
    res.send(htmlStore.getPage('/projects'))
  } catch (e) {
    next(e)
  }
})

app.get('/projects/:project', function (req, res, next) {
  try {
    var project = req.params.project
    res.send(htmlStore.getPage('/projects/' + project))
  } catch (e) {
    next(e)
  }
})

var port = process.env.PORT || 1337

app.listen(port, function () {
  console.log('Listening on http://localhost:' + port)
})
