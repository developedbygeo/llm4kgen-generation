export const RUNNABLE_SCRIPT_ENUM = {
    GENERATE_DB_INDICES: 'generateDbIndices',
    GENERATE_DB_INDICES_WITH_ONTOLOGY: 'generateDbIndicesWithOntology',

    CREATE_NODES: 'createNodes',
    CREATE_NODES_WITH_ONTOLOGY: 'createNodesWithOntology',

    MAP_AND_PARSE_DATA: 'mapAndParseData',
    MAP_AND_PARSE_DATA_WITH_ONTOLOGY: 'mapAndParseDataWithOntology',

    CREATE_CYPHER_QUERIES: 'createCypherQueries',
    CREATE_CYPHER_QUERIES_WITH_ONTOLOGY: 'createCypherQueriesWithOntology',

    INGEST_DATA: 'ingestData',
    INGEST_DATA_WITH_ONTOLOGY: 'ingestDataWithOntology',

    CREATE_RELATIONSHIPS_BETWEEN_ENTITIES: 'createRelationshipsBetweenEntities',
} as const;

export const RUNNABLE_SCRIPT_TITLE_ENUM = {
    GENERATE_DB_INDICES: 'Create DB indices',
    GENERATE_DB_INDICES_WITH_ONTOLOGY: 'Create DB indices + OWL RAG',

    CREATE_NODES: 'Create nodes',
    CREATE_NODES_WITH_ONTOLOGY: 'Create nodes + OWL RAG',

    MAP_AND_PARSE_DATA: 'Map and parse data',
    MAP_AND_PARSE_DATA_WITH_ONTOLOGY: 'Map and parse data + OWL RAG',

    CREATE_CYPHER_QUERIES: 'Create Cypher queries',
    CREATE_CYPHER_QUERIES_WITH_ONTOLOGY: 'Create Cypher queries + OWL RAG',

    INGEST_DATA: 'Ingest data',
    INGEST_DATA_WITH_ONTOLOGY: 'Ingest data + OWL RAG',

    CREATE_RELATIONSHIPS_BETWEEN_ENTITIES:
        'Create relationships between entities',
} as const;

export const RUNNABLE_SCRIPT_DESCRIPTION_ENUM = {
    GENERATE_DB_INDICES:
        'Create indices for the database based on the provided CSV files by invoking a dynamic tool that generates the Cypher queries for creating the indices.',
    GENERATE_DB_INDICES_WITH_ONTOLOGY: `Creates indices for the database based on the relationships identified between entities in the data by using the OWL ontology from the RAG.`,

    CREATE_NODES:
        'Create nodes for the database based on the provided CSV files.',
    CREATE_NODES_WITH_ONTOLOGY: `Creates nodes for the database based on the relationships identified between entities in the data by using the OWL ontology from the RAG.`,

    MAP_AND_PARSE_DATA:
        'Map and parse the data based on the generated nodes and file contents.',
    MAP_AND_PARSE_DATA_WITH_ONTOLOGY: `Maps and parses the data based on the relationships identified between entities in the data by using the OWL ontology from the RAG.`,

    CREATE_CYPHER_QUERIES: 'Create Cypher queries for the database.',
    CREATE_CYPHER_QUERIES_WITH_ONTOLOGY: `Creates Cypher queries for the database based on the relationships identified between entities in the data by using the OWL ontology from the RAG.`,

    INGEST_DATA: 'Ingest data into the database.',
    INGEST_DATA_WITH_ONTOLOGY: `Ingests data into the database based on the relationships identified between entities in the data by using the OWL ontology from the RAG.`,

    CREATE_RELATIONSHIPS_BETWEEN_ENTITIES:
        'Create relationships between entities in the database.',
} as const;
