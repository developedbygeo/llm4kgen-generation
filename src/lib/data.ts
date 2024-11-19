import { Neo4jConnection } from '../db';
import { sleep } from './time';

export const normalizeKeys = (
    row: Record<string, string>
): Record<string, string> => {
    const normalizedRow: Record<string, string> = {};
    Object.keys(row).forEach((key) => {
        const trimmedKey = key.trim();
        normalizedRow[trimmedKey] = row[key];
    });
    return normalizedRow;
};

export const processBatch = async (
    rowsBatch: Record<string, string>[],
    query: string,
    conn: Neo4jConnection,
    parameterMapping: Record<string, (row: Record<string, string>) => any>
) => {
    const session = conn.driver.session();
    try {
        await session.executeWrite(async (tx) => {
            for (const row of rowsBatch) {
                const parameters = Object.fromEntries(
                    Object.entries(parameterMapping).map(([key, func]) => [
                        key,
                        func(row),
                    ])
                );
                await tx.run(query, parameters);
            }
        });
    } finally {
        await session.close();
        await sleep(1000);
    }
};
