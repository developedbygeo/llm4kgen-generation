import { createDbIndicesTool } from '../agent/tools/createDbIndices';
import { Neo4jConnection } from '../db';
import { CreateDbIndexQueryItem } from '../types/createDbIndices';
import { logBigMessage } from '../utils/console';

export const setupDbIndices = async (
    conn: Neo4jConnection,
    filesString: string
) => {
    const session = conn.driver.session();
    const dbIndices: Awaited<CreateDbIndexQueryItem[]> = JSON.parse(
        await createDbIndicesTool.invoke(filesString)
    );

    console.log(dbIndices);
    logBigMessage('Creating indices...');

    try {
        await session.executeWrite((tx) =>
            Promise.all(dbIndices.map((index) => tx.run(index.query)))
        );

        logBigMessage('Database indices created successfully.');
    } catch (error) {
        console.error('Error creating indices:', error);
    } finally {
        await session.close();
    }
};
