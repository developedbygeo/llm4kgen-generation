import path from 'path';
import { identifyRelationshipsTool } from '../agent/tools/identifyRelationships';
import { FILE_PATHS } from '../enums/files';
import { logBigMessage } from '../utils/console';
import { writeToJsonFile } from '../utils/file';

export const createNodes = async (filesString: string) => {
    const relationships = await identifyRelationshipsTool.invoke(filesString);

    await writeToJsonFile(
        JSON.parse(relationships),
        path.resolve(FILE_PATHS.OUTPUT_NODES)
    );

    console.log(
        logBigMessage(
            `Relationships found: ${JSON.parse(relationships).length}`
        )
    );
};
