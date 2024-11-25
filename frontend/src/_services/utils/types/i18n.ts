export type LangType = "en" | "fr";

export type LangFileType = {
    default?: Record<string, string>;
} & Record<string, string>;

export type LangFilesType = Record<string, LangFileType>;
