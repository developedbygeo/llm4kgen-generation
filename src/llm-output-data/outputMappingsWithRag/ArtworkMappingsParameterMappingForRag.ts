import { cleanNullValuesFromRow } from '../../lib/data';

export const ArtworkMappingsParameterMapping = {
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

    artist: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Artist'] ?? null,
        entity: 'Artwork',
        relationship: 'CREATED_BY_ARTIST',
        value: row['Artist'] ?? null,
    }),

    date: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Date'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DATE',
        value: row['Date'] ?? null,
    }),

    medium: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Medium'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_MEDIUM',
        value: row['Medium'] ?? null,
    }),

    creditLine: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['CreditLine'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_CREDIT_LINE',
        value: row['CreditLine'] ?? null,
    }),

    accessionNumber: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['AccessionNumber'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_ACCESSION_NUMBER',
        value: row['AccessionNumber'] ?? null,
    }),

    classification: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Classification'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_CLASSIFICATION',
        value: row['Classification'] ?? null,
    }),

    department: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Department'] ?? null,
        entity: 'Artwork',
        relationship: 'BELONGS_TO_DEPARTMENT',
        value: row['Department'] ?? null,
    }),

    dateAcquired: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['DateAcquired'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DATE_ACQUIRED',
        value: row['DateAcquired'] ?? null,
    }),

    cataloged: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Cataloged'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_CATALOGED_STATUS',
        value: row['Cataloged'] ?? null,
    }),

    objectID: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['ObjectID'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_OBJECT_ID',
        value: row['ObjectID'] ?? null,
    }),

    url: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['URL'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_URL',
        value: row['URL'] ?? null,
    }),

    imageURL: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['ImageURL'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_IMAGE_URL',
        value: row['ImageURL'] ?? null,
    }),

    onView: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['OnView'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_ON_VIEW_STATUS',
        value: row['OnView'] ?? null,
    }),

    circumference: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Circumference (cm)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_CIRCUMFERENCE',
        value: row['Circumference (cm)'] ?? null,
    }),

    depth: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Depth (cm)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DEPTH',
        value: row['Depth (cm)'] ?? null,
    }),

    diameter: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Diameter (cm)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DIAMETER',
        value: row['Diameter (cm)'] ?? null,
    }),

    height: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Height (cm)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_HEIGHT',
        value: row['Height (cm)'] ?? null,
    }),

    length: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Length (cm)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_LENGTH',
        value: row['Length (cm)'] ?? null,
    }),

    weight: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Weight (kg)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_WEIGHT',
        value: row['Weight (kg)'] ?? null,
    }),

    width: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Width (cm)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_WIDTH',
        value: row['Width (cm)'] ?? null,
    }),

    seatHeight: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Seat Height (cm)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_SEAT_HEIGHT',
        value: row['Seat Height (cm)'] ?? null,
    }),

    duration: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Duration (sec.)'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DURATION',
        value: row['Duration (sec.)'] ?? null,
    }),

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
};
