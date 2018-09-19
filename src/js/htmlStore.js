/*jshint node: true, esversion: 6 */
"use strict";

const path = require("path");
const pug = require("pug");
const fs = require("fs");

const templateDirectory = path.join(__dirname, "../templates/");
const htmlStore = {};
const defaultPugOptions = null;

const addErrorPages = function () {
    const errorNotFoundPage = pug.compileFile(path.join(templateDirectory, "404.pug"), defaultPugOptions);
    const internalServerErrorPage = pug.compileFile(path.join(templateDirectory, "500.pug"), defaultPugOptions);
    htmlStore["404_ERROR_PAGE"] = errorNotFoundPage();
    htmlStore["500_ERROR_PAGE"] = internalServerErrorPage();
};

/**
 * @property {array} projects.ids   Array of unique IDs that represent each coding project.
 */
const addProjectPages = function () {
    const projectPage = pug.compileFile(path.join(templateDirectory, "project.pug"), defaultPugOptions);
    const projectsPage = pug.compileFile(path.join(templateDirectory, "projects.pug"), defaultPugOptions);
    const projectsJSON = fs.readFileSync(path.join(__dirname, "../json/projects.json"));
    const projects = JSON.parse(projectsJSON);

    htmlStore["/projects"] = projectsPage({
        "projects": projects
    });
    projects.ids.forEach(function (id) {
        htmlStore["/projects/" + id] = projectPage({
            "project": projects.projects[id]
        });
    });
};

const addStaticPages = function () {
    const homepage = pug.compileFile(path.join(templateDirectory, "homepage.pug"), defaultPugOptions);
    htmlStore[""] = homepage();
};

const init = function () {
    addErrorPages();
    addProjectPages();
    addStaticPages();
};

const getHtmlStore = function () {
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
 *
 * @type {{get, has}}
 */
module.exports = getHtmlStore();
