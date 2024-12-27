export const artworkMediumQuery = `
UNWIND $rows AS row
MATCH (aw:Artwork {ObjectID: row.objectID})
MERGE (m:Medium {name: row.medium})
MERGE (aw)-[:HAS_MEDIUM]->(m)
`;
