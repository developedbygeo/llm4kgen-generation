import fs from 'fs';
import path from 'path';
import readline from 'readline';

async function copyFirst20LinesToCsv(
    sourceCsvPath: string,
    targetCsvPath: string
): Promise<void> {
    return new Promise((resolve, reject) => {
        // Ensure the target directory exists
        const targetDir = path.dirname(targetCsvPath);
        fs.mkdirSync(targetDir, { recursive: true });

        // Create the write stream for the target CSV
        const writeStream = fs.createWriteStream(targetCsvPath, {
            encoding: 'utf-8',
        });

        // Create the read stream and readline interface for the source CSV
        const readStream = fs.createReadStream(sourceCsvPath, {
            encoding: 'utf-8',
        });
        const rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity,
        });

        let lineCount = 0;

        rl.on('line', (line) => {
            if (lineCount < 20) {
                writeStream.write(line + '\n');
                lineCount++;
            }
            if (lineCount === 20) {
                rl.close(); // Close the readline interface after 20 lines
            }
        });

        rl.on('close', () => {
            writeStream.end(); // End the write stream only when reading is fully closed
            resolve();
        });

        rl.on('error', (err) => {
            writeStream.end();
            reject(err);
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
}

// Example usage (if in the same file, remove the "export" above):
(async () => {
    const dataDir = path.resolve(__dirname, '../data'); // Resolves the `data` folder relative to this script
    const sourceArtistCsvPath = path.join(dataDir, 'Artists.csv'); // Full path to Artists.csv
    const sourceArtworksCsvPath = path.join(dataDir, 'Artworks.csv'); // Full path to Artworks.csv
    const targetDir = path.join(dataDir, 'new-small'); // Target directory for the new files

    try {
        console.log(`Source Artists CSV Path: ${sourceArtistCsvPath}`);
        console.log(`Source Artworks CSV Path: ${sourceArtworksCsvPath}`);

        // Copy the first 20 lines from Artists.csv
        const targetArtistCsvPath = path.join(targetDir, 'Artists.csv');
        await copyFirst20LinesToCsv(sourceArtistCsvPath, targetArtistCsvPath);
        console.log(`Copied first 20 lines to: ${targetArtistCsvPath}`);

        // Copy the first 20 lines from Artworks.csv
        const targetArtworksCsvPath = path.join(targetDir, 'Artworks.csv');
        await copyFirst20LinesToCsv(
            sourceArtworksCsvPath,
            targetArtworksCsvPath
        );
        console.log(`Copied first 20 lines to: ${targetArtworksCsvPath}`);
    } catch (err) {
        console.error('Error writing CSV:', err);
    }
})();
