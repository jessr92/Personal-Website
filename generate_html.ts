import fse = require('fs-extra');
import pug = require('pug');
import path = require('path');
import pretty = require('pretty');
import {HtmlOutputPathToCompiledTemplateWithMetadata, HtmlOutputPathToTemplateMetadata} from "./custom_types";
import {
    OUTPUT_FOLDER,
    PAGES_FOLDER,
    PUG_OPTIONS,
    RESOURCES_FOLDER,
    VIEWS_FOLDER,
} from "./constants";

function compileTemplates(): HtmlOutputPathToCompiledTemplateWithMetadata {
    const compiledViews: HtmlOutputPathToCompiledTemplateWithMetadata = {};
    const pages = fse.readdirSync(PAGES_FOLDER);
    pages.forEach(page => {
        console.log("Found page file: " + page);
        const pageContent: HtmlOutputPathToTemplateMetadata = require(PAGES_FOLDER + page);
        Object.entries(pageContent).forEach(([filename, metadata]) => {
            compiledViews[filename] = [pug.compileFile(VIEWS_FOLDER + metadata['template'], PUG_OPTIONS), metadata];
        });
    });
    return compiledViews;
}

function cleanOutputFolder(): void {
    fse.readdirSync(OUTPUT_FOLDER)
        .filter(fileOrFolder => !fileOrFolder.startsWith("."))
        .forEach(fileOrFolder => fse.removeSync(OUTPUT_FOLDER + fileOrFolder));
}

function generateHtmlPages(): void {
    const compiledViews = compileTemplates();
    Object.entries(compiledViews).forEach(([filename, functionAndMetadata]) => {
        const outputFile = OUTPUT_FOLDER + filename;
        console.log("Going to generate " + outputFile);
        const compiledFunction = functionAndMetadata[0];
        const metadata = functionAndMetadata[1];
        console.log(metadata);
        const generatedHtml = pretty(compiledFunction(metadata), {ocd: true});
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
    cleanOutputFolder();
    generateHtmlPages();
    copyStaticResources();
}

main();
