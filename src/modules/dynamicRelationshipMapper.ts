import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { logBigMessage } from '../utils/console';
import {
    createCypherQueriesTool,
    createCypherQueriesToolWithOntologyRag,
} from '../agent/tools/createCypherQueries';
import path from 'path';

export const dynamicRelationshipMapper = async (
    mappingDir: string,
    relationshipFile: string,
    outputDir: string,
    useOwlRag: boolean = false
) => {
    const files = await readdir(mappingDir);
    const relevantFiles = files.filter((file) => file.endsWith('.ts'));

    logBigMessage(
        `Found ${relevantFiles.length} mapping files in ${mappingDir}`
    );

    // Ensure the output directory exists
    await mkdir(outputDir, { recursive: true });

    const relationshipsContent = await readFile(relationshipFile, 'utf-8');
    const relationships = JSON.parse(relationshipsContent);

    for (const file of relevantFiles) {
        const filePath = `${mappingDir}/${file}`;

        const fileContent = await readFile(filePath, 'utf-8');

        logBigMessage(`Processing file: ${file}`);

        // Step 5: Call the createCypherQueriesTool with relationships and file content
        const input = JSON.stringify({
            mappingFile: file,
            mappingContent: fileContent,
            relationships,
        });

        let queries: string[] = [];

        if (useOwlRag) {
            queries =
                await createCypherQueriesToolWithOntologyRag.invoke(input);
        } else {
            queries = await createCypherQueriesTool.invoke(input);
        }

        console.log(queries);
        const outputFilePath = path.join(
            outputDir,
            `${file.replace('.ts', '.cypher')}`
        );
        await writeFile(outputFilePath, queries.join('\n\n'), 'utf-8');

        logBigMessage(`Generated queries for ${file}:\n${queries.join('\n')}`);
        logBigMessage(`Queries written to ${outputFilePath}`);
    }
};
