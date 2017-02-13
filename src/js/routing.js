'use strict'

var express = require('express')
var router = express.Router()

var htmlStore = require('./htmlStore')

var handleRequest = function (url, res, next) {
  try {
    res.send(htmlStore.get(url))
  } catch (e) {
    next(e)
  }
}

router.get('/', function (req, res, next) {
  handleRequest(req.url, res, next)
})

router.get('/projects', function (req, res, next) {
  handleRequest(req.url, res, next)
})

router.get('/projects/:project', function (req, res, next) {
  handleRequest(req.url, res, next)
})

module.exports = router
