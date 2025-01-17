export const entityRelationshipsForArtworkMapping = {
    // Core Artwork properties that remain on the `Artwork` node
    coreProperties: (row: Record<string, string | null>) => ({
        objectID: row['ObjectID'],
        title: row['Title'],
        medium: row['Medium'] ?? null,
        accessionNumber: row['AccessionNumber'] ?? null,
        department: row['Department'] ?? null,
        cataloged: row['Cataloged'] ?? null,
        onView: row['OnView'] === 'true',
    }),

    classification: (row: Record<string, string | null>) => ({
        artworkID: row['ObjectID'],
        name: row['Classification'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_CLASSIFICATION',
        value: row['Classification'] ?? null,
    }),

    widthVal: (row: Record<string, string | null>) => ({
        artworkID: row['ObjectID'],
        name: row['WidthVal'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_WIDTH',
        value: row['WidthVal'] ?? null,
    }),

    heightVal: (row: Record<string, string | null>) => ({
        artworkID: row['ObjectID'],
        name: row['HeightVal'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_HEIGHT',
        value: row['HeightVal'] ?? null,
    }),

    depthVal: (row: Record<string, string | null>) => ({
        artworkID: row['ObjectID'],
        name: row['DepthVal'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DEPTH',
        value: row['DepthVal'] ?? null,
    }),

    dateAcquired: (row: Record<string, string | null>) => ({
        artworkID: row['ObjectID'],
        name: row['DateAcquired'] ?? null,
        entity: 'Artwork',
        relationship: 'HAS_DATE_ACQUIRED',
        value: row['DateAcquired'] ?? null,
    }),

    relationships: (row: Record<string, string | null>) => {
        const relationships: Record<string, any | null> = {
            HAS_CLASSIFICATION: row['Classification'] ?? null,
            HAS_WIDTH: row['WidthVal'] ?? null,
            HAS_HEIGHT: row['HeightVal'] ?? null,
            HAS_DEPTH: row['DepthVal'] ?? null,
            HAS_DATE_ACQUIRED: row['DateAcquired'] ?? null,
        };

        return Object.entries(relationships)
            .filter(([_, value]) => value !== null)
            .map(([relationship, value]) => ({
                artworkID: row['ObjectID'],
                name: row['Title'],
                value,
                relationship,
            }));
    },
};
