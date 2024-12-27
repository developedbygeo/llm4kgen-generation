MATCH (artist:Artist)-[created:CREATED]->(artwork:Artwork)
OPTIONAL MATCH (artist)-[hasNationality:HAS_NATIONALITY]->(nationality:Nationality)
OPTIONAL MATCH (artwork)-[classificationRel:BELONGS_TO_CLASSIFICATION]->(classification:Classification)
RETURN artist, hasNationality, nationality, created, artwork, classificationRel, classification
LIMIT 1000;
