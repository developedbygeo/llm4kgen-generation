export const artworkDepartmentQuery = `
MATCH (aw:Artwork {ObjectID: $objectID})
MERGE (d:Department {name: $department})
MERGE (aw)-[:BELONGS_TO_DEPARTMENT]->(d)
`;
