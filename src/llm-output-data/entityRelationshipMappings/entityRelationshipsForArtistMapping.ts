export const entityRelationshipsForArtistMapping = {
    // Core Artist properties that remain on the `Artist` node
    coreProperties: (row: Record<string, string | null>) => ({
        constituentID: row['ConstituentID'],
        name: row['DisplayName'], // Ensure `name` is included
        artistBio: row['ArtistBio'] ?? null,
        beginDate: row['BeginDate'] ? parseInt(row['BeginDate'], 10) : null,
        endDate: row['EndDate'] ? parseInt(row['EndDate'], 10) : null,
        nationality: row['Nationality'] ?? null,
        'Wiki QID': row['Wiki QID'] ?? null,
        ULAN: row['ULAN'] ?? null,
    }),

    nationality: (row: Record<string, string | null>) => ({
        artistID: row['ConstituentID'],
        name: row['Nationality'] ?? null,
        entity: 'Artist',
        relationship: 'HAS_NATIONALITY',
        value: row['Nationality'] ?? null,
    }),

    gender: (row: Record<string, string | null>) => ({
        artistID: row['ConstituentID'],
        name: row['Gender'] ?? null,
        entity: 'Artist',
        relationship: 'HAS_GENDER',
        value: row['Gender'] ?? null,
    }),

    beginDate: (row: Record<string, string | null>) => ({
        artistID: row['ConstituentID'],
        name: row['BeginDate'] ?? null,
        entity: 'Artist',
        relationship: 'HAS_BEGIN_DATE',
        value: row['BeginDate'] ?? null,
    }),

    endDate: (row: Record<string, string | null>) => ({
        artistID: row['ConstituentID'],
        name: row['EndDate'] ?? null,
        entity: 'Artist',
        relationship: 'HAS_END_DATE',
        value: row['EndDate'] ?? null,
    }),

    artistBio: (row: Record<string, string | null>) => ({
        artistID: row['ConstituentID'],
        name: row['ArtistBio'] ?? null,
        entity: 'Artist',
        relationship: 'HAS_BIOGRAPHY',
        value: row['ArtistBio'] ?? null,
    }),

    wikiQID: (row: Record<string, string | null>) => ({
        artistID: row['ConstituentID'],
        name: row['Wiki QID'] ?? null,
        entity: 'Artist',
        relationship: 'HAS_WIKI_QID',
        value: row['Wiki QID'] ?? null,
    }),

    ulan: (row: Record<string, string | null>) => ({
        artistID: row['ConstituentID'],
        name: row['ULAN'] ?? null,
        entity: 'Artist',
        relationship: 'HAS_ULAN',
        value: row['ULAN'] ?? null,
    }),

    relationships: (row: Record<string, string | null>) => {
        const relationships: Record<string, any | null> = {
            HAS_CONSTITUENT_ID: row['ConstituentID'] ?? null,
            HAS_BIOGRAPHY: row['ArtistBio'] ?? null,
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
                name: row['DisplayName'],
                value,
                relationship,
            }));
    },
};
