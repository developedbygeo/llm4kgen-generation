MATCH p = (artist:Artist)-[r:CREATED]->(artwork:Artwork)
OPTIONAL MATCH (artwork)-[hasMediumRel:HAS_MEDIUM]->(medium)
RETURN artist, r, artwork, p, hasMediumRel, medium
LIMIT 1000;
