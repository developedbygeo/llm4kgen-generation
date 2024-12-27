export const artworkDepartmentQuery = `
UNWIND $rows AS row
MATCH (aw:Artwork {ObjectID: row.objectID})
MERGE (d:Department {name: row.department})
MERGE (aw)-[:BELONGS_TO_DEPARTMENT]->(d)
`;
