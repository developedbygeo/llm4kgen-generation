export const FILE_PATHS = {
    RELATIONSHIPS: './src/llm-data/relationships.json',
    ROOT_MAPPINGS: './src/llm-data/mappings',
    CYPHER_QUERIES: './src/llm-data/cypher-queries.json',

    INGESTION_CODE: './src/modules/loadAndIngestData.ts',

    OUTPUT_NODES: './src/llm-output-data/nodes.json',
    OUTPUT_ROOT_MAPPINGS: './src/llm-output-data/outputMappings',
    OUTPUT_CYPHER_QUERIES: './src/llm-output-data/cypher-queries.json',
    OUTPUT_CYPHER_QUERIES_OUTPUT_DIR:
        './src/llm-output-data/outputCypherQueries',
    OUTPUT_ARTIST_CYPHERS:
        './src/llm-output-data/cypher-queries/ArtistParameterMapping.cypher',
    OUTPUT_ARTIST_MAPPINGS: './src/llm-output-data/mappings/artistParameter.ts',
    OUTPUT_ARTWORKS_CYPHERS:
        './src/llm-output-data/cypher-queries/ArtworkParameterMapping.cypher',
    OUTPUT_ARTWORKS_MAPPINGS:
        './src/llm-output-data/mappings/artworkParameter.ts',
} as const;
