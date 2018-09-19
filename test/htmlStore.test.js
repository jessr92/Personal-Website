/* eslint-env mocha */
/*jshint node: true, mocha: true, esversion: 6 */
"use strict";

const assert = require("assert");
const path = require("path");
const fs = require("fs");
const htmlStore = require("../src/js/htmlStore");

describe("HTML Store", function () {
    describe("get", function () {
        it("should return HTML for homepage", function () {
            const html = htmlStore.get("/");
            assert(html.length > 0);
        });
        it("should return HTML for projects page", function () {
            const html = htmlStore.get("/projects");
            assert(html.length > 0);
        });
        it("should return HTML for each project", function () {
            const projects = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/json/projects.json")));
            projects.ids.forEach(function (id) {
                const html = htmlStore.get("/projects/" + id);
                assert(html.length > 0);
            });
        });
        it("should not return HTML for a non-existent page", function () {
            const html = htmlStore.get("/non-existent");
            assert(html === undefined);
        });
    });
});
