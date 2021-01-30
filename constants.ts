import {HtmlOutputPathToTemplateMetadata} from "./custom_types";

export const OUTPUT_FOLDER = '../gordon1992.github.io/';
export const RESOURCES_FOLDER = './resources/';
export const VIEWS_FOLDER = './views/';
export const PUG_OPTIONS = {
    pretty: true
};
export const BASE_PAGES: HtmlOutputPathToTemplateMetadata = require("./pages/base.json");
export const INTERESTS_PAGES: HtmlOutputPathToTemplateMetadata = require("./pages/interests.json");
export const PROJECTS_PAGES: HtmlOutputPathToTemplateMetadata = require("./pages/projects.json");
