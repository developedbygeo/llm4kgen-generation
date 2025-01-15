import fs from 'fs';
import csv from 'csv-parser';
import { CsvRow } from '../types/data';
import {
    FileToBatchAndProcess,
    ProcessedFile,
} from '../types/identifyRelationships';

export const extractFirstTwoRows = async (
    filePath: string,
    fileIdentifier: string
) => {
    return new Promise((resolve, reject) => {
        const results: CsvRow[] = [];

        // Read the CSV file
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: CsvRow) => {
                if (results.length < 2) {
                    results.push(data);
                }
            })
            .on('end', () => {
                if (results.length < 2) {
                    reject('CSV file does not contain enough rows.');
                } else {
                    // Convert headers to comma-separated string
                    const headers = Object.keys(results[0]).join(',');
                    // Convert data to comma-separated string
                    const data = Object.values(results[1]).join(',');
                    // Return the file identifier (eg artists), headers and data
                    resolve(
                        `${fileIdentifier}\nheaders: ${headers}\ndata: ${data}`
                    );
                }
            })
            .on('error', (error: Error) => {
                reject(error);
            });
    });
};

// takes the first two rows of a CSV file and returns the headers and the first row
export const processCsvLines = (result: string): ProcessedFile => {
    const [fileIdentifier, headersPart, dataPart] = result.split('\n');

    const headers = headersPart.replace('headers: ', '').split(','); // Split headers by comma
    const data = dataPart.replace('data: ', '').split(','); // Split data by comma

    return { fileIdentifier, headers, data };
};

export const batchFilesToProcess = async (
    files: FileToBatchAndProcess[]
): Promise<string> => {
    const results = await Promise.all(
        files.map((file) => extractFirstTwoRows(file.path, file.identifier))
    );

    return JSON.stringify(results);
};
