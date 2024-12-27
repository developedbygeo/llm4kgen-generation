export const artistNationalityQuery = `
MATCH (a:Artist {ConstituentID: $artistID})
MERGE (n:Nationality {name: $nationality})
MERGE (a)-[:HAS_NATIONALITY]->(n)
`;
