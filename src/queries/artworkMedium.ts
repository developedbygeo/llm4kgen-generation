export const artworkMediumQuery = `MATCH (aw:Artwork {ObjectID: $objectID})
MERGE (m:Medium {name: $medium})
MERGE (aw)-[:HAS_MEDIUM]->(m)
`;
