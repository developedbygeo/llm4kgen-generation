import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { llm } from '../llm';
import {
    convertStringFromModelToJSONArray,
    extractEntityFromFileName,
    sanitizeBackticksFromString,
} from '../../utils/string';
import { generateOntologyVectorStore } from '../../rag';

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
            const cleanedQueries =
                convertStringFromModelToJSONArray(cleanedResponse);
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
    You are an AI agent tasked with generating Cypher queries for a Neo4j database. The queries should handle both nodes and relationships based on the provided data.

    ### Requirements:
    1. **Node Creation:**
       - Create or match nodes for the "${entity}" entity using the \`MERGE\` clause.
       - Use the "${entity}" label for nodes.
       - Include properties from the input data (e.g., \`name\`, \`value\`).
       - Add \`created\` and \`updated\` timestamps to nodes.

    2. **Relationship Creation:**
       - Use the \`relationship\` field to define the type of relationship (e.g., HAS_CONSTITUENT_ID, HAS_NATIONALITY).
       - Use \`MERGE\` for relationships to ensure idempotency.
       - Include relationship properties like \`attribute\` and \`value\`.
       - Connect nodes based on the \`relationship\` and \`value\` fields.

    3. **Query Structure:**
       - Start with \`UNWIND $rows AS row\` for batch processing.
       - Use parameterized properties (e.g., \`row.name\`, \`row.value\`).
       - Create nodes and relationships dynamically based on the data.
       - Ensure null values are handled gracefully.

    4. **Example Output Format:**
       For an entity like "ArtistMappings" with a relationship "HAS_CONSTITUENT_ID", the output should look like this:

       \`\`\`
       UNWIND $rows AS row
       MERGE (artist:Artist {name: row.name})
       ON CREATE SET artist.created = timestamp(), artist.updated = timestamp()
       ON MATCH SET artist.updated = timestamp()
       WITH row, artist
       WHERE row.relationship = 'HAS_CONSTITUENT_ID'
       MERGE (artist)-[r:HAS_CONSTITUENT_ID]->(v:ConstituentID {value: row.value})
       ON CREATE SET v.created = timestamp(), r.updated = timestamp()
       ON MATCH SET r.updated = timestamp()
       \`\`\`

    ### Input Data Format:
    - **Mapping File Content:**
      ${mappingContent}

    - **Relationships Data:**
      ${JSON.stringify(relationships, null, 2)}

    ### Output Requirements:
    1. Generate Cypher queries that:
       - Create or match nodes for ${entity}.
       - Create or match relationships using the \`relationship\` field.
       - Use parameterized properties like \`row.name\` and \`row.value\`.

    2. Return the queries as a JSON array of strings, with each query in a single line.

    3. Ensure the queries conform to Neo4j conventions and handle null values.
    `;
};

export const createCypherQueriesToolWithOntologyRag = new DynamicTool({
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

        const vectorStore = await generateOntologyVectorStore();
        const retrievedDocs = await vectorStore.similaritySearch(input, 2);
        const retrievedContext = retrievedDocs
            .map((doc) => doc.pageContent)
            .join('\n');
        // Step 2: Create the prompt to generate mappings based on entity data

        const prompt = constructCypherPromptWithOntologyRag({
            entity: entityToProcess,
            mappingContent,
            relationships,
            retrievedContext,
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
            const cleanedQueries =
                convertStringFromModelToJSONArray(cleanedResponse);
            return cleanedQueries;
        } catch (error) {
            console.error('Error parsing LLM response as JSON:', error);
            throw new Error('Failed to parse Cypher queries');
        }
    },
});

const constructCypherPromptWithOntologyRag = ({
    entity,
    mappingContent,
    relationships,
    retrievedContext,
}: {
    entity: string;
    mappingContent: string;
    relationships: string;
    retrievedContext: string;
}) => {
    return `
    You are an AI agent tasked with generating Cypher queries for a Neo4j database. The queries should handle both nodes and relationships based on the provided data.

    ### Requirements:
    1. **Node Creation:**
       - Create or match nodes for the "${entity}" entity using the \`MERGE\` clause.
       - Use the "${entity}" label for nodes.
       - Include properties from the input data (e.g., \`name\`, \`value\`).
       - Add \`created\` and \`updated\` timestamps to nodes.

    2. **Relationship Creation:**
       - Use the \`relationship\` field to define the type of relationship (e.g., HAS_CONSTITUENT_ID, HAS_NATIONALITY).
       - Use \`MERGE\` for relationships to ensure idempotency.
       - Include relationship properties like \`attribute\` and \`value\`.
       - Connect nodes based on the \`relationship\` and \`value\` fields.

    3. **Query Structure:**
       - Start with \`UNWIND $rows AS row\` for batch processing.
       - Use parameterized properties (e.g., \`row.name\`, \`row.value\`).
       - Create nodes and relationships dynamically based on the data.
       - Ensure null values are handled gracefully.

    4. **Example Output Format:**
       For an entity like "ArtistMappings" with a relationship "HAS_CONSTITUENT_ID", the output should look like this:

       \`\`\`
       UNWIND $rows AS row
       MERGE (artist:Artist {name: row.name})
       ON CREATE SET artist.created = timestamp(), artist.updated = timestamp()
       ON MATCH SET artist.updated = timestamp()
       WITH row, artist
       WHERE row.relationship = 'HAS_CONSTITUENT_ID'
       MERGE (artist)-[r:HAS_CONSTITUENT_ID]->(v:ConstituentID {value: row.value})
       ON CREATE SET v.created = timestamp(), r.updated = timestamp()
       ON MATCH SET r.updated = timestamp()
       \`\`\`

    ### Input Data Format:
    - **Mapping File Content:**
      ${mappingContent}

    - **Relationships Data:**
      ${JSON.stringify(relationships, null, 2)}

    - **Retrieved Context:**
        ${retrievedContext}

    ### Output Requirements:
    1. Generate Cypher queries that:
       - Create or match nodes for ${entity}.
       - Create or match relationships using the \`relationship\` field.
       - Use parameterized properties like \`row.name\` and \`row.value\`.

    2. Return the queries as a JSON array of strings, with each query in a single line.

    3. Ensure the queries conform to Neo4j conventions and handle null values.
    `;
};
