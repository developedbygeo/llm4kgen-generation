MATCH (artist:Artist)-[created:CREATED]->(artwork:Artwork)
OPTIONAL MATCH (artwork)-[hasMedium:HAS_MEDIUM]->(medium:Medium)
OPTIONAL MATCH (artwork)-[belongsTo:BELONGS_TO_DEPARTMENT]->(department:Department)
RETURN artist, created, artwork, hasMedium, medium, belongsTo, department
LIMIT 1000;