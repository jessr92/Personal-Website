import fs = require('fs');
import fse = require('fs-extra');
import pug = require('pug');
import path = require('path');
import {HtmlToCompiledTemplate} from "./custom_types";
import {
    KNOWN_SUBSTITUTE_VARIABLES,
    OUTPUT_FOLDER,
    PAGE_DESCRIPTIONS,
    PROJECTS_DESCRIPTIONS,
    PUG_OPTIONS,
    RESOURCES_FOLDER,
    VIEWS_FOLDER
} from "./constants";

function readInPageDescriptions(): void {
    Object.entries(PAGE_DESCRIPTIONS).forEach(([_filename, metadata]) => {
        Object.entries(metadata).forEach(([variable, potentialSubstitution]) => {
            if (potentialSubstitution.startsWith("$")) {
                metadata[variable] = KNOWN_SUBSTITUTE_VARIABLES[potentialSubstitution];
            } else if (variable == 'projectName') {
                metadata['project'] = PROJECTS_DESCRIPTIONS[potentialSubstitution]
            }
        });
    });
}

function compileTemplates(): HtmlToCompiledTemplate {
    let compiledViews: HtmlToCompiledTemplate = {};
    Object.entries(PAGE_DESCRIPTIONS).forEach(([filename, metadata]) => {
        compiledViews[filename] = [pug.compileFile(VIEWS_FOLDER + metadata['template'], PUG_OPTIONS), metadata];
    });
    return compiledViews;
}

function generateHtmlPages(): void {
    let compiledViews = compileTemplates();
    Object.entries(compiledViews).forEach(([filename, functionAndMetadata]) => {
        let outputFile = OUTPUT_FOLDER + filename;
        console.log("Going to generate " + outputFile);
        let compiledFunction = functionAndMetadata[0];
        let metadata = functionAndMetadata[1];
        let generatedHtml = compiledFunction(metadata);
        ensureDirectoryExistence(outputFile);
        fs.writeFileSync(outputFile, generatedHtml);
    });
}

function copyStaticResources(): void {
    console.log("Going to copy resources from " + RESOURCES_FOLDER + " to " + OUTPUT_FOLDER);
    fse.copySync(RESOURCES_FOLDER, OUTPUT_FOLDER);
}

function ensureDirectoryExistence(filePath: string): void {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return;
    }
    fs.mkdirSync(dirname, {recursive: true});
}

function main(): void {
    readInPageDescriptions();
    generateHtmlPages();
    copyStaticResources();
}

main();
