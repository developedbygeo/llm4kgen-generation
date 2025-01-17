import config from '../config';
import { Neo4jConnection } from '../db';
import { entityArtistConnector } from '../llm-output-data/mappingConnectors/entityArtistConnector';
import { entityArtworkConnector } from '../llm-output-data/mappingConnectors/entityArtworkConnector';
import { initialArtistConnector } from '../llm-output-data/mappingConnectors/testArtistConnector';
import { initialArtworkConnector } from '../llm-output-data/mappingConnectors/testArtworkConnector';
import { loadCsvAndIngestDataForTool } from '../modules/loadAndIngestDataForTool';
// import { identifyMappingPropertyForArtistQuery } from '../llm-output-data/mappingConnectors/artistConnector';
// import { identifyMappingPropertyForArtworkQuery } from '../llm-output-data/mappingConnectors/artworkConnector';
import { EntityToProcess } from '../types/general';
import { logBigMessage } from '../utils/console';

export type IngestDataProps = {
    filePath: string;
    queries: string[];
    parameterMapping: Record<string, any>;
    additional: {
        entity: EntityToProcess;
        isEntityMapping: boolean;
    };
};

export const ingestDataScript = async (props: IngestDataProps) => {
    const conn = Neo4jConnection.getInstance(
        config.secrets.DB_URL,
        config.secrets.DB_USER,
        config.secrets.DB_PASSWORD
    );
    logBigMessage('Connecting to Neo4j singleton');

    const isEntityMapping = props.additional.isEntityMapping || false;

    try {
        logBigMessage(`Creating ${props.additional.entity} nodes`);
        logBigMessage(`Extracted: ${props.queries.length} queries`);

        await Promise.all(
            props.queries.map(async (query, index) => {
                const mappingConnectorForArtist = isEntityMapping
                    ? entityArtistConnector(query)
                    : initialArtistConnector(query);

                const mappingConnectorForArtwork = isEntityMapping
                    ? entityArtworkConnector(query)
                    : initialArtworkConnector(query);

                logBigMessage(`Processing query: ${index}`);
                logBigMessage('IDENTIFYING MAPPING PROPERTY FOR QUERY');
                const property =
                    props.additional.entity === 'artist'
                        ? mappingConnectorForArtist
                        : mappingConnectorForArtwork;

                const castedProperty =
                    property as keyof typeof props.parameterMapping;

                await loadCsvAndIngestDataForTool(
                    props.filePath,
                    query,
                    conn,
                    props.parameterMapping[castedProperty],
                    props.additional.entity
                );
            })
        );
        logBigMessage(
            `Successfully ran queries for ${props.additional.entity}`
        );
    } catch (err) {
        console.log(err);
    }
};
