export const RUNNABLE_SCRIPT_ENUM = {
    GENERATE_DB_INDICES: 'generateDbIndices',
    CREATE_NODES: 'createNodes',
    MAP_AND_PARSE_DATA: 'mapAndParseData',
    CREATE_CYPHER_QUERIES: 'createCypherQueries',
    INGEST_DATA: 'ingestData',
} as const;

export const RUNNABLE_SCRIPT_TITLE_ENUM = {
    GENERATE_DB_INDICES: 'Create DB indices',
    CREATE_NODES: 'Create nodes',
    MAP_AND_PARSE_DATA: 'Map and parse data',
    CREATE_CYPHER_QUERIES: 'Create Cypher queries',
    INGEST_DATA: 'Ingest data',
} as const;

export const RUNNABLE_SCRIPT_DESCRIPTION_ENUM = {
    GENERATE_DB_INDICES:
        'Create indices for the database based on the provided CSV files by invoking a dynamic tool that generates the Cypher queries for creating the indices.',
    CREATE_NODES:
        'Create nodes for the database based on the provided CSV files.',
    MAP_AND_PARSE_DATA:
        'Map and parse the data based on the generated nodes and file contents.',
    CREATE_CYPHER_QUERIES: 'Create Cypher queries for the database.',
    INGEST_DATA: 'Ingest data into the database.',
} as const;
