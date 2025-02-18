import { artworkParameterMapping } from '../mappings/artworkParameter';

export const identifyMappingPropertyForArtworkQuery = (
    query: string
): keyof typeof artworkParameterMapping => {
    // Define keywords to match mapping properties in `artworkParameterMapping`
    const mappingLookup: Record<string, keyof typeof artworkParameterMapping> =
        {
            // Core properties
            ObjectID: 'coreProperties',
            Title: 'coreProperties',
            Nationality: 'coreProperties',
            CreditLine: 'coreProperties',
            AccessionNumber: 'coreProperties',
            URL: 'coreProperties',
            ImageURL: 'coreProperties',

            // Relationship keys
            HAS_ARTIST: 'relationships',
            HAS_CONSTITUENT_ID: 'relationships',
            HAS_ARTIST_BIO: 'relationships',
            HAS_NATIONALITY: 'relationships',
            HAS_BEGIN_DATE: 'relationships',
            HAS_END_DATE: 'relationships',
            HAS_GENDER: 'relationships',
            HAS_DATE: 'relationships',
            HAS_MEDIUM: 'relationships',
            HAS_DIMENSIONS: 'relationships',
            HAS_CREDIT_LINE: 'relationships',
            HAS_ACCESSION_NUMBER: 'relationships',
            HAS_CLASSIFICATION: 'relationships',
            HAS_DEPARTMENT: 'relationships',
            HAS_DATE_ACQUIRED: 'relationships',
            HAS_CATALOGED: 'relationships',
            HAS_URL: 'relationships',
            HAS_IMAGE_URL: 'relationships',
            IS_ON_VIEW: 'relationships',
            HAS_CIRCUMFERENCE: 'relationships',
            HAS_DEPTH: 'relationships',
            HAS_DIAMETER: 'relationships',
            HAS_HEIGHT: 'relationships',
            HAS_LENGTH: 'relationships',
            HAS_WEIGHT: 'relationships',
            HAS_WIDTH: 'relationships',
            HAS_SEAT_HEIGHT: 'relationships',
            HAS_DURATION: 'relationships',

            // Dimensions
            'Circumference (cm)': 'dimensions',
            'Depth (cm)': 'dimensions',
            'Diameter (cm)': 'dimensions',
            'Height (cm)': 'dimensions',
            'Length (cm)': 'dimensions',
            'Weight (kg)': 'dimensions',
            'Width (cm)': 'dimensions',
            'Seat Height (cm)': 'dimensions',
            'Duration (sec.)': 'dimensions',

            Classification: 'classification',
            Department: 'department',
            Medium: 'medium',
            OnView: 'onView',
        };

    // Check the query for specific keywords
    for (const [keyword, property] of Object.entries(mappingLookup)) {
        if (query.includes(keyword)) {
            return property;
        }
    }

    // Default fallback if no match is found
    return 'relationships';
};
