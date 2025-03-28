import csvParser from 'csv-parser';
import { Neo4jConnection } from '../db';
import fs from 'fs';
import { normalizeKeys, processBatch } from '../lib/data';
import { BATCH_SIZE_TO_PROCESS } from '../constants';

type ParamMapping =
    | Record<string, (row: Record<string, string>) => any>
    | ((row: Record<string, string>) => any);

export async function loadCsvAndIngestData(
    csvFile: string,
    query: string,
    conn: Neo4jConnection,
    parameterMapping: ParamMapping
): Promise<void> {
    const rows: Record<string, string>[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFile)
            .pipe(csvParser())
            .on('data', (row) => {
                // Normalize all keys to consistent casing (if needed)
                const normalizedRow = normalizeKeys(row);
                rows.push(normalizedRow);
            })
            .on('end', async () => {
                try {
                    // Process the rows in batches to avoid large transactions
                    for (
                        let i = 0;
                        i < rows.length;
                        i += BATCH_SIZE_TO_PROCESS
                    ) {
                        const batch = rows.slice(i, i + BATCH_SIZE_TO_PROCESS);

                        const session = conn.driver.session();
                        try {
                            await session.executeWrite(async (tx) => {
                                await Promise.all(
                                    batch.map(async (row) => {
                                        let parameters: any;
                                        if (
                                            typeof parameterMapping ===
                                            'function'
                                        ) {
                                            parameters = parameterMapping(row);
                                        } else {
                                            parameters = Object.fromEntries(
                                                Object.entries(
                                                    parameterMapping
                                                ).map(([key, func]) => [
                                                    key,
                                                    func(row),
                                                ])
                                            );
                                        }
                                        console.log(
                                            'Final parameters:',
                                            parameters
                                        );
                                        if (parameters) {
                                            await tx.run(query, {
                                                rows: parameters,
                                            });
                                        }
                                    })
                                );
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
