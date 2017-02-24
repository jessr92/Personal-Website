/* eslint-env mocha */

'use strict'

var request = require('supertest')
var app = require('../src/js/express')

describe('GET request for /', function () {
  it('respond with HTML when the request ends in /', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done)
  })
  it('respond with HTML when the request does not end in /', function (done) {
    request(app)
      .get('')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done)
  })
})
describe('GET request for projects', function () {
  it('respond with HTML when the request ends in /', function (done) {
    request(app)
      .get('/projects/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done)
  })
  it('respond with HTML when the request does not end in /', function (done) {
    request(app)
      .get('/projects')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done)
  })
})
describe('GET request for non-existent page', function () {
  it('respond with HTML and 404', function (done) {
    request(app)
      .get('/non-existent')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, done)
  })
})
