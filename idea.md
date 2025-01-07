# Idea

## Step 1 - Connect to LM Studio with the right interface

https://lmstudio.ai/docs/api/openai-api

and use /v1/chat/completions

## Step 2 - Create setupDBIndices

To do this, we need to:

1. Utilize `getFirstNRowsFromCsv` from utils>data and get the first 2-3 rows of each file.
2. Pass them to the LLM.
3. Receive an array back.
4. `executeWrite` for each tx

**GOAL**: Create indices through `setupDBIndices`

## Step 3. Identify relationships based on columns.

The format should be something like:

```
#1 Artists - ConstituentID,DisplayName,ArtistBio,Nationality,Gender,BeginDate,EndDate,Wiki QID,ULAN

#2 Artworks - Title,Artist,ConstituentID,ArtistBio,Nationality,BeginDate,EndDate,Gender,Date,Medium,Dimensions,CreditLine,AccessionNumber,Classification,Department,DateAcquired,Cataloged,ObjectID,URL,ImageURL,OnView,Circumference (cm),Depth (cm),Diameter (cm),Height (cm),Length (cm),Weight (kg),Width (cm),Seat Height (cm),Duration (sec.).

Based on these, if you were to construct  a knowledge graph in Neo4J, apart from the obvious following relationship, what other relationships would you create?
```

Based on this, we should also provide the LLM with a core query in the format of an existing one, for it to identify the relationships. From that point, for each relationship, we run a query asking it to generate the cypher and save it.

## Step 4. Generate mappings

Ask LLM to:

1. Identify correct entities to create mappings
2. Create mappings for each - based on an existing template
3. Save mapping files in a given directory (optional, can return response and use it)

**_ !!! IMPORTANT !!! _**

One core concept is, to inform the LLM that any properties created within the object will be used to invoke `loadCsvAndIngestData` such as:

```ts
await loadCsvAndIngestData(
    artistsCsvPath,
    artistNationalityQuery, // e.g. MATCH (a:Artist {ConstituentID: $artistID}) MERGE (n:Nationality {name: $nationality}) ...
    conn,
    artistParameterMapping.nationality
);
```
