// If we have a WikiQID, create/merge a reference node
// If we have a ULAN, create/merge a reference node

export const artistReferenceQuery = `
UNWIND $rows AS row
MATCH (a:Artist {ConstituentID: row.artistID})

FOREACH (_ IN CASE WHEN row.references.WikiQID IS NOT NULL THEN [1] ELSE [] END |
  MERGE (ref1:Reference {source: "WikiData", id: row.references.WikiQID})
  MERGE (a)-[:HAS_REFERENCE]->(ref1)
)

FOREACH (_ IN CASE WHEN row.references.ULAN IS NOT NULL THEN [1] ELSE [] END |
  MERGE (ref2:Reference {source: "ULAN", id: row.references.ULAN})
  MERGE (a)-[:HAS_REFERENCE]->(ref2)
)
`;
