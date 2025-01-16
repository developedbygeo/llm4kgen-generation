import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { processCsvLines } from '../../lib/identifyRelationships';
import { llm } from '../llm';
import { sanitizeBackticksFromString } from '../../utils/string';
import { ProcessedFile } from '../../types/identifyRelationships';

export const createDbIndicesTool = new DynamicTool({
    name: TOOL_NAMES.CREATE_DB_INDICES,
    description: `Creates indices for the database based on the relationships identified between entities in the data.`,
    func: async (input: string) => {
        const processedInput = JSON.parse(input).map((result: string) =>
            processCsvLines(result)
        );

        const prompt = constructPromptFoDbIndices(processedInput);

        const response = await llm.invoke(prompt);
        return sanitizeBackticksFromString(
            response.content as unknown as string
        );
    },
});

const constructPromptFoDbIndices = (processedFiles: ProcessedFile[]) => {
    const promptBody = processedFiles
        .map((file) => {
            const { fileIdentifier, headers, data } = file;

            return `
    For the "${fileIdentifier}" file:
      - The data contains the following properties:
      ${headers.map((header) => `    - ${header}`).join('\n')}
    
    Please write one-line Cypher queries to create indices for the database based on the relationships identified between entities in the data.
    `;
        })
        .join('\n');

    return `
    You are a database expert. Your task is to create indices for the database based on the relationships identified between entities in the data. Each file has distinct entities, such as "artists" and "artworks," and relationships between their properties.
    
    ${promptBody}
    
    Based on the above data, please identify all relationships and return them in the following JSON format:
    [
      {
        "entity": (type of entity) First letter should be capitalized, 
        "query": (the generated Cypher query to create the index), 
      }
      // Add more indices here as identified.
    ]
    Return only valid JSON in the response.
    `;
};
