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

import path, { resolve } from 'path';
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
import prompts from 'prompts';
import {
    RUNNABLE_SCRIPT_DESCRIPTION_ENUM,
    RUNNABLE_SCRIPT_ENUM,
    RUNNABLE_SCRIPT_TITLE_ENUM,
} from './enums/scripts';
import { createNodes } from './modules/createNodes';
import { mapAndParseData } from './modules/mapAndParseData';
import { ArtistMappingsParameterMapping } from './llm-output-data/outputMappings/ArtistMappingsParameterMapping';
import { ArtworkMappingsParameterMapping } from './llm-output-data/outputMappings/ArtworkMappingsParameterMapping';
import { createRelationshipCyphersForEntities } from './modules/createRelationshipCyphersForEntities';
import { entityRelationshipsForArtistMapping } from './llm-output-data/entityRelationshipMappings/entityRelationshipsForArtistMapping';
import { entityRelationshipsForArtworkMapping } from './llm-output-data/entityRelationshipMappings/entityRelationshipsForArtworkMapping';

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

    logBigMessage('Welcome to the LLM Data Ingestion Toolbox');
    let exit = false;

    while (!exit) {
        const response = await prompts({
            type: 'select',
            name: 'script',
            message: 'Which operation do you want to run?',
            choices: [
                {
                    title: RUNNABLE_SCRIPT_TITLE_ENUM.GENERATE_DB_INDICES,
                    value: RUNNABLE_SCRIPT_ENUM.GENERATE_DB_INDICES,
                    description:
                        RUNNABLE_SCRIPT_DESCRIPTION_ENUM.GENERATE_DB_INDICES,
                },
                {
                    title: RUNNABLE_SCRIPT_TITLE_ENUM.CREATE_NODES,
                    value: RUNNABLE_SCRIPT_ENUM.CREATE_NODES,
                    description: RUNNABLE_SCRIPT_DESCRIPTION_ENUM.CREATE_NODES,
                },

                {
                    title: RUNNABLE_SCRIPT_TITLE_ENUM.MAP_AND_PARSE_DATA,
                    value: RUNNABLE_SCRIPT_ENUM.MAP_AND_PARSE_DATA,
                    description:
                        RUNNABLE_SCRIPT_DESCRIPTION_ENUM.MAP_AND_PARSE_DATA,
                },
                {
                    title: RUNNABLE_SCRIPT_TITLE_ENUM.CREATE_CYPHER_QUERIES,
                    value: RUNNABLE_SCRIPT_ENUM.CREATE_CYPHER_QUERIES,
                    description:
                        RUNNABLE_SCRIPT_DESCRIPTION_ENUM.CREATE_CYPHER_QUERIES,
                },
                {
                    title: RUNNABLE_SCRIPT_TITLE_ENUM.INGEST_DATA,
                    value: RUNNABLE_SCRIPT_ENUM.INGEST_DATA,
                    description: RUNNABLE_SCRIPT_DESCRIPTION_ENUM.INGEST_DATA,
                },

                {
                    title: RUNNABLE_SCRIPT_TITLE_ENUM.CREATE_RELATIONSHIPS_BETWEEN_ENTITIES,
                    value: RUNNABLE_SCRIPT_ENUM.CREATE_RELATIONSHIPS_BETWEEN_ENTITIES,
                    description:
                        RUNNABLE_SCRIPT_DESCRIPTION_ENUM.CREATE_RELATIONSHIPS_BETWEEN_ENTITIES,
                },
                { title: 'Exit', value: 'exit' },
            ],
        });

        switch (response.script) {
            case RUNNABLE_SCRIPT_ENUM.GENERATE_DB_INDICES:
                await setupDbIndices(conn, files);
                break;
            case RUNNABLE_SCRIPT_ENUM.CREATE_NODES:
                await createNodes(files);
                break;
            case RUNNABLE_SCRIPT_ENUM.MAP_AND_PARSE_DATA:
                await mapAndParseData();
                break;

            case RUNNABLE_SCRIPT_ENUM.CREATE_CYPHER_QUERIES:
                await dynamicRelationshipMapper(
                    resolve(FILE_PATHS.OUTPUT_ROOT_MAPPINGS),
                    resolve(FILE_PATHS.OUTPUT_NODES),
                    resolve(FILE_PATHS.OUTPUT_CYPHER_QUERIES_OUTPUT_DIR)
                );
                break;

            case RUNNABLE_SCRIPT_ENUM.INGEST_DATA:
                await ingestDataScript({
                    filePath: artistsCsvPath,
                    queries: await extractQueriesFromCypherFile(
                        FILE_PATHS.OUTPUT_ARTIST_CYPHERS
                    ),
                    parameterMapping: ArtistMappingsParameterMapping,
                    additional: { entity: 'artist', isEntityMapping: false },
                });

                logBigMessage('Ingested artists');

                await ingestDataScript({
                    filePath: artworksCsvPath,
                    queries: await extractQueriesFromCypherFile(
                        FILE_PATHS.OUTPUT_ARTWORKS_CYPHERS
                    ),
                    parameterMapping: ArtworkMappingsParameterMapping,
                    additional: { entity: 'artwork', isEntityMapping: false },
                });

                logBigMessage('Ingested artworks');
                break;

            case RUNNABLE_SCRIPT_ENUM.CREATE_RELATIONSHIPS_BETWEEN_ENTITIES:
                await createRelationshipCyphersForEntities({
                    outputDir: resolve(
                        FILE_PATHS.OUTPUT_ENTITY_RELATIONSHIP_DIR
                    ),
                });

                await ingestDataScript({
                    filePath: artistsCsvPath,
                    queries: await extractQueriesFromCypherFile(
                        FILE_PATHS.OUTPUT_ENTITY_ARTIST_CYPHER
                    ),
                    parameterMapping: entityRelationshipsForArtistMapping,
                    additional: { entity: 'artist', isEntityMapping: true },
                });

                await ingestDataScript({
                    filePath: artworksCsvPath,
                    queries: await extractQueriesFromCypherFile(
                        FILE_PATHS.OUTPUT_ENTITY_ARTWORK_CYPHER
                    ),
                    parameterMapping: entityRelationshipsForArtworkMapping,
                    additional: { entity: 'artwork', isEntityMapping: true },
                });

                logBigMessage('Created relationships between entities');
                break;
            // create relationships based on db.schema here
            case 'exit':
                exit = true;
                console.log('Exiting program. Goodbye!');
                break;
            default:
                console.log('No valid script chosen.');
        }
    }
}

main();
