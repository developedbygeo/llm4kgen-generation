export const artworkDimensionQuery = `
UNWIND $rows AS row
MATCH (aw:Artwork {ObjectID: row.objectID})
MERGE (dim:Dimension { dimensionKey: row.dimensionKey })
  ON CREATE SET dim.createdAt = timestamp()
SET dim += row.dim
MERGE (aw)-[:HAS_DIMENSION]->(dim)
`;
