// If we have a WikiQID, create/merge a reference node
// If we have a ULAN, create/merge a reference node

export const artistReferenceQuery = `
MATCH (a:Artist {ConstituentID: $artistID})

FOREACH (_ IN CASE WHEN $references.WikiQID IS NOT NULL THEN [1] ELSE [] END |
  MERGE (ref1:Reference {source: "WikiData", id: $references.WikiQID})
  MERGE (a)-[:HAS_REFERENCE]->(ref1)
)

FOREACH (_ IN CASE WHEN $references.ULAN IS NOT NULL THEN [1] ELSE [] END |
  MERGE (ref2:Reference {source: "ULAN", id: $references.ULAN})
  MERGE (a)-[:HAS_REFERENCE]->(ref2)
)
`;
