export const artistParameterMapping = {
    // Core Artist properties that remain on the `Artist` node
    coreProperties: (row: Record<string, string>) => ({
        constituentID: row['ConstituentID'],
        name: row['DisplayName'], // Ensure `name` is included
        artistBio: row['ArtistBio'] ?? null,
        beginDate: row['BeginDate'] ? parseInt(row['BeginDate'], 10) : null,
        endDate: row['EndDate'] ? parseInt(row['EndDate'], 10) : null,
    }),

    // Nationality relationship
    nationality: (row: Record<string, string>) => ({
        artistID: row['ConstituentID'],
        name: row['DisplayName'], // Ensure `name` is included
        value: row['Nationality'] ?? null,
        relationship: 'HAS_NATIONALITY',
    }),

    // Gender relationship
    gender: (row: Record<string, string>) => ({
        artistID: row['ConstituentID'],
        name: row['DisplayName'], // Ensure `name` is included
        value: row['Gender'] ?? null,
        relationship: 'HAS_GENDER',
    }),

    // References for external IDs (Wiki QID, ULAN)
    references: (row: Record<string, string>) => ({
        artistID: row['ConstituentID'],
        name: row['DisplayName'], // Ensure `name` is included
        wikiQID: row['Wiki QID'] ?? null,
        ulan: row['ULAN'] ?? null,
        relationship: 'HAS_REFERENCE',
    }),

    // Relationships based on the Cypher queries
    relationships: (row: Record<string, string>) => {
        const relationships: Record<string, any | null> = {
            HAS_CONSTITUENT_ID: row['ConstituentID'] ?? null,
            HAS_BIO: row['ArtistBio'] ?? null,
            HAS_NATIONALITY: row['Nationality'] ?? null,
            HAS_GENDER: row['Gender'] ?? null,
            HAS_BEGIN_DATE: row['BeginDate']
                ? parseInt(row['BeginDate'], 10)
                : null,
            HAS_END_DATE: row['EndDate'] ? parseInt(row['EndDate'], 10) : null,
            HAS_WIKI_QID: row['Wiki QID'] ?? null,
            HAS_ULAN: row['ULAN'] ?? null,
        };

        return Object.entries(relationships)
            .filter(([_, value]) => value !== null)
            .map(([relationship, value]) => ({
                artistID: row['ConstituentID'],
                name: row['DisplayName'], // Ensure `name` is included
                value,
                relationship,
            }));
    },
};
