import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { llm } from '../llm'; // Import the LLM to interact with
import { sanitizeBackticksFromString } from '../../utils/string'; // For cleaning LLM responses
import { generateOntologyVectorStore } from '../../rag';

export const createMappingTool = new DynamicTool({
    name: TOOL_NAMES.CREATE_MAPPINGS,
    description: `
    Analyzes data and generates the correct mapping functions based on entity type and data. 
    The LLM is used to infer the correct parsing logic, and the mappings are generated dynamically 
    to process the data correctly (e.g., parsing strings, dates, and attributes).
  `,
    func: async (input: string) => {
        // Step 1: Parse the input data (JSON) to identify entities
        const parsedData = JSON.parse(input);

        // Step 2: Create the prompt to generate mappings based on entity data
        const prompt = constructMappingPrompt(parsedData);
        console.log('Generated prompt for LLM:', prompt);

        // Step 3: Invoke the LLM to generate the mapping
        const response = await llm.invoke(prompt);

        // Step 4: Clean the response (remove unnecessary backticks and formatting)
        const cleanedResponse = sanitizeBackticksFromString(
            response.content as string
        );
        console.log('Cleaned LLM response:', cleanedResponse);

        // Step 5: Return the mappings as a JSON object
        return JSON.parse(cleanedResponse);
    },
});

// Helper function to construct the prompt for the LLM
const constructMappingPrompt = (data: any) => {
    return `
You are an AI agent tasked with generating mappings in valid JSON format based on the provided data. Each mapping will describe the logic for parsing attributes in a tabular dataset.

Data to process:
${JSON.stringify(data, null, 2)}

For each entity:
- Include the following properties in the mappings:
  1. **name**: The display name of the attribute.
  2. **value**: The value of the attribute, represented as a placeholder string that references the row's attribute.
  3. **relationship**: The inferred relationship, specified explicitly (e.g., "HAS_NATIONALITY").
  4. **entity**: The name of the entity.

The output format should look like this:

{
  "ArtistMappings": {
    "nationality": {
      "name": "Nationality",
      "value": "row['Nationality']",
      "relationship": "HAS_NATIONALITY",
      "entity": "Artist"
    },
    "gender": {
      "name": "Gender",
      "value": "row['Gender']",
      "relationship": "HAS_GENDER",
      "entity": "Artist"
    }
  },
  "artworkMappings": {
    "Title": {
      "name": "Title",
      "value": "row['Title']",
      "relationship": "HAS_TITLE",
      "entity": "Artwork"
    }
  }
}

Rules:
- Ensure the output is valid JSON.
- Use placeholder strings like \`row['AttributeName']\` to represent values.
- Do not include JavaScript functions or non-JSON constructs.
- Ensure proper key formatting and capitalization.
`;
};

export const createMappingToolWithOntologyRAG = new DynamicTool({
    name: TOOL_NAMES.CREATE_MAPPINGS_WITH_ONTOLOGY,
    description: `
  Analyzes data and generates the correct mapping functions based on entity type and data. 
  The LLM is used to infer the correct parsing logic, and the mappings are generated dynamically 
  to process the data correctly (e.g., parsing strings, dates, and attributes).
`,
    func: async (input: string) => {
        // Step 1: Parse the input data (JSON) to identify entities
        const parsedData = JSON.parse(input);

        const vectorStore = await generateOntologyVectorStore();
        const retrievedDocs = await vectorStore.similaritySearch(input, 2);
        const retrievedContext = retrievedDocs
            .map((doc) => doc.pageContent)
            .join('\n');
        // Step 2: Create the prompt to generate mappings based on entity data
        const prompt = constructMappingPromptWithOntologyRAG(
            parsedData,
            retrievedContext
        );
        console.log('Generated prompt for LLM:', prompt);

        // Step 3: Invoke the LLM to generate the mapping
        const response = await llm.invoke(prompt);

        // Step 4: Clean the response (remove unnecessary backticks and formatting)
        const cleanedResponse = sanitizeBackticksFromString(
            response.content as string
        );
        console.log('Cleaned LLM response:', cleanedResponse);

        // Step 5: Return the mappings as a JSON object
        return JSON.parse(cleanedResponse);
    },
});

// Helper function to construct the prompt for the LLM
const constructMappingPromptWithOntologyRAG = (
    data: any,
    retrievedContext: string
) => {
    return `
You are an AI agent tasked with generating mappings in valid JSON format based on the provided data. Each mapping will describe the logic for parsing attributes in a tabular dataset.

${retrievedContext}

Data to process:
${JSON.stringify(data, null, 2)}

For each entity:
- Include the following properties in the mappings:
1. **name**: The display name of the attribute.
2. **value**: The value of the attribute, represented as a placeholder string that references the row's attribute.
3. **relationship**: The inferred relationship, specified explicitly (e.g., "HAS_NATIONALITY").
4. **entity**: The name of the entity.

The output format should look like this:

{
"ArtistMappings": {
  "nationality": {
    "name": "Nationality",
    "value": "row['Nationality']",
    "relationship": "HAS_NATIONALITY",
    "entity": "Artist"
  },
  "gender": {
    "name": "Gender",
    "value": "row['Gender']",
    "relationship": "HAS_GENDER",
    "entity": "Artist"
  }
},
"artworkMappings": {
  "Title": {
    "name": "Title",
    "value": "row['Title']",
    "relationship": "HAS_TITLE",
    "entity": "Artwork"
  }
}
}

Rules:
- Ensure the output is valid JSON.
- Use placeholder strings like \`row['AttributeName']\` to represent values.
- Do not include JavaScript functions or non-JSON constructs.
- Ensure proper key formatting and capitalization.
`;
};
