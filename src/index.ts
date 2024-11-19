import * as dotenv from 'dotenv';

dotenv.config();

import { Neo4jConnection } from './db';
import { loadCsvAndIngestData } from './modules/loadAndIngestData';
import { createArtistQuery } from './queries/createArtist';
import { artistParameterMapping } from './mappings/artistParameter';
import { createArtworkQuery } from './queries/createArtwork';
import { artworkParameterMapping } from './mappings/artworkParameter';
import { createRelationshipQuery } from './queries/createRelationship';
import { relationshipParameterMapping } from './mappings/relationshipParameter';
import path from 'path';

const artistsCsvPath = path.join(__dirname, 'data', 'Artists.csv');
const artworksCsvPath = path.join(__dirname, 'data', 'Artworks.csv');

async function main() {
    const uri = process.env.DB_URL as string;
    const user = process.env.DB_USER as string;
    const password = process.env.DB_PWD as string;
    const conn = new Neo4jConnection(uri, user, password);

    console.log('Connecting to Neo4j');
    try {
        // Load Artists CSV and Create Artist Nodes
        await loadCsvAndIngestData(
            artistsCsvPath,
            createArtistQuery,
            conn,
            artistParameterMapping
        );

        console.log('Artists loaded successfully');
        // // Load Artworks CSV and Create Artwork Nodes
        await loadCsvAndIngestData(
            artworksCsvPath,
            createArtworkQuery,
            conn,
            artworkParameterMapping
        );

        console.log('Artworks loaded successfully');
        // Load Artworks CSV and Create Relationships between Artists and Artworks
        console.log('Loading relationships');
        await loadCsvAndIngestData(
            artworksCsvPath,
            createRelationshipQuery,
            conn,
            relationshipParameterMapping
        );

        console.log('Relationships loaded successfully');
    } finally {
        // Close the Neo4j connection
        conn.close();
    }
}

main();
