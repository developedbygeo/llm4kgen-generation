MATCH (a:Artist)-[r:CREATED]->(aw:Artwork)
RETURN a, r, aw
LIMIT 100;
