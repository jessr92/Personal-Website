import fse = require('fs-extra');
import pug = require('pug');
import path = require('path');
import {HtmlOutputPathToCompiledTemplateWithMetadata} from "./custom_types";
import {
    BASE_PAGES,
    INTERESTS_PAGES,
    OUTPUT_FOLDER,
    PROJECTS_PAGES,
    PUG_OPTIONS,
    RESOURCES_FOLDER,
    VIEWS_FOLDER
} from "./constants";

function compileTemplates(): HtmlOutputPathToCompiledTemplateWithMetadata {
    let compiledViews: HtmlOutputPathToCompiledTemplateWithMetadata = {};
    Object.entries(BASE_PAGES).forEach(([filename, metadata]) => {
        compiledViews[filename] = [pug.compileFile(VIEWS_FOLDER + metadata['template'], PUG_OPTIONS), metadata];
    });
    Object.entries(INTERESTS_PAGES).forEach(([filename, metadata]) => {
        compiledViews[filename] = [pug.compileFile(VIEWS_FOLDER + metadata['template'], PUG_OPTIONS), metadata];
    });
    Object.entries(PROJECTS_PAGES).forEach(([filename, metadata]) => {
        compiledViews[filename] = [pug.compileFile(VIEWS_FOLDER + metadata['template'], PUG_OPTIONS), metadata];
    });
    return compiledViews;
}

function cleanDirectory(): void {
    fse.removeSync(OUTPUT_FOLDER + "css");
    fse.removeSync(OUTPUT_FOLDER + "images");
    fse.removeSync(OUTPUT_FOLDER + "interests");
    fse.removeSync(OUTPUT_FOLDER + "pdf");
    fse.removeSync(OUTPUT_FOLDER + "projects");
    fse.removeSync(OUTPUT_FOLDER + "404.html");
    fse.removeSync(OUTPUT_FOLDER + "CNAME");
    fse.removeSync(OUTPUT_FOLDER + "favicon.ico");
    fse.removeSync(OUTPUT_FOLDER + "index.html");
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
        fse.writeFileSync(outputFile, generatedHtml);
    });
}

function copyStaticResources(): void {
    console.log("Going to copy resources from " + RESOURCES_FOLDER + " to " + OUTPUT_FOLDER);
    fse.copySync(RESOURCES_FOLDER, OUTPUT_FOLDER);
}

function ensureDirectoryExistence(filePath: string): void {
    const dirname = path.dirname(filePath);
    if (fse.existsSync(dirname)) {
        return;
    }
    fse.mkdirSync(dirname, {recursive: true});
}

function main(): void {
    cleanDirectory();
    generateHtmlPages();
    copyStaticResources();
}

main();
