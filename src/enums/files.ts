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
        './src/llm-output-data/outputCypherQueries/ArtistMappingsParameterMapping.cypher',
    OUTPUT_ARTIST_MAPPINGS: './src/llm-output-data/mappings/artistParameter.ts',
    OUTPUT_ARTWORKS_CYPHERS:
        './src/llm-output-data/cypher-queries/ArtworkParameterMapping.cypher',
    OUTPUT_ARTWORKS_MAPPINGS:
        './src/llm-output-data/mappings/artworkParameter.ts',

    OUTPUT_ENTITY_RELATIONSHIP_DIR: './src/llm-output-data/relationships',
    OUTPUT_ENTITY_RELATIONSHIP_FILE: 'entity-relationships.cypher',
    OUTPUT_ENTITY_ARTWORK_CYPHER:
        './src/llm-output-data/relationships/artwork.cypher',
    OUTPUT_ENTITY_ARTIST_CYPHER:
        './src/llm-output-data/relationships/artist.cypher',

    OUTPUT_RELATIONSHIP_MAPPING_ARTIST:
        './src/llm-output-data/entityRelationshipMappings/entityRelationshipsForArtistMapping.ts',
    OUTPUT_RELATIONSHIP_MAPPING_ARTWORK:
        './src/llm-output-data/entityRelationshipMappings/entityRelationshipsForArtworkMapping.ts',
} as const;
