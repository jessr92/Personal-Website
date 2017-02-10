var express = require('express'),
    logger = require('morgan'),
    pug = require('pug'),
    fs = require('fs');

var templateDirectory = __dirname + '/source/templates/'
var homepage = pug.compileFile(templateDirectory + 'homepage.pug')
var projectPage = pug.compileFile(templateDirectory + 'project.pug')
var projectsPage = pug.compileFile(templateDirectory + 'projects.pug')

var projects = JSON.parse(fs.readFileSync(__dirname + '/source/json/projects.json'));

var app = express()
app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

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
            "projects": projects
        })
        res.send(html)
    } catch (e) {
        next(e)
    }
})

app.get('/projects/:project', function (req, res, next) {
    try {
        var project = req.params.project;
        var html = projectPage({
            "project": projects.projects[project]
        })
        res.send(html)
    } catch (e) {
        next(e)
    }
})

var port = process.env.port || 1337;

app.listen(port, function () {
    console.log('Listening on http://localhost:' + port)
})