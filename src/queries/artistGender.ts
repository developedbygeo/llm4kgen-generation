export const artistGenderQuery = `
UNWIND $rows AS row
MATCH (a:Artist {ConstituentID: row.artistID})
MERGE (g:Gender {label: row.gender})
MERGE (a)-[:HAS_GENDER]->(g)
`;
