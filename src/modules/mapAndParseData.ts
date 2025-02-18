import path from 'path';
import { identifyRelationshipsTool } from '../agent/tools/identifyRelationships';
import { FILE_PATHS } from '../enums/files';
import { logBigMessage } from '../utils/console';
import { readFromJsonFile, writeToJsonFile } from '../utils/file';
import {
    createMappingTool,
    createMappingToolWithOntologyRAG,
} from '../agent/tools/createMappings';
import { writeMappingsToFiles } from '../lib/generateMappings';

export const mapAndParseData = async (useOwlRag: boolean = false) => {
    const storedRelationshipsToUse = useOwlRag
        ? FILE_PATHS.OUTPUT_NODES_WITH_RAG
        : FILE_PATHS.OUTPUT_NODES;

    const outputPathToUse = useOwlRag
        ? FILE_PATHS.OUTPUT_ROOT_MAPPINGS_WITH_RAG
        : FILE_PATHS.OUTPUT_ROOT_MAPPINGS;

    const storedRelationships = await readFromJsonFile(
        storedRelationshipsToUse
    );
    const storedRelationshipsString = JSON.stringify(storedRelationships);

    let generatedMappings: any;

    if (useOwlRag) {
        generatedMappings = await createMappingToolWithOntologyRAG.invoke(
            storedRelationshipsString
        );
    } else {
        generatedMappings = await createMappingTool.invoke(
            storedRelationshipsString
        );
    }

    console.log('Writing mappings');
    await writeMappingsToFiles(generatedMappings, outputPathToUse);

    logBigMessage('Mappings generated');
};
