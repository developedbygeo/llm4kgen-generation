export const createRelationshipQuery = `
UNWIND $rows AS row
MATCH (a:Artist {ConstituentID: row.ConstituentID})
MATCH (aw:Artwork {ObjectID: row.ObjectID})
MERGE (a)-[:CREATED]->(aw);
`;
