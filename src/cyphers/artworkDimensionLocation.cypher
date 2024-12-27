MATCH (artwork:Artwork)-[hasDimension:HAS_DIMENSION]->(dimension:Dimension)
OPTIONAL MATCH (artwork)-[onView:ON_VIEW_AT]->(location:Location)
RETURN artwork, hasDimension, dimension, onView, location
LIMIT 1000;
