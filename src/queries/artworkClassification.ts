export const artworkClassificationQuery = `
MATCH (aw:Artwork {ObjectID: $objectID})
MERGE (c:Classification {name: $classification})
MERGE (aw)-[:BELONGS_TO_CLASSIFICATION]->(c)
`;
