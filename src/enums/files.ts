export const FILE_PATHS = {
    RELATIONSHIPS: './src/llm-data/relationships.json',
    ROOT_MAPPINGS: './src/llm-data/mappings',
    CYPHER_QUERIES: './src/llm-data/cypher-queries.json',

    INGESTION_CODE: './src/modules/loadAndIngestData.ts',

    // TEST
    DUMMY_RELATIONSHIPS: './src/llm-output-data/relationships.json',
    DUMMY_ROOT_MAPPINGS: './src/llm-output-data/mappings',
    DUMMY_CYPHER_QUERIES: './src/llm-output-data/cypher-queries.json',
    DUMMY_CYPHER_QUERIES_OUTPUT_DIR: './src/llm-output-data/cypher-queries',
    DUMMY_ARTIST_CYPHERS:
        './src/llm-output-data/cypher-queries/ArtistParameterMapping.cypher',
    DUMMY_ARTIST_MAPPINGS: './src/llm-output-data/mappings/artistParameter.ts',
    DUMMY_ARTWORKS_CYPHERS:
        './src/llm-output-data/cypher-queries/ArtworkParameterMapping.cypher',
    DUMMY_ARTWORKS_MAPPINGS:
        './src/llm-output-data/mappings/artworkParameter.ts',
} as const;
