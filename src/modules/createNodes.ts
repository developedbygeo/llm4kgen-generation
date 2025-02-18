import path from 'path';
import {
    identifyRelationshipsTool,
    identifyRelationshipsToolWithOntologyRAG,
} from '../agent/tools/identifyRelationships';
import { FILE_PATHS } from '../enums/files';
import { logBigMessage } from '../utils/console';
import { writeToJsonFile } from '../utils/file';

export const createNodes = async (
    filesString: string,
    useOwlRag: boolean = false
) => {
    let relationships: any;

    if (useOwlRag) {
        relationships =
            await identifyRelationshipsToolWithOntologyRAG.invoke(filesString);
    } else {
        relationships = await identifyRelationshipsTool.invoke(filesString);
    }

    const pathToWrite = useOwlRag
        ? FILE_PATHS.OUTPUT_NODES_WITH_RAG
        : FILE_PATHS.OUTPUT_NODES;

    await writeToJsonFile(JSON.parse(relationships), path.resolve(pathToWrite));

    console.log(
        logBigMessage(
            `Relationships found: ${JSON.parse(relationships).length}`
        )
    );
};
