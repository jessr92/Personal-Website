/*jshint node: true*/
"use strict";

var path = require("path");
var pug = require("pug");
var fs = require("fs");

var templateDirectory = path.join(__dirname, "../templates/");
var htmlStore = {};
var defaultPugOptions = null;

var addErrorPages = function () {
    var errorNotFoundPage = pug.compileFile(path.join(templateDirectory, "404.pug"), defaultPugOptions);
    var internalServerErrorPage = pug.compileFile(path.join(templateDirectory, "500.pug"), defaultPugOptions);
    htmlStore["404_ERROR_PAGE"] = errorNotFoundPage();
    htmlStore["500_ERROR_PAGE"] = internalServerErrorPage();
};

/**
 * @property {array} projects.ids   Array of unique IDs that represent each coding project.
 */
var addProjectPages = function () {
    var projectPage = pug.compileFile(path.join(templateDirectory, "project.pug"), defaultPugOptions);
    var projectsPage = pug.compileFile(path.join(templateDirectory, "projects.pug"), defaultPugOptions);
    var projectsJSON = fs.readFileSync(path.join(__dirname, "../json/projects.json"));
    var projects = JSON.parse(projectsJSON);

    htmlStore["/projects"] = projectsPage({
        "projects": projects
    });
    projects.ids.forEach(function (id) {
        htmlStore["/projects/" + id] = projectPage({
            "project": projects.projects[id]
        });
    });
};

var addStaticPages = function () {
    var homepage = pug.compileFile(path.join(templateDirectory, "homepage.pug"), defaultPugOptions);
    htmlStore[""] = homepage();
};

var init = function () {
    addErrorPages();
    addProjectPages();
    addStaticPages();
};

var getHtmlStore = function () {
    init();

    return {
        get: function (pageId) {
            return htmlStore[pageId.replace(/\/$/, "")];
        },
        has: function (pageId) {
            return htmlStore[pageId.replace(/\/$/, "")] !== undefined;
        }
    };
};

/**
 * Module storing Pug-generated HTML
 * @module htmlStore
 * @type {{get, has}}
 */
module.exports = getHtmlStore();
