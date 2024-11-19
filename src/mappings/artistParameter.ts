export const artistParameterMapping = {
    ConstituentID: (row: Record<string, string>) => row['ConstituentID'],
    DisplayName: (row: Record<string, string>) => row['DisplayName'],
    ArtistBio: (row: Record<string, string>) => row['ArtistBio'],
    Nationality: (row: Record<string, string>) => row['Nationality'],
    Gender: (row: Record<string, string>) => row['Gender'],
    BeginDate: (row: Record<string, string>) =>
        row['BeginDate'] ? parseInt(row['BeginDate']) : null,
    EndDate: (row: Record<string, string>) =>
        row['EndDate'] ? parseInt(row['EndDate']) : null,
    WikiQID: (row: Record<string, string>) => row['Wiki QID'],
    ULAN: (row: Record<string, string>) => row['ULAN'],
};
