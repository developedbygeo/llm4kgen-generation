import csvParser from 'csv-parser';
import { Neo4jConnection } from '../db';
import fs from 'fs';
import { normalizeKeys, processBatch } from '../lib/data';
import { BATCH_SIZE_TO_PROCESS } from '../constants';
import { logBigMessage } from '../utils/console';
import { transformRowDynamicallyForCypherQueries } from '../transformers';
import { EntityToProcess } from '../types/general';

type ParamMapping =
    | Record<string, (row: Record<string, string>) => any>
    | ((row: Record<string, string>) => any);

export async function loadCsvAndIngestDataForTool(
    csvFile: string,
    query: string,
    conn: Neo4jConnection,
    parameterMapping: ParamMapping,
    entity: EntityToProcess
): Promise<void> {
    const rows: Record<string, string>[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFile)
            .pipe(csvParser())
            .on('data', (rawRow) => {
                // Normalize all keys to consistent casing (if needed)
                const normalizedRow = normalizeKeys(rawRow);
                rows.push(normalizedRow);
            })
            .on('end', async () => {
                try {
                    for (
                        let i = 0;
                        i < rows.length;
                        i += BATCH_SIZE_TO_PROCESS
                    ) {
                        const batch = rows.slice(i, i + BATCH_SIZE_TO_PROCESS);

                        // Dynamically transform the batch rows into { name, relationship, value } objects
                        const transformedRows =
                            transformRowDynamicallyForCypherQueries(
                                entity,
                                batch
                            );

                        const session = conn.driver.session();

                        try {
                            await session.executeWrite(async (tx) => {
                                if (transformedRows.length > 0) {
                                    // Each query must UNWIND over `rows`
                                    await tx.run(query, {
                                        rows: transformedRows,
                                    });
                                    // console.log(transformedRows);
                                }
                            });
                        } finally {
                            await session.close();
                        }
                    }
                    logBigMessage('SUCCESSFULLY LOADED DATA');
                    resolve();
                } catch (error) {
                    logBigMessage('ERROR LOADING DATA');
                    console.log(error);
                    reject(error);
                }
            })
            .on('error', reject);
    });
}
