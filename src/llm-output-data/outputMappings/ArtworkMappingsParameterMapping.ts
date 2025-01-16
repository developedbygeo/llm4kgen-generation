export const ArtworkMappingsParameterMapping = {
    title: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Title'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_TITLE',
        value: row['Title'] ?? null,
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

    dimensions: (row: Record<string, string | null>) => ({
        objectID: row['objectID'],
        name: row['Dimensions'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DIMENSIONS',
        value: row['Dimensions'] ?? null,
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
};
