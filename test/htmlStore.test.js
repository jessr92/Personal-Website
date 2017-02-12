/* eslint-env mocha */

var assert = require('assert')
var path = require('path')
var fs = require('fs')
var htmlStore = require('../src/js/htmlStore.js')

describe('HTML Store', function () {
  describe('getPage()', function () {
    it('should return HTML for homepage', function () {
      var html = htmlStore.getPage('/')
      assert(html.length > 0)
    })
    it('should return HTML for projects page', function () {
      var html = htmlStore.getPage('/projects')
      assert(html.length > 0)
    })
    it('should return HTML for each project', function () {
      var projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/json/projects.json')))
      for (var idx in projects.ids) {
        var id = projects.ids[idx]
        var html = htmlStore.getPage('/projects/' + id)
        assert(html.length > 0)
      }
    })
    it('should not return HTML for a non-existent page', function () {
      var html = htmlStore.getPage('/non-existent')
      assert(html === undefined)
    })
  })
})
