import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { llm } from '../llm'; // Import the LLM to interact with
import {
    convertStringFromModelToJSONArray,
    sanitizeBackticksFromString,
} from '../../utils/string'; // For cleaning LLM responses
import { fetchGraphMetadata } from '../../modules/fetchGraphMetadata';

export const createEntityRelationshipsTool = new DynamicTool({
    name: TOOL_NAMES.CREATE_RELATIONSHIPS_BETWEEN_ENTITIES,
    description: `
Analyzes data and generates cypher queries that create relationship between entities. In this case, your goal is to identify and create cypher queries for Artists and Artworks based on the provided data. The queries should create relationships between the two entities based on the data provided. At least one query should indicate which Artist created which Artwork.`,
    func: async () => {
        const metadata = await fetchGraphMetadata();

        const prompt = `
      The graph schema includes the following information:
      - Node labels: ${metadata.labels.join(', ')}
      - Relationship types: ${metadata.relationships.join(', ')}
      - Property keys: ${metadata.properties.join(', ')}

      **Query Structure:**
       - Start with \`UNWIND $rows AS row\` for batch processing.
       - Use parameterized properties (e.g., \`row.name\`, \`row.value\`).
       - Use MERGE instead of CREATE to avoid duplicates.
       - Create relationships dynamically based on the data.


       ## Output Requirements:
        1. Return the queries as a JSON array of strings, with each query in a single line.
        2. Ensure the queries conform to Neo4j conventions and handle null values.
        3. When you finish with the Artist queries, leave the next two lines blank.
    `;

        const response = await llm.invoke(prompt);

        const cleanedResponse = sanitizeBackticksFromString(
            response.content as string
        );
        console.log('Cleaned LLM response:', cleanedResponse);

        try {
            const cleanedQueries =
                convertStringFromModelToJSONArray(cleanedResponse);
            return cleanedQueries;
        } catch (error) {
            console.error('Error parsing LLM response as JSON:', error);
            throw new Error('Failed to parse Cypher queries');
        }
    },
});
