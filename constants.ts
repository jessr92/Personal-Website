import {HtmlToTemplate, Variables} from "./custom_types";

export const OUTPUT_FOLDER = '../gordon1992.github.io/';
export const RESOURCES_FOLDER = './resources/';
export const VIEWS_FOLDER = './views/';
export const PUG_OPTIONS = {
    pretty: true
};
export const PAGE_DESCRIPTIONS: HtmlToTemplate = require("./pages.json");
export const PROJECTS_DESCRIPTIONS: { [key: string]: any } = require("./projects.json");
export const KNOWN_SUBSTITUTE_VARIABLES: Variables = {
    "$PROJECTS": PROJECTS_DESCRIPTIONS
}
