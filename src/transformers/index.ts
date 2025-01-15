import { EntityToProcess } from '../types/general';
import { transformArtistRow } from './artist';
import { transformArtworkRow } from './artwork';

export const transformRowDynamicallyForCypherQueries = (
    entity: EntityToProcess,
    rows: Record<string, string>[]
) => {
    const transformed: Record<string, any>[] = [];
    for (const row of rows) {
        const rowRelationships =
            entity === 'artist'
                ? transformArtistRow(row)
                : transformArtworkRow(row);
        transformed.push(...rowRelationships);
    }
    return transformed;
};
