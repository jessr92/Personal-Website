'use strict'

var express = require('express')
var router = express.Router()

var htmlStore = require('./htmlStore')

var handleRequest = function (url, res, next) {
  try {
    if (htmlStore.has(url)) {
      res.send(htmlStore.get(url))
    } else {
      next()
    }
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

router.use(function (req, res, next) {
  handleRequest('$404$', res.status(404), next)
})

router.use(function (err, req, res, next) {
  console.error(err.stack)
  handleRequest('$500$', res.status(500), next)
})

module.exports = router
