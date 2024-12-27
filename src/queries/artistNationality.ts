export const artistNationalityQuery = `
UNWIND $rows AS row
MATCH (a:Artist {ConstituentID: row.artistID})
MERGE (n:Nationality {name: row.nationality})
MERGE (a)-[:HAS_NATIONALITY]->(n)
`;
