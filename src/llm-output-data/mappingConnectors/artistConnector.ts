import { artistParameterMapping } from '../mappings/artistParameter';

export const identifyMappingPropertyForArtistQuery = (
    query: string
): keyof typeof artistParameterMapping => {
    // Define keywords to match mapping properties
    const mappingLookup: Record<string, keyof typeof artistParameterMapping> = {
        ConstituentID: 'coreProperties',
        DisplayName: 'coreProperties',
        ArtistBio: 'coreProperties',
        BeginDate: 'coreProperties',
        EndDate: 'coreProperties',
        HAS_CONSTITUENT_ID: 'relationships',
        HAS_BIO: 'relationships',
        HAS_NATIONALITY: 'nationality',
        HAS_GENDER: 'gender',
        HAS_BEGIN_DATE: 'relationships',
        HAS_END_DATE: 'relationships',
        HAS_WIKI_QID: 'references',
        HAS_ULAN: 'references',
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
