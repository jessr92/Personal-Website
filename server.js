'use strict'

const path = require('path')

var express = require('express')
var logger = require('morgan')
var pug = require('pug')
var fs = require('fs')

var templateDirectory = path.join(__dirname, '/source/templates/')
var homepage = pug.compileFile(path.join(templateDirectory, 'homepage.pug'))
var projectPage = pug.compileFile(path.join(templateDirectory + 'project.pug'))
var projectsPage = pug.compileFile(path.join(templateDirectory + 'projects.pug'))

var projects = JSON.parse(fs.readFileSync(path.join(__dirname, '/source/json/projects.json')))

var app = express()

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', function (req, res, next) {
  try {
    res.send(homepage())
  } catch (e) {
    next(e)
  }
})

app.get('/projects', function (req, res, next) {
  try {
    var html = projectsPage({
      'projects': projects
    })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/projects/:project', function (req, res, next) {
  try {
    var project = req.params.project
    var html = projectPage({
      'project': projects.projects[project]
    })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

var port = process.env.PORT || 1337

app.listen(port, function () {
  console.log('Listening on http://localhost:' + port)
})
