import fs = require('fs');
import fse = require('fs-extra');
import pug = require('pug');
import path from "path";

type Metadata = { [key: string]: any };
type Variables = Record<string, any>
type FunctionToMetadata = [Function, Metadata];

type HtmlToTemplate = Record<string, Metadata>;
type HtmlToCompiledTemplate = Record<string, FunctionToMetadata>;

const outputFolder = '../gordon1992.github.io/';
const resourcesFolder = './resources/';
const viewsFolder = './views/';
const options = {
    pretty: true
};

const projects: { [key: string]: any } = require("./projects.json");

const variables: Variables = {
    "$PROJECTS": projects
}

function ensureDirectoryExistence(filePath: string) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return;
    }
    fs.mkdirSync(dirname, {recursive: true});
}

const pages: HtmlToTemplate = require("./pages.json");
Object.entries(pages).forEach(([_filename, metadata]) => {
    Object.entries(metadata).forEach(([variable, potentialSubstitution]) => {
        if (potentialSubstitution.startsWith("$")) {
            metadata[variable] = variables[potentialSubstitution];
        } else if (variable == 'projectName') {
            metadata['project'] = projects[potentialSubstitution]
        }
    });
});

let compiledViews: HtmlToCompiledTemplate = {};
Object.entries(pages).forEach(([filename, metadata]) => {
    compiledViews[filename] = [pug.compileFile(viewsFolder + metadata['template'], options), metadata];
});

console.log("Clearing out " + outputFolder + " in preparation for website generation");
//fse.emptyDirSync(outputFolder);
console.log(outputFolder + " cleared out.");

Object.entries(compiledViews).forEach(([filename, functionAndMetadata]) => {
    let outputFile = outputFolder + filename;
    console.log("Going to generate " + outputFile);
    console.log(functionAndMetadata[1]);
    let generatedHtml = functionAndMetadata[0](functionAndMetadata[1]);
    ensureDirectoryExistence(outputFile);
    fs.writeFileSync(outputFile, generatedHtml);
    console.log("Generated " + outputFile);
});

console.log("Going to copy resources from " + resourcesFolder + " to " + outputFolder);
fse.copySync(resourcesFolder, outputFolder);
console.log("Copied resources from " + resourcesFolder + " to " + outputFolder);
