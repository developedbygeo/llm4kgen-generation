import { readFile } from 'fs/promises';
import { resolve } from 'path';

export const extractQueriesFromCypherFile = async (
    cypherFile: string
): Promise<string[]> => {
    try {
        // Read the Cypher file content
        const fileContent = await readFile(resolve(cypherFile), 'utf-8');

        // Split the file content into queries using new lines
        const queries = fileContent
            .split(/\r?\n/)
            .map((query) => query.trim())
            .filter((query) => query.length > 0);

        console.log(`Extracted ${queries.length} queries from ${cypherFile}`);
        return queries;
    } catch (error) {
        console.error('Error extracting Cypher queries:', error);
        throw new Error('Failed to extract Cypher queries');
    }
};
