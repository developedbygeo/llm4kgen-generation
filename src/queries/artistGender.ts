export const artistGenderQuery = `
MATCH (a:Artist {ConstituentID: $artistID})
MERGE (g:Gender {label: $gender})
MERGE (a)-[:HAS_GENDER]->(g)
`;
