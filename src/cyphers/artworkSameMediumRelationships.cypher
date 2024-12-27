MATCH (artwork1:Artwork)-[hasMedium1:HAS_MEDIUM]->(medium:Medium)<-[hasMedium2:HAS_MEDIUM]-(artwork2:Artwork)
WHERE artwork1 <> artwork2
RETURN artwork1, hasMedium1, medium, hasMedium2, artwork2
LIMIT 1000;