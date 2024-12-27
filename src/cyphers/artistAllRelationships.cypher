MATCH (artist:Artist)-[rel]->(relatedNode)
RETURN artist, rel, relatedNode
LIMIT 1000;