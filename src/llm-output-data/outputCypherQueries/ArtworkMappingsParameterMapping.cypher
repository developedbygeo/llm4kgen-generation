UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_TITLE' MERGE (a)-[r:HAS_TITLE]->(v:Title {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'CREATED_BY_ARTIST' MERGE (a)-[r:CREATED_BY_ARTIST]->(v:Artist {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_DATE' MERGE (a)-[r:HAS_DATE]->(v:Date {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_MEDIUM' MERGE (a)-[r:HAS_MEDIUM]->(v:Medium {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_DIMENSIONS' MERGE (a)-[r:HAS_DIMENSIONS]->(v:Dimensions {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_CREDIT_LINE' MERGE (a)-[r:HAS_CREDIT_LINE]->(v:CreditLine {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_ACCESSION_NUMBER' MERGE (a)-[r:HAS_ACCESSION_NUMBER]->(v:AccessionNumber {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_CLASSIFICATION' MERGE (a)-[r:HAS_CLASSIFICATION]->(v:Classification {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'BELONGS_TO_DEPARTMENT' MERGE (a)-[r:BELONGS_TO_DEPARTMENT]->(v:Department {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_DATE_ACQUIRED' MERGE (a)-[r:HAS_DATE_ACQUIRED]->(v:DateAcquired {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_CATALOGED_STATUS' MERGE (a)-[r:HAS_CATALOGED_STATUS]->(v:CatalogedStatus {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_OBJECT_ID' MERGE (a)-[r:HAS_OBJECT_ID]->(v:ObjectID {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_URL' MERGE (a)-[r:HAS_URL]->(v:URL {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_IMAGE_URL' MERGE (a)-[r:HAS_IMAGE_URL]->(v:ImageURL {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_ON_VIEW_STATUS' MERGE (a)-[r:HAS_ON_VIEW_STATUS]->(v:OnViewStatus {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_CIRCUMFERENCE' MERGE (a)-[r:HAS_CIRCUMFERENCE]->(v:Circumference {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_DEPTH' MERGE (a)-[r:HAS_DEPTH]->(v:Depth {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_DIAMETER' MERGE (a)-[r:HAS_DIAMETER]->(v:Diameter {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_HEIGHT' MERGE (a)-[r:HAS_HEIGHT]->(v:Height {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_LENGTH' MERGE (a)-[r:HAS_LENGTH]->(v:Length {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_WEIGHT' MERGE (a)-[r:HAS_WEIGHT]->(v:Weight {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_WIDTH' MERGE (a)-[r:HAS_WIDTH]->(v:Width {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_SEAT_HEIGHT' MERGE (a)-[r:HAS_SEAT_HEIGHT]->(v:SeatHeight {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()

UNWIND $rows AS row MERGE (a:ARTWORKMAPPINGS {name: row.name, objectID: row.objectID}) ON CREATE SET a.created = timestamp(), a.updated = timestamp() ON MATCH SET a.updated = timestamp() WITH row, a WHERE row.relationship = 'HAS_DURATION' MERGE (a)-[r:HAS_DURATION]->(v:Duration {value: row.value}) ON CREATE SET v.created = timestamp(), r.updated = timestamp() ON MATCH SET r.updated = timestamp()