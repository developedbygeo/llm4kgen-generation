const relationshipMapping: Record<string, string> = {
    ConstituentID: 'HAS_CONSTITUENT_ID',
    ArtistBio: 'HAS_BIO',
    Nationality: 'HAS_NATIONALITY',
    Gender: 'HAS_GENDER',
    BeginDate: 'HAS_BEGIN_DATE',
    EndDate: 'HAS_END_DATE',
    'Wiki QID': 'HAS_WIKI_QID',
    ULAN: 'HAS_ULAN',
};

export const transformArtistRow = (
    row: Record<string, string>
): Record<string, any>[] => {
    const results: Record<string, any>[] = [];

    const artistName = row['DisplayName'] || 'Unknown';

    // Iterate over each column in the row
    for (const [key, value] of Object.entries(row)) {
        // Skip if this is the DisplayName column; it's not a relationship
        if (key === 'DisplayName') continue;

        const relationship = relationshipMapping[key];
        if (relationship) {
            let relationshipValue: string | number = value;
            if (['BeginDate', 'EndDate'].includes(key)) {
                relationshipValue = parseInt(value, 10) || 0;
            }

            // Build the dynamic relationship object
            results.push({
                name: artistName,
                relationship, // e.g., 'HAS_BIO'
                value: relationshipValue, // e.g., 'American, 1930–1992'
            });
        }
    }

    return results;
};
