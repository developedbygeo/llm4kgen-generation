import csvParser from 'csv-parser';
import { Neo4jConnection } from '../db';
import fs from 'fs';
import { normalizeKeys, processBatch } from '../lib/data';
import { BATCH_SIZE_TO_PROCESS } from '../constants';

export async function loadCsvAndIngestData(
    csvFile: string,
    query: string,
    conn: Neo4jConnection,
    parameterMapping: Record<string, (row: Record<string, string>) => any>
): Promise<void> {
    const rows: Record<string, string>[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFile)
            .pipe(csvParser())
            .on('data', (row) => {
                const normalizedRow = normalizeKeys(row);
                rows.push(normalizedRow);
            })
            .on('end', async () => {
                try {
                    // Process rows in batches
                    for (
                        let i = 0;
                        i < rows.length;
                        i += BATCH_SIZE_TO_PROCESS
                    ) {
                        const batch = rows.slice(i, i + BATCH_SIZE_TO_PROCESS);
                        const session = conn.driver.session();
                        try {
                            await session.executeWrite(async (tx) => {
                                for (const row of batch) {
                                    const parameters = Object.fromEntries(
                                        Object.entries(parameterMapping).map(
                                            ([key, func]) => [key, func(row)]
                                        )
                                    );
                                    await tx.run(query, parameters);
                                }
                            });
                        } finally {
                            await session.close();
                        }
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject);
    });
}
