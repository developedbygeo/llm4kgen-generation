import { cleanNullValuesFromRow } from '../../lib/data';

export const artworkParameterMapping = {
    // 1) Core Artwork properties that remain directly on the ARTWORK node
    coreProperties: (row: Record<string, string>) => ({
        name: row['Title'] ?? null,
        objectID: row['ObjectID'],
        constituentID: row['ConstituentID'] ?? null,
        title: row['Title'] ?? null,
        nationality: row['Nationality'] ?? null,
        creditLine: row['CreditLine'] ?? null,
        accessionNumber: row['AccessionNumber'] ?? null,
        url: row['URL'] ?? null,
        imageUrl: row['ImageURL'] ?? null,
    }),

    // 2) All the "HAS_..." relationships
    relationships: (row: Record<string, string>) => {
        const relationships = {
            HAS_ARTIST: row['Artist'] ?? null,
            HAS_CONSTITUENT_ID: row['ConstituentID'] ?? null,
            HAS_ARTIST_BIO: row['ArtistBio'] ?? null,
            HAS_NATIONALITY: row['Nationality'] ?? null,
            HAS_BEGIN_DATE: row['BeginDate']
                ? parseInt(row['BeginDate'], 10)
                : null,
            HAS_END_DATE: row['EndDate'] ? parseInt(row['EndDate'], 10) : null,
            HAS_GENDER: row['Gender'] ?? null,
            HAS_DATE: row['Date'] ?? null,
            HAS_MEDIUM: row['Medium'] ?? null,
            HAS_DIMENSIONS: row['Dimensions'] ?? null,
            HAS_CREDIT_LINE: row['CreditLine'] ?? null,
            HAS_ACCESSION_NUMBER: row['AccessionNumber'] ?? null,
            HAS_CLASSIFICATION: row['Classification'] ?? null,
            HAS_DEPARTMENT: row['Department'] ?? null,
            HAS_DATE_ACQUIRED: row['DateAcquired'] ?? null,
            HAS_CATALOGED: row['Cataloged'] ?? null,
            HAS_URL: row['URL'] ?? null,
            HAS_IMAGE_URL: row['ImageURL'] ?? null,
            IS_ON_VIEW: row['OnView'] ?? null,
            HAS_CIRCUMFERENCE: row['Circumference (cm)']
                ? parseFloat(row['Circumference (cm)'])
                : null,
            HAS_DEPTH: row['Depth (cm)'] ? parseFloat(row['Depth (cm)']) : null,
            HAS_DIAMETER: row['Diameter (cm)']
                ? parseFloat(row['Diameter (cm)'])
                : null,
            HAS_HEIGHT: row['Height (cm)']
                ? parseFloat(row['Height (cm)'])
                : null,
            HAS_LENGTH: row['Length (cm)']
                ? parseFloat(row['Length (cm)'])
                : null,
            HAS_WEIGHT: row['Weight (kg)']
                ? parseFloat(row['Weight (kg)'])
                : null,
            HAS_WIDTH: row['Width (cm)'] ? parseFloat(row['Width (cm)']) : null,
            HAS_SEAT_HEIGHT: row['Seat Height (cm)']
                ? parseFloat(row['Seat Height (cm)'])
                : null,
            HAS_DURATION: row['Duration (sec.)']
                ? parseFloat(row['Duration (sec.)'])
                : null,
        };

        // Return only non-null relationships, each as { objectID, relationship, value }
        return Object.entries(relationships)
            .filter(([_, value]) => value !== null)
            .map(([relationship, value]) => ({
                objectID: row['ObjectID'],
                relationship,
                value,
            }));
    },

    // 3) Dimensions (if you want them in a separate node/logic)
    dimensions: (row: Record<string, string>) => {
        const dimensions = {
            circumference: row['Circumference (cm)']
                ? parseFloat(row['Circumference (cm)'])
                : null,
            depth: row['Depth (cm)'] ? parseFloat(row['Depth (cm)']) : null,
            diameter: row['Diameter (cm)']
                ? parseFloat(row['Diameter (cm)'])
                : null,
            height: row['Height (cm)'] ? parseFloat(row['Height (cm)']) : null,
            length: row['Length (cm)'] ? parseFloat(row['Length (cm)']) : null,
            weight: row['Weight (kg)'] ? parseFloat(row['Weight (kg)']) : null,
            width: row['Width (cm)'] ? parseFloat(row['Width (cm)']) : null,
            seatHeight: row['Seat Height (cm)']
                ? parseFloat(row['Seat Height (cm)'])
                : null,
            durationSec: row['Duration (sec.)']
                ? parseFloat(row['Duration (sec.)'])
                : null,
        };

        return {
            objectID: row['ObjectID'],
            dimensionKey: `${row['ObjectID']}-dim`,
            dimensions: cleanNullValuesFromRow(dimensions),
        };
    },

    // 4) Classification
    classification: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        classification: row['Classification'] ?? null,
    }),

    // 5) Department
    department: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        department: row['Department'] ?? null,
    }),

    // 6) Medium
    medium: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        medium: row['Medium'] ?? null,
    }),

    // 7) OnView
    onView: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        onViewLocation: row['OnView'] ?? null,
    }),
};
