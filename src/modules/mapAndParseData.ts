import path from 'path';
import { identifyRelationshipsTool } from '../agent/tools/identifyRelationships';
import { FILE_PATHS } from '../enums/files';
import { logBigMessage } from '../utils/console';
import { readFromJsonFile, writeToJsonFile } from '../utils/file';
import { createMappingTool } from '../agent/tools/createMappings';
import { writeMappingsToFiles } from '../lib/generateMappings';

export const mapAndParseData = async () => {
    const storedRelationships = await readFromJsonFile(FILE_PATHS.OUTPUT_NODES);
    const storedRelationshipsString = JSON.stringify(storedRelationships);

    const generatedMappings = await createMappingTool.invoke(
        storedRelationshipsString
    );

    console.log('Writing mappings');
    await writeMappingsToFiles(
        generatedMappings,
        FILE_PATHS.OUTPUT_ROOT_MAPPINGS
    );

    logBigMessage('Mappings generated');
};
