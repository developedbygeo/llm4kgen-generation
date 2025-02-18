import { mkdir, writeFile } from 'fs/promises';
import { createEntityRelationshipsTool } from '../agent/tools/createEntityRelationships';
import { QueriesFromLLM } from '../types/queries';
import { FILE_PATHS } from '../enums/files';

type createRelationshipCyphersForEntitiesProps = {
    outputDir: string;
};

export const createRelationshipCyphersForEntities = async ({
    outputDir,
}: createRelationshipCyphersForEntitiesProps) => {
    const generatedQueries: Awaited<QueriesFromLLM> =
        await createEntityRelationshipsTool.invoke('');

    console.log(`The LLM generated: ${generatedQueries.length} queries`);

    await mkdir(outputDir, { recursive: true });

    await writeFile(
        `${outputDir}/${FILE_PATHS.OUTPUT_ENTITY_RELATIONSHIP_FILE}`,
        generatedQueries.join('\n'),
        'utf-8'
    );

    console.log(generatedQueries);
};
