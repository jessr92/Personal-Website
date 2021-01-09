type HtmlOutputPath = string;
type Metadata = { [key: string]: any };
type CompiledTemplateWithMetadata = [Function, Metadata];
export type HtmlOutputPathToTemplateMetadata = Record<HtmlOutputPath, Metadata>;
export type HtmlOutputPathToCompiledTemplateWithMetadata = Record<HtmlOutputPath, CompiledTemplateWithMetadata>;
