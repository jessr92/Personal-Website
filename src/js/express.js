/*jshint node: true*/
"use strict";

var path = require("path");
var express = require("express");
var logger = require("morgan");
var helmet = require("helmet");

var router = require("./routing");

var app = express();
app.use(helmet());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../../static")));
app.use(router);

module.exports = app;
