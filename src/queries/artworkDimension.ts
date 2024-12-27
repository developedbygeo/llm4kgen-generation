export const artworkDimensionQuery = `
MATCH (aw:Artwork {ObjectID: $objectID})
MERGE (dim:Dimension { dimensionKey: $dimensionKey })
  ON CREATE SET dim.createdAt = timestamp()
SET dim += $dim
MERGE (aw)-[:HAS_DIMENSION]->(dim)
`;
