'use strict'

var path = require('path')
var pug = require('pug')
var fs = require('fs')

var templateDirectory = path.join(__dirname, '../templates/')
var htmlStore = {}

var addErrorPages = function () {
  var errorNotFoundPage = pug.compileFile(path.join(templateDirectory, '404.pug'))
  var internalServerErrorPage = pug.compileFile(path.join(templateDirectory, '500.pug'))
  htmlStore['$404$'] = errorNotFoundPage()
  htmlStore['$500$'] = internalServerErrorPage()
}

var addProjectPages = function () {
  var projectPage = pug.compileFile(path.join(templateDirectory + 'project.pug'))
  var projectsPage = pug.compileFile(path.join(templateDirectory + 'projects.pug'))
  var projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/projects.json')))

  htmlStore['/projects'] = projectsPage({
    'projects': projects
  })
  for (var idx in projects.ids) {
    var id = projects.ids[idx]
    htmlStore['/projects/' + id] = projectPage({
      'project': projects.projects[id]
    })
  }
}

var addStaticPages = function () {
  var homepage = pug.compileFile(path.join(templateDirectory, 'homepage.pug'))
  htmlStore[''] = homepage()
}

var init = function () {
  addErrorPages()
  addProjectPages()
  addStaticPages()
}

var getHtmlStore = function () {
  init()

  var storeAccessor = function () {}

  storeAccessor.get = function (pageId) {
    return htmlStore[pageId.replace(/\/$/, '')]
  }

  storeAccessor.has = function (pageId) {
    return pageId.replace(/\/$/, '') in htmlStore
  }

  return storeAccessor
}

module.exports = getHtmlStore()
