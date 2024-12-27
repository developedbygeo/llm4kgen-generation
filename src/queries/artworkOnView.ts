export const artworkOnViewQuery = `
MATCH (aw:Artwork {ObjectID: $objectID})
MERGE (loc:Location {name: $onViewLocation})
MERGE (aw)-[:ON_VIEW_AT]->(loc)
`;
