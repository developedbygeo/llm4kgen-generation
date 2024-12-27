export const artworkOnViewQuery = `
UNWIND $rows AS row
MATCH (aw:Artwork {ObjectID: row.objectID})
MERGE (loc:Location {name: row.onViewLocation})
MERGE (aw)-[:ON_VIEW_AT]->(loc)
`;
