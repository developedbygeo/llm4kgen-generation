import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';

import { llm } from './llm';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createDbIndicesTool } from './tools/createDbIndices';
import { createCypherQueriesTool } from './tools/createCypherQueries';
import { createMappingTool } from './tools/createMappings';
import { identifyMappingPropertyForQueryTool } from './tools/identifyMappingPropertyForQuery';

const createAgentRunnable = async () => {
    const prompt = ChatPromptTemplate.fromMessages([
        [
            'system',
            'You are a specialized assistant for question (type). You have access to the following tools:  (tools). The tool names you can use are: (tool_names).',
        ],
        ['human', '{input}'],
        ['placeholder', '{agent_scratchpad}'],
    ]);

    return createToolCallingAgent({
        llm,
        tools: [
            createDbIndicesTool,
            createCypherQueriesTool,
            createMappingTool,
            identifyMappingPropertyForQueryTool,
        ],
        prompt,
    });
};

export const createAgent = async () => {
    const agentRunnable = await createAgentRunnable();

    return new AgentExecutor({
        agent: agentRunnable,
        tools: [
            createDbIndicesTool,
            createCypherQueriesTool,
            createMappingTool,
            identifyMappingPropertyForQueryTool,
        ],
        verbose: true,
        handleParsingErrors: true,
    });
};
