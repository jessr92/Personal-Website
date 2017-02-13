'use strict'

module.exports = (function () {
  var path = require('path')
  var pug = require('pug')
  var fs = require('fs')

  var htmlStore = {}

  var init = function () {
    var templateDirectory = path.join(__dirname, '../templates/')
    var homepage = pug.compileFile(path.join(templateDirectory, 'homepage.pug'))
    var projectPage = pug.compileFile(path.join(templateDirectory + 'project.pug'))
    var projectsPage = pug.compileFile(path.join(templateDirectory + 'projects.pug'))
    var projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/projects.json')))

    htmlStore['/'] = homepage()
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

  var storeAccessor = function () {}
  storeAccessor.get = function (pageId) {
    if (pageId in htmlStore) {
      return htmlStore[pageId]
    }
  }

  init()

  return storeAccessor
})()
