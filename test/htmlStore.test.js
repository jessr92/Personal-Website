/* eslint-env mocha */

'use strict'

var assert = require('assert')
var path = require('path')
var fs = require('fs')
var htmlStore = require('../src/js/htmlStore.js')

describe('HTML Store', function () {
  describe('get', function () {
    it('should return HTML for homepage', function () {
      var html = htmlStore.get('/')
      assert(html.length > 0)
    })
    it('should return HTML for projects page', function () {
      var html = htmlStore.get('/projects')
      assert(html.length > 0)
    })
    it('should return HTML for each project', function () {
      var projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/json/projects.json')))
      for (var idx in projects.ids) {
        var id = projects.ids[idx]
        var html = htmlStore.get('/projects/' + id)
        assert(html.length > 0)
      }
    })
    it('should not return HTML for a non-existent page', function () {
      var html = htmlStore.get('/non-existent')
      assert(html === undefined)
    })
  })
})
