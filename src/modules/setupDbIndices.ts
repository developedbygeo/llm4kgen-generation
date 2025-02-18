import {
    createDbIndicesTool,
    createDbIndicesToolWithOntologyRAG,
} from '../agent/tools/createDbIndices';
import { Neo4jConnection } from '../db';
import { CreateDbIndexQueryItem } from '../types/createDbIndices';
import { logBigMessage } from '../utils/console';

export const setupDbIndices = async (
    conn: Neo4jConnection,
    filesString: string,
    useOwlRag: boolean = false
) => {
    const session = conn.driver.session();
    let dbIndices: CreateDbIndexQueryItem[] = [];

    if (useOwlRag) {
        dbIndices = JSON.parse(await createDbIndicesTool.invoke(filesString));
    } else {
        dbIndices = JSON.parse(
            await createDbIndicesToolWithOntologyRAG.invoke(filesString)
        );
    }

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
