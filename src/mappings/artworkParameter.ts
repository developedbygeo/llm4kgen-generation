import { cleanNullValuesFromRow } from '../lib/data';

export const artworkParameterMapping = {
    // Core Artwork properties -> used by createArtworkQuery
    coreProperties: (row: Record<string, string>) => ({
        artwork: {
            ObjectID: row['ObjectID'],
            Title: row['Title'] ?? null,
            ArtistBio: row['ArtistBio'] ?? null,
            Date: row['Date'] ?? null,
            CreditLine: row['CreditLine'] ?? null,
            AccessionNumber: row['AccessionNumber'] ?? null,
            DateAcquired: row['DateAcquired'] ?? null,
            Cataloged: row['Cataloged'] ?? null,
            URL: row['URL'] ?? null,
            ImageURL: row['ImageURL'] ?? null,
            OnView: row['OnView'] ?? null,
        },
    }),

    // Classification -> used by artworkClassificationQuery
    classification: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        classification: row['Classification'] ?? null,
    }),

    // Department -> used by artworkDepartmentQuery
    department: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        department: row['Department'] ?? null,
    }),

    // Medium -> used by artworkMediumQuery
    medium: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        medium: row['Medium'] ?? null,
    }),

    // Dimensions -> used by artworkDimensionQuery
    dimensions: (row: Record<string, string>) => {
        const unparsedObject = {
            objectID: row['ObjectID'],
            dim: {
                circumference: row['Circumference (cm)']
                    ? parseFloat(row['Circumference (cm)'])
                    : null,
                depth: row['Depth (cm)'] ? parseFloat(row['Depth (cm)']) : null,
                diameter: row['Diameter (cm)']
                    ? parseFloat(row['Diameter (cm)'])
                    : null,
                height: row['Height (cm)']
                    ? parseFloat(row['Height (cm)'])
                    : null,
                length: row['Length (cm)']
                    ? parseFloat(row['Length (cm)'])
                    : null,
                weight: row['Weight (kg)']
                    ? parseFloat(row['Weight (kg)'])
                    : null,
                width: row['Width (cm)'] ? parseFloat(row['Width (cm)']) : null,
                seatHeight: row['Seat Height (cm)']
                    ? parseFloat(row['Seat Height (cm)'])
                    : null,
                durationSec: row['Duration (sec.)']
                    ? parseFloat(row['Duration (sec.)'])
                    : null,
            },
        };

        const objectID = row['ObjectID'];
        const dimensionKey = `${objectID}-dim`;
        // console.log(unparsedDimensions);
        const parsedDimensions = {
            ...unparsedObject,
            objectID, // For matching the Artwork node
            dimensionKey, // For merging the Dimension node
            dim: cleanNullValuesFromRow(unparsedObject.dim),
        };
        return parsedDimensions;
    },

    // OnView -> used by artworkOnViewQuery
    onView: (row: Record<string, string>) => ({
        objectID: row['ObjectID'],
        onViewLocation: row['OnView'] ?? null,
    }),
};
