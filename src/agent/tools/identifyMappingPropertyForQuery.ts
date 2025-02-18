import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { llm } from '../llm';
import { sanitizeBackticksFromString } from '../../utils/string';

export const identifyMappingPropertyForQueryTool = new DynamicTool({
    name: TOOL_NAMES.IDENTIFY_MAPPING_FOR_QUERY,
    description: `
    Analyze a Cypher query and returns the appropriate mapping property based on relationships.`,
    func: async (input: string) => {
        try {
            // Step 1: Parse the input Cypher query
            const { query, mappings, ingestionCode } = JSON.parse(input);

            // Step 2: Create the prompt to analyze queries and determine mappings
            const prompt = constructMappingPrompt({
                query,
                mappings,
                ingestionCode,
            });
            // console.log('Generated prompt for LLM:', prompt);

            // Step 3: Invoke the LLM to analyze the queries and generate mappings
            const response = await llm.invoke(prompt);

            // Step 4: Clean the response (remove unnecessary backticks and formatting)
            const cleanedResponse = sanitizeBackticksFromString(
                response.content as string
            );
            // console.log('Cleaned LLM response:', cleanedResponse);

            // Step 5: Return the mappings as a JSON object
            return JSON.parse(cleanedResponse);
        } catch (error) {
            console.error('Error processing Cypher queries:', error);
            throw new Error('Failed to generate mapping properties.');
        }
    },
});

const constructMappingPrompt = ({
    query,
    mappings,
    ingestionCode,
}: {
    query: string;
    mappings: string;
    ingestionCode: string;
}) => {
    return `
    You are an AI agent tasked with analyzing Cypher queries and determining the correct mapping property from a predefined set.
    Each query contains a relationship, such as 'HAS_CONSTITUENT_ID' or 'HAS_ARTIST_BIO'. Based on the relationship, infer the mapping property.

    Provided mapping:
    ${mappings}

    Provided Cypher Query:
    ${query}

    Ingestion code:
    ${ingestionCode}

    Consider the ingestion code and adjust the query and return the mapping property in this format:
    {
      "query": "(original query string)",
      "property": [(property name in mapping)]
    }

    Provide only the JSON response in the specified format, without additional text or context.`;
};
