import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { processCsvLines } from '../../lib/identifyRelationships';
import { llm } from '../llm';
import { sanitizeBackticksFromString } from '../../utils/string';
import { ProcessedFile } from '../../types/identifyRelationships';
import { generateOntologyVectorStore } from '../../rag';

export const identifyRelationshipsTool = new DynamicTool({
    name: TOOL_NAMES.IDENTIFY_RELATIONSHIPS,
    description: `
        Analyzes data from multiple CSV files with distinct contexts, identifies relationships between the entities, and extracts insights by connecting relevant properties and values. Each file is processed with its context (indicated by its identifier), enabling the identification of relationships.
    `,
    func: async (input: string) => {
        const processedInput = JSON.parse(input).map((result: string) =>
            processCsvLines(result)
        );

        const prompt =
            constructPromptForRelationshipIdentification(processedInput);
        console.log(prompt);

        const response = await llm.invoke(prompt);
        return sanitizeBackticksFromString(
            response.content as unknown as string
        );
    },
});

const constructPromptForRelationshipIdentification = (
    processedFiles: ProcessedFile[]
) => {
    const promptBody = processedFiles
        .map((file) => {
            const { fileIdentifier, headers, data } = file;

            return `
    For the "${fileIdentifier}" file:
      - The data contains the following properties:
      ${headers.map((header) => `    - ${header}`).join('\n')}
    
    Please identify all relationships between entities in the data. 
    - The "name" of each entity is the value from the first column (e.g., DisplayName for artists, Title for artworks).
    - The "value" should correspond to the corresponding value in the data for the given attribute (e.g., Seat Height, Duration, Nationality).

    Return the relationships in the following JSON format:
    {
      "entity": (type of entity), 
      "name": (name of entity from first column), 
      "relationship": (relationship type based on entity and attribute),
      "attribute": (attribute name),
      "value": (attribute value)
    }
    The relationships should be returned as a JSON array, one object per relationship.
    `;
        })
        .join('\n');

    return `
    You are a knowledge extraction agent. Your task is to identify relationships between data from multiple CSV files. Each file has distinct entities, such as "artists" and "artworks," and relationships between their properties.
    
    ${promptBody}
    
    Based on the above data, please identify all relationships and return them in the following JSON format:
    [
      {
        "entity": (type of entity) First letter should be capitalized, 
        "name": (name of entity from the first column), 
        "relationship": (relationship type based on entity and attribute)  Should be uppercase and snake_case,
        "attribute": (attribute name),
        "value": (attribute value)
      }
      // Add more relationships here as identified.
    ]
    Return only valid JSON in the response.
    `;
};

export const identifyRelationshipsToolWithOntologyRAG = new DynamicTool({
    name: TOOL_NAMES.IDENTIFY_RELATIONSHIPS_WITH_ONTOLOGY,
    description: `
        Analyzes data from multiple CSV files with distinct contexts, identifies relationships between the entities, and extracts insights by connecting relevant properties and values. Each file is processed with its context (indicated by its identifier), enabling the identification of relationships.
    `,
    func: async (input: string) => {
        const processedInput = JSON.parse(input).map((result: string) =>
            processCsvLines(result)
        );

        const vectorStore = await generateOntologyVectorStore();
        const retrievedDocs = await vectorStore.similaritySearch(input, 2);
        const retrievedContext = retrievedDocs
            .map((doc) => doc.pageContent)
            .join('\n');

        const prompt =
            constructPromptForRelationshipIdentificationWithOntologyRAG(
                processedInput,
                retrievedContext
            );

        console.log(prompt);
        const response = await llm.invoke(prompt);
        return sanitizeBackticksFromString(
            response.content as unknown as string
        );
    },
});

const constructPromptForRelationshipIdentificationWithOntologyRAG = (
    processedFiles: ProcessedFile[],
    retrievedContext: string
) => {
    const promptBody = processedFiles
        .map((file) => {
            const { fileIdentifier, headers, data } = file;

            return `
    For the "${fileIdentifier}" file:
      - The data contains the following properties:
      ${headers.map((header) => `    - ${header}`).join('\n')}
    
    Please identify all relationships between entities in the data. 
    - The "name" of each entity is the value from the first column (e.g., DisplayName for artists, Title for artworks).
    - The "value" should correspond to the corresponding value in the data for the given attribute (e.g., Seat Height, Duration, Nationality).

    Return the relationships in the following JSON format:
    {
      "entity": (type of entity), 
      "name": (name of entity from first column), 
      "relationship": (relationship type based on entity and attribute),
      "attribute": (attribute name),
      "value": (attribute value)
    }
    The relationships should be returned as a JSON array, one object per relationship.
    `;
        })
        .join('\n');

    return `
    You are a knowledge extraction agent. Your task is to identify relationships between data from multiple CSV files. Each file has distinct entities, such as "artists" and "artworks," and relationships between their properties.
    
    ${retrievedContext}
    
    ${promptBody}
    
    Based on the above data, please identify all relationships and return them in the following JSON format:
    [
      {
        "entity": (type of entity) First letter should be capitalized, 
        "name": (name of entity from the first column), 
        "relationship": (relationship type based on entity and attribute)  Should be uppercase and snake_case,
        "attribute": (attribute name),
        "value": (attribute value)
      }
      // Add more relationships here as identified.
    ]

    
       Provide only the JSON response in the specified format, without additional text or context.`;
};
