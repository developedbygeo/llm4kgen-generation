export const artworkClassificationQuery = `
UNWIND $rows AS row
MATCH (aw:Artwork {ObjectID: row.objectID})
MERGE (c:Classification {name: row.classification})
MERGE (aw)-[:BELONGS_TO_CLASSIFICATION]->(c)
`;
