import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import { llm } from '../llm'; // Import the LLM to interact with
import { sanitizeBackticksFromString } from '../../utils/string'; // For cleaning LLM responses

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
    You are an AI agent tasked with generating data mappings. Based on the provided data, 
    you need to infer types for each attribute and create appropriate parsing functions. 
    Missing or null data should be handled with type inference.

    Data to process:
    ${JSON.stringify(data, null, 2)}

    For each entity:
    - Generate a function that handles parsing core properties (e.g., strings, numbers, dates, booleans).
    - If a property is null or missing, infer the appropriate type based on the attribute's name (e.g., parse ConstituentID as a string if null).
    - Return the mappings in the following format:
    {
      "entity": "EntityType",
      "coreProperties": "(function body for core properties)",
      "attributeName": "(function body for the attribute)"
    }

    Provide only the mappings in the above format, without additional text or context.  `;
};
