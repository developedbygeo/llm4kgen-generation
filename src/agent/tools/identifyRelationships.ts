import { DynamicTool } from '@langchain/core/tools';
import { TOOL_NAMES } from '../../enums/tools';
import {
    constructPromptForRelationshipIdentification,
    processCsvLines,
} from '../../lib/identifyRelationships';
import { llm } from '../llm';
import { sanitizeBackticksFromString } from '../../utils/string';

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
