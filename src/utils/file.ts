import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';

export const writeToJsonFile = async (data: string, filename: string) => {
    try {
        // Ensure the directory exists
        const directoryPath = path.dirname(filename);
        await mkdir(directoryPath, { recursive: true });

        await writeFile(filename, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Data successfully written to ${filename}`);
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }
};

export const readFromJsonFile = async (filename: string) => {
    const data = await readFile(filename, 'utf-8');
    return JSON.parse(data);
};

export const readFromFile = async (filename: string) => {
    return await readFile(filename, 'utf-8');
};
