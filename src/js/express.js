/*jshint node: true, esversion: 6 */
"use strict";

const path = require("path");
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

const router = require("./routing");

const app = express();
app.use(helmet());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../../static")));
app.use(router);

module.exports = app;
