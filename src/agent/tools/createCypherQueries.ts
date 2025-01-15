import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { llm } from '../llm';
import {
    extractEntityFromFileName,
    sanitizeBackticksFromString,
} from '../../utils/string';

export const createCypherQueriesTool = new DynamicTool({
    name: TOOL_NAMES.CREATE_MAPPINGS,
    description: `
    Analyzes relationship data and generates Cypher queries for a Neo4j database.
    The LLM is used to generate queries dynamically based on the relationships between entities.
    Each query is designed to create or match nodes and relationships in the database, 
    reflecting the provided data.
    `,
    func: async (input: string) => {
        const { mappingFile, mappingContent, relationships } =
            JSON.parse(input);

        const entityToProcess = extractEntityFromFileName(mappingFile);
        console.log(entityToProcess);
        // // Step 2: Create the prompt for the LLM
        const prompt = constructCypherPrompt({
            entity: entityToProcess,
            mappingContent,
            relationships,
        });
        console.log('Generated prompt for LLM:', prompt);

        // // // Step 3: Invoke the LLM to generate Cypher queries
        const response = await llm.invoke(prompt);

        // Step 4: Clean the response
        const cleanedResponse = sanitizeBackticksFromString(
            response.content as string
        );
        console.log('Cleaned LLM response:', cleanedResponse);

        try {
            // Step 5: Parse the JSON string
            const rawQueries = JSON.parse(cleanedResponse);

            // Step 6: Clean up each query string
            const cleanedQueries = rawQueries.map((query: string) =>
                query
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t')
                    .replace(/\\\"/g, '"')
            );

            console.log('Cleaned Cypher Queries:', cleanedQueries);

            // Return cleaned queries as an iterable array
            return cleanedQueries;
        } catch (error) {
            console.error('Error parsing LLM response as JSON:', error);
            throw new Error('Failed to parse Cypher queries');
        }
    },
});

const constructCypherPrompt = ({
    entity,
    mappingContent,
    relationships,
}: {
    entity: string;
    mappingContent: string;
    relationships: string;
}) => {
    return `
    You are an AI agent tasked with generating Cypher queries for a Neo4j database.
    The queries should efficiently create or match nodes and relationships based on the provided data.

    ### Requirements:
    1. **Node Creation:**
       - Only process data for the "${entity}" entity. Do not generate queries for unrelated entities.
       -  Use the "${entity}" label for node creation or matching.
       - Use \`MERGE\` to ensure idempotent node creation.
       - Include node properties from the input data (e.g., name, entity, attributes).
       - Add \`created\` and \`updated\` timestamps for nodes.

    2. **Relationship Creation:**
       - Use the "relationship" field to define relationship types (e.g., HAS_NATIONALITY, HAS_ARTIST).
       - Use \`MERGE\` to ensure idempotent relationship creation.
       - Include relationship properties from the input data (e.g., attribute, value).
       - Ensure relationships connect the correct nodes based on \`entity\` and \`name\`.

    3. **Batch Processing:**
       - Use \`UNWIND\` to process input data in batches.
       - Parameterize all queries using \`$rows\` for efficient execution.

    4. **Label and Property Normalization:**
       - Normalize labels and properties to remove spaces and special characters (e.g., \`Height (cm)\` → \`HeightCm\`).
       - Ensure all labels and property names conform to Neo4j naming conventions.

    ### Input Data Format:
    - **Mapping File Content:**
      Specifies how CSV columns map to Cypher properties or node types.

      Example:
      ${mappingContent}

    - **Relationships Data:**
      Specifies relationships between entities.

      Example:
      ${JSON.stringify(relationships, null, 2)}

    ### Output Requirements:
    1. Generate Cypher queries that:
       - Create or match nodes only for ${entity}.
       - Create or match relationships between nodes using the "relationship" field.
       - Include "attribute" and "value" fields as properties of nodes or relationships.
       - Handle null values correctly.

    2. Format each query as follows:
       - Start with: \`UNWIND $rows AS row\`.
       - Use explicit labels for nodes (e.g., Artist, Artwork).
       - Use explicit types for relationships (e.g., HAS_NATIONALITY, CREATED_BY).
       - Parameterize properties using \`row\` (e.g., \`row.name\`, \`row.value\`).

    3. Return the Cypher queries as a JSON array of strings. Each query should be a separate string in the array in one line, without any line breaks.
    `;
};
