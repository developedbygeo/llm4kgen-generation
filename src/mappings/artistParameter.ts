export const artistParameterMapping = {
    // Core Artist properties that stay on the `Artist` node
    coreProperties: (row: Record<string, string>) => ({
        ConstituentID: row['ConstituentID'],
        DisplayName: row['DisplayName'],
        ArtistBio: row['ArtistBio'] ?? null,
        BeginDate: row['BeginDate'] ? parseInt(row['BeginDate']) : null,
        EndDate: row['EndDate'] ? parseInt(row['EndDate']) : null,
    }),

    // These are used to create separate nodes or relationships:
    nationality: (row: Record<string, string>) => ({
        artistID: row['ConstituentID'],
        nationality: row['Nationality'] ?? null,
    }),
    gender: (row: Record<string, string>) => ({
        artistID: row['ConstituentID'],
        gender: row['Gender'] ?? null,
    }),

    // References (e.g., WikiData, ULAN)
    // could be stored as properties or related reference nodes
    references: (row: Record<string, string>) => ({
        artistID: row['ConstituentID'],
        references: {
            WikiQID: row['Wiki QID'] ?? null,
            ULAN: row['ULAN'] ?? null,
        },
    }),
};
