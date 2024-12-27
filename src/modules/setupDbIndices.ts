import { Neo4jConnection } from '../db';
import { logBigMessage } from '../utils/console';

export const setupDbIndices = async (conn: Neo4jConnection) => {
    const session = conn.driver.session();
    try {
        await session.executeWrite((tx) =>
            Promise.all([
                tx.run(
                    'CREATE INDEX artist_constituent_id IF NOT EXISTS FOR (a:Artist) ON (a.ConstituentID);'
                ),
                tx.run(
                    'CREATE INDEX reference_id_source IF NOT EXISTS FOR (ref:Reference) ON (ref.id, ref.source);'
                ),
                tx.run(
                    'CREATE INDEX artwork_object_id IF NOT EXISTS FOR (aw:Artwork) ON (aw.ObjectID);'
                ),
                tx.run(
                    'CREATE INDEX department_name IF NOT EXISTS FOR (d:Department) ON (d.name);'
                ),
                tx.run(
                    'CREATE INDEX location_name IF NOT EXISTS FOR (loc:Location) ON (loc.name);'
                ),
                tx.run(
                    'CREATE INDEX dimension_composite IF NOT EXISTS FOR (dim:Dimension) ON (dim.height, dim.width);'
                ),
            ])
        );

        logBigMessage('Indices created successfully.');
    } catch (error) {
        console.error('Error creating indices:', error);
    } finally {
        await session.close();
    }
};
