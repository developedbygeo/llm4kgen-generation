export const artworkRelationshipMapping: Record<string, string> = {
    // Each CSV column name => Relationship Type
    Artist: 'HAS_ARTIST',
    ArtistBio: 'HAS_ARTIST_BIO',
    ObjectID: 'HAS_OBJECT_ID',
    Nationality: 'HAS_NATIONALITY',
    Gender: 'HAS_GENDER',
    BeginDate: 'HAS_BEGIN_DATE',
    EndDate: 'HAS_END_DATE',
    Date: 'HAS_DATE',
    Medium: 'HAS_MEDIUM',
    Classification: 'HAS_CLASSIFICATION',
    Department: 'HAS_DEPARTMENT',
    'Circumference (cm)': 'HAS_CIRCUMFERENCE',
    'Depth (cm)': 'HAS_DEPTH',
    'Diameter (cm)': 'HAS_DIAMETER',
    'Height (cm)': 'HAS_HEIGHT',
    'Length (cm)': 'HAS_LENGTH',
    'Weight (kg)': 'HAS_WEIGHT',
    'Width (cm)': 'HAS_WIDTH',
    'Seat Height (cm)': 'HAS_SEAT_HEIGHT',
    'Duration (sec.)': 'HAS_DURATION',
    URL: 'HAS_URL',
    ImageURL: 'HAS_IMAGE_URL',
    Dimensions: 'HAS_DIMENSIONS',
    CreditLine: 'HAS_CREDIT_LINE',
    AccessionNumber: 'HAS_ACCESSION_NUMBER',
    DateAcquired: 'HAS_DATE_ACQUIRED',
    IsOnView: 'IS_ON_VIEW',
};

export const transformArtworkRow = (
    row: Record<string, string>
): Array<{
    name: string;
    objectID: string;
    relationship: string;
    value: string | number;
}> => {
    const results = [];

    // The 'Title' is used for the Artwork node's name
    const artworkName = row['Title'] || 'Unknown Artwork';

    const artworkObjectID = row['ObjectID'] || 'Unknown Object ID';

    for (const [key, rawValue] of Object.entries(row)) {
        // Skip if the key is for node identification
        if (key === 'ObjectID' || key === 'Title') continue;

        // Lookup the relationship type in the mapping
        const relationship = artworkRelationshipMapping[key];
        if (!relationship) continue;

        // Prepare final relationship value (numeric parse if needed)
        let finalValue: string | number = rawValue;
        if (
            [
                'BeginDate',
                'EndDate',
                'Depth (cm)',
                'Circumference (cm)',
                'Diameter (cm)',
                'Height (cm)',
                'Length (cm)',
                'Weight (kg)',
                'Width (cm)',
                'Seat Height (cm)',
                'Duration (sec.)',
            ].includes(key)
        ) {
            const parsed = parseFloat(rawValue);
            finalValue = Number.isNaN(parsed) ? rawValue : parsed;
        }

        // Build the relationship object
        results.push({
            name: artworkName,
            objectID: artworkObjectID,
            relationship,
            value: finalValue,
        });
    }

    return results;
};
