import * as dotenv from 'dotenv';

dotenv.config();

import { Neo4jConnection } from './db';
import { loadCsvAndIngestData } from './modules/loadAndIngestData';
import { artistParameterMapping } from './mappings/artistParameter';
import { artworkParameterMapping } from './mappings/artworkParameter';
import { relationshipParameterMapping } from './mappings/relationshipParameter';

import { createArtworkQuery } from './queries/createArtwork';
import { createArtistQuery } from './queries/createArtist';
import { artistNationalityQuery } from './queries/artistNationality';
import { artistReferenceQuery } from './queries/artistReference';
import { artworkClassificationQuery } from './queries/artworkClassification';
import { artworkDepartmentQuery } from './queries/artworkDepartment';
import { artworkMediumQuery } from './queries/artworkMedium';

import { artworkOnViewQuery } from './queries/artworkOnView';
import { createRelationshipQuery } from './queries/createRelationship';

import path from 'path';
import { artistGenderQuery } from './queries/artistGender';
import { artworkDimensionQuery } from './queries/artworkDimension';

// BIG FILES
const artistsCsvPath = path.join(__dirname, 'data', 'Artists.csv');
const artworksCsvPath = path.join(__dirname, 'data', 'Artworks.csv');

// SAMPLE FILES
// const artistsCsvPath = path.join(__dirname, 'data', 'new-small', 'Artists.csv');
// const artworksCsvPath = path.join(
//     __dirname,
//     'data',
//     'new-small',
//     'Artworks.csv'
// );

async function main() {
    const uri = process.env.DB_URL as string;
    const user = process.env.DB_USER as string;
    const password = process.env.DB_PWD as string;
    const conn = new Neo4jConnection(uri, user, password);

    console.log('Connecting to Neo4j');

    try {
        // ---------------------------------------------------------
        // Step 1: Load "Artists.csv" and Create/Update Artist nodes
        // ---------------------------------------------------------
        console.log('Creating Artist nodes...');
        await loadCsvAndIngestData(
            artistsCsvPath,
            createArtistQuery, // e.g. MERGE (a:Artist {ConstituentID: $artist.ConstituentID}) ...
            conn,
            artistParameterMapping.coreProperties // maps row to { artist: {...} }
        );
        console.log('Artist nodes created successfully.');

        // Link Artists to Nationality
        console.log('Linking Artist -> Nationality...');
        await loadCsvAndIngestData(
            artistsCsvPath,
            artistNationalityQuery, // e.g. MATCH (a:Artist {ConstituentID: $artistID}) MERGE (n:Nationality {name: $nationality}) ...
            conn,
            artistParameterMapping.nationality
        );

        // Link Artists to Gender
        console.log('Linking Artist -> Gender...');
        await loadCsvAndIngestData(
            artistsCsvPath,
            artistGenderQuery, // e.g. MATCH (a:Artist {ConstituentID: $artistID}) MERGE (g:Gender {label: $gender}) ...
            conn,
            artistParameterMapping.gender
        );

        // Link Artists to References (WikiQID, ULAN)
        console.log('Linking Artist -> References...');
        // This might require a custom ingestion approach if your references query
        // uses FOREACH or has multiple merges in a single statement. But conceptually:
        await loadCsvAndIngestData(
            artistsCsvPath,
            artistReferenceQuery, // e.g. MATCH (a:Artist {ConstituentID: $artistID}) FOREACH ...
            conn,
            artistParameterMapping.references
        );

        console.log('Artist relationships created successfully.');

        // ---------------------------------------------------------
        // Step 2: Load "Artworks.csv" and Create/Update Artwork nodes
        // ---------------------------------------------------------
        console.log('Creating Artwork nodes...');
        await loadCsvAndIngestData(
            artworksCsvPath,
            createArtworkQuery, // e.g. MERGE (aw:Artwork {ObjectID: $artwork.ObjectID}) ...
            conn,
            artworkParameterMapping.coreProperties // maps row to { artwork: {...} }
        );
        console.log('Artwork nodes created successfully.');

        // Link Artwork to Classification
        console.log('Linking Artwork -> Classification...');
        await loadCsvAndIngestData(
            artworksCsvPath,
            artworkClassificationQuery, // e.g. MATCH (aw:Artwork {ObjectID: $objectID}) MERGE (c:Classification {name: $classification}) ...
            conn,
            artworkParameterMapping.classification
        );

        // Link Artwork to Department
        console.log('Linking Artwork -> Department...');
        await loadCsvAndIngestData(
            artworksCsvPath,
            artworkDepartmentQuery, // e.g. MATCH (aw:Artwork {ObjectID: $objectID}) MERGE (d:Department {name: $department}) ...
            conn,
            artworkParameterMapping.department
        );

        // Link Artwork to Medium
        console.log('Linking Artwork -> Medium...');
        await loadCsvAndIngestData(
            artworksCsvPath,
            artworkMediumQuery, // e.g. MATCH (aw:Artwork {ObjectID: $objectID}) MERGE (m:Medium {name: $medium}) ...
            conn,
            artworkParameterMapping.medium
        );

        // Link Artwork to Dimension
        console.log('Linking Artwork -> Dimension...');
        await loadCsvAndIngestData(
            artworksCsvPath,
            artworkDimensionQuery, // e.g. MATCH (aw:Artwork {ObjectID: $objectID}) MERGE (dim:Dimension { ... })
            conn,
            artworkParameterMapping.dimensions
        );

        // (Optional) Link Artwork "OnView" to a Location node
        console.log('Linking Artwork -> OnView Location...');
        await loadCsvAndIngestData(
            artworksCsvPath,
            artworkOnViewQuery, // e.g. MATCH (aw:Artwork {ObjectID: $objectID}) MERGE (loc:Location {name: $onViewLocation}) ...
            conn,
            artworkParameterMapping.onView // or a specialized function if you store OnView differently
        );

        console.log('Artwork relationships created successfully.');

        // --------------------------------------------------------------------
        // Step 3: Link Artists and Artworks (if the same CSV or separate file)
        // --------------------------------------------------------------------
        // For example, if "Artworks.csv" contains both "ConstituentID" and "ObjectID"
        // you can link them in one pass:
        console.log('Linking (Artist)-[:CREATED]->(Artwork)...');
        await loadCsvAndIngestData(
            artworksCsvPath,
            createRelationshipQuery,
            conn,
            relationshipParameterMapping.createdRelationship // or a combined approach
        );

        console.log('All relationships loaded successfully.');
    } finally {
        // Close the Neo4j connection
        conn.close();
    }
}

main();
