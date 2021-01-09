import fs = require('fs');
import fse = require('fs-extra');
import pug = require('pug');
import path = require('path');
import {HtmlOutputPathToCompiledTemplateWithMetadata} from "./custom_types";
import {
    OUTPUT_FOLDER,
    PAGE_DESCRIPTIONS,
    PUG_OPTIONS,
    RESOURCES_FOLDER,
    VIEWS_FOLDER
} from "./constants";

function compileTemplates(): HtmlOutputPathToCompiledTemplateWithMetadata {
    let compiledViews: HtmlOutputPathToCompiledTemplateWithMetadata = {};
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
        console.log(metadata);
        let generatedHtml = compiledFunction(metadata);
        ensureDirectoryExistence(outputFile);
        fs.writeFileSync(outputFile, generatedHtml);
    });
}

function generateErrorPages(): void {
    let fileFor404Page = OUTPUT_FOLDER + '404.html';
    let compiled404Function = pug.compileFile(VIEWS_FOLDER + '404.pug', PUG_OPTIONS);
    let generated404Html = compiled404Function();
    ensureDirectoryExistence(fileFor404Page);
    fs.writeFileSync(fileFor404Page, generated404Html);
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
    generateHtmlPages();
    generateErrorPages();
    copyStaticResources();
}

main();
