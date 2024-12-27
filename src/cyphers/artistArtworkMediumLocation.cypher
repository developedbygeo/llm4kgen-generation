MATCH (artist:Artist)-[created:CREATED]->(artwork:Artwork)
OPTIONAL MATCH (artwork)-[hasMedium:HAS_MEDIUM]->(medium:Medium)
OPTIONAL MATCH (artwork)-[onView:ON_VIEW_AT]->(location:Location)
RETURN artist, created, artwork, hasMedium, medium, onView, location
LIMIT 1000;