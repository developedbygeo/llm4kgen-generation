export const sanitizeBackticksFromString = (input: string): string =>
    input.replace(/```json|\n```/g, '').trim();

export const sanitizePropertiesFromParentheses = (prop: string) =>
    prop.replace(/\s*\(.*\)\s*/, '');

export const extractEntityFromFileName = (fileName: string) =>
    fileName.split('ParameterMapping.ts')[0].toUpperCase();

export const sanitizeFileIdentifierFromString = (input: string): string =>
    input.startsWith('files:') ? input.replace(/^files:\s*/, '') : input;
