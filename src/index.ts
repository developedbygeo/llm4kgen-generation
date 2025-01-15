import { Neo4jConnection } from './db';
import { loadCsvAndIngestData } from './modules/loadAndIngestData';
// import { artistParameterMapping } from './mappings/artistParameter';
// import { artworkParameterMapping } from './mappings/artworkParameter';
import { relationshipParameterMapping } from './mappings/relationshipParameter';

import { createArtworkQuery } from './queries/createArtwork';
import { createArtistQuery } from './queries/createArtist';
import { artistNationalityQuery } from './queries/artistNationality';
import { artistReferenceQuery } from './queries/artistReference';
import { artworkClassificationQuery } from './queries/artworkClassification';
import { artworkDepartmentQuery } from './queries/artworkDepartment';
import { artworkMediumQuery } from './queries/artworkMedium';

import { artworkOnViewQuery } from './queries/artworkOnView';
import { createRelationshipQuery } from './queries/createRelationship';

import path from 'path';
import { artistGenderQuery } from './queries/artistGender';
import { artworkDimensionQuery } from './queries/artworkDimension';
import { setupDbIndices } from './modules/setupDbIndices';
import { logBigMessage } from './utils/console';
import {
    batchFilesToProcess,
    extractFirstTwoRows,
    processCsvLines,
} from './lib/identifyRelationships';
import { identifyRelationshipsTool } from './agent/tools/identifyRelationships';
import { FILE_PATHS } from './enums/files';
import { readFromFile, readFromJsonFile, writeToJsonFile } from './utils/file';
import { createMappingTool } from './agent/tools/createMappings';
import { writeMappingsToFiles } from './lib/generateMappings';
import { createCypherQueriesTool } from './agent/tools/createCypherQueries';
import { dynamicRelationshipMapper } from './modules/dynamicRelationshipMapper';
import { extractQueriesFromCypherFile } from './utils/queries';
import { identifyMappingPropertyForQueryTool } from './agent/tools/identifyMappingPropertyForQuery';
import { artistParameterMapping } from './llm-output-data/mappings/artistParameter';
import { artworkParameterMapping } from './llm-output-data/mappings/artworkParameter';
import { loadCsvAndIngestDataForTool } from './modules/loadAndIngestDataForTool';
import { ingestDataScript } from './scripts/ingestData';
import config from './config';
import { createDbIndicesTool } from './agent/tools/createDbIndices';
import { CreateDbIndexQueryItem } from './types/createDbIndices';

// BIG FILES
// const artistsCsvPath = path.join(__dirname, 'data', 'Artists.csv');
// const artworksCsvPath = path.join(__dirname, 'data', 'Artworks.csv');

// SAMPLE FILES
const artistsCsvPath = path.join(__dirname, 'data', 'new-small', 'Artists.csv');
const artworksCsvPath = path.join(
    __dirname,
    'data',
    'new-small',
    'Artworks.csv'
);
// const artworksCsvPath = path.join(
//     __dirname,
//     'data',
//     'new-small',
//     'Artworks.csv'
// );

const filesToProcess = [
    { path: artistsCsvPath, identifier: 'artists' },
    { path: artworksCsvPath, identifier: 'artworks' },
];

async function main() {
    const files = await batchFilesToProcess(filesToProcess);

    const uri = config.secrets.DB_URL as string;
    const user = config.secrets.DB_USER as string;
    const password = config.secrets.DB_PASSWORD as string;
    const conn = new Neo4jConnection(uri, user, password);
    logBigMessage('Connecting to Neo4j');

    /* MODULE 0 - CREATE DB INDICES */
    await setupDbIndices(conn, files);

    /* MODULE 1 - BATCH AND CREATE RELATIONSHIPS */

    // const results = await batchFilesToProcess(filesToProcess);
    // const relationships = await identifyRelationshipsTool.invoke(results);
    // console.log(logBigMessage('Writing relationships'));
    // console.log(relationships);
    // await writeToJsonFile(JSON.parse(relationships), FILE_PATHS.RELATIONSHIPS);
    // console.log(
    //     logBigMessage(
    //         `Relationships found: ${JSON.parse(relationships).length}`
    //     )
    // );

    /* MODULE 2 - MAP AND PARSE DATA */
    // const storedRelationships = await readFromJsonFile(FILE_PATHS.RELATIONSHIPS);
    // const storedRelationshipsString = JSON.stringify(storedRelationships);

    // const generatedMappings = await createMappingTool.invoke(
    //     storedRelationshipsString
    // );

    // console.log('Writing mappings');
    // await writeMappingsToFiles(generatedMappings, FILE_PATHS.ROOT_MAPPINGS);

    /* MODULE 3 - CREATE CYPHER QUERIES */
    // await dynamicRelationshipMapper(FILE_PATHS.DUMMY_ROOT_MAPPINGS, FILE_PATHS.DUMMY_RELATIONSHIPS, FILE_PATHS.DUMMY_CYPHER_QUERIES_OUTPUT_DIR);

    // /* MODULE 4 - INGEST DATA */

    // await ingestDataScript({
    //     filePath: artistsCsvPath,
    //     queries: await extractQueriesFromCypherFile(
    //         FILE_PATHS.DUMMY_ARTIST_CYPHERS
    //     ),
    //     parameterMapping: artistParameterMapping,
    //     additional: { entity: 'artist' },
    // });

    // logBigMessage('Ingested artists');

    // await ingestDataScript({
    //     filePath: artworksCsvPath,
    //     queries: await extractQueriesFromCypherFile(
    //         FILE_PATHS.DUMMY_ARTWORKS_CYPHERS
    //     ),
    //     parameterMapping: artworkParameterMapping,
    //     additional: { entity: 'artwork' },
    // });

    // logBigMessage('Ingested artworks');
}

main();
