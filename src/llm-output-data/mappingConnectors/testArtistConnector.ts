import { ArtistMappingsParameterMapping } from '../outputMappings/ArtistMappingsParameterMapping';

export const initialArtistConnector = (
    query: string
): keyof typeof ArtistMappingsParameterMapping => {
    // Define keywords to match mapping properties
    const mappingLookup: Record<
        string,
        keyof typeof ArtistMappingsParameterMapping
    > = {
        ConstituentID: 'coreProperties',
        DisplayName: 'coreProperties',
        ArtistBio: 'coreProperties',
        BeginDate: 'coreProperties',
        EndDate: 'coreProperties',
        HAS_CONSTITUENT_ID: 'coreProperties',
        HAS_BIO: 'artistBio',
        HAS_NATIONALITY: 'nationality',
        HAS_GENDER: 'gender',
        HAS_BEGIN_DATE: 'beginDate',
        HAS_END_DATE: 'endDate',
        HAS_WIKI_QID: 'wikiQID',
        HAS_ULAN: 'ulan',
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
