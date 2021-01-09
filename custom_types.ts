export type Variables = Record<string, any>
type Metadata = { [key: string]: any };
type FunctionToMetadata = [Function, Metadata];
export type HtmlToTemplate = Record<string, Metadata>;
export type HtmlToCompiledTemplate = Record<string, FunctionToMetadata>;