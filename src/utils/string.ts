export const sanitizeBackticksFromString = (input: string): string =>
    input.replace(/```json|\n```/g, '').trim();

export const sanitizePropertiesFromParentheses = (prop: string) =>
    prop.replace(/\s*\(.*\)\s*/, '');

export const extractEntityFromFileName = (fileName: string) =>
    fileName.split('ParameterMapping.ts')[0].toUpperCase();

export const sanitizeFileIdentifierFromString = (input: string): string =>
    input.startsWith('files:') ? input.replace(/^files:\s*/, '') : input;

export const convertStringFromModelToJSONArray = (input: string) => {
    // Step 5: Parse the JSON string
    const parsedString = JSON.parse(input);

    // Step 6: Clean up each query string

    const cleanedQueries = parsedString.map((query: string) =>
        query.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\"/g, '"')
    );
    console.log('Cleaned Cypher Queries:', cleanedQueries);

    return cleanedQueries;
};
