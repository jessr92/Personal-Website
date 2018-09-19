/*jshint node: true, esversion: 6 */
"use strict";

const express = require("express");
const router = new express.Router({});

const htmlStore = require("./htmlStore");

const handleRequest = function (url, res, next) {
    try {
        if (htmlStore.has(url)) {
            res.send(htmlStore.get(url));
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
};

router.get("/", function (req, res, next) {
    handleRequest(req.url, res, next);
});

router.get("/projects", function (req, res, next) {
    handleRequest(req.url, res, next);
});

router.get("/projects/:project", function (req, res, next) {
    handleRequest(req.url, res, next);
});

router.use(function (ignore, res, next) {
    handleRequest("404_ERROR_PAGE", res.status(404), next);
});

router.use(function (err, ignore, res, next) {
    console.error(err.stack);
    handleRequest("500_ERROR_PAGE", res.status(500), next);
});

module.exports = router;
