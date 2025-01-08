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
export const constructPromptForRelationshipIdentification = (
    processedFiles: ProcessedFile[]
) => {
    const promptBody = processedFiles
        .map((file) => {
            const { fileIdentifier, headers, data } = file;

            return `
    For the "${fileIdentifier}" file:
      - The data contains the following properties:
      ${headers.map((header) => `    - ${header}`).join('\n')}
    
    Please identify all relationships between entities in the data. 
    - The "name" of each entity is the value from the first column (e.g., DisplayName for artists, Title for artworks).
    - The "value" should correspond to the corresponding value in the data for the given attribute (e.g., Seat Height, Duration, Nationality).

    Return the relationships in the following JSON format:
    {
      "entity": (type of entity), 
      "name": (name of entity from first column), 
      "relationship": (relationship type based on entity and attribute),
      "attribute": (attribute name),
      "value": (attribute value)
    }
    The relationships should be returned as a JSON array, one object per relationship.
    `;
        })
        .join('\n');

    return `
    You are a knowledge extraction agent. Your task is to identify relationships between data from multiple CSV files. Each file has distinct entities, such as "artists" and "artworks," and relationships between their properties.
    
    ${promptBody}
    
    Based on the above data, please identify all relationships and return them in the following JSON format:
    [
      {
        "entity": (type of entity), 
        "name": (name of entity from the first column), 
        "relationship": (relationship type based on entity and attribute),
        "attribute": (attribute name),
        "value": (attribute value)
      }
      // Add more relationships here as identified.
    ]
    Do not include any additional text or context, only the JSON.
    `;
};
