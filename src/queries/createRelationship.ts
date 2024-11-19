export const createRelationshipQuery = `
MATCH (a:Artist {ConstituentID: $ConstituentID})
MATCH (aw:Artwork {ObjectID: $ObjectID})
MERGE (a)-[:CREATED]->(aw)
`;
