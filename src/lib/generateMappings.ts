import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { sanitizePropertiesFromParentheses } from '../utils/string';

export const writeMappingsToFiles = async (data: any, outputDir: string) => {
    try {
        // Ensure the output directory exists
        await mkdir(outputDir, { recursive: true });

        // Process each entity and write its mappings to a file
        for (const entity of data) {
            const entityName = entity.entity; // For example, 'artist' or 'artwork'
            const filePath = path.join(
                outputDir,
                `${entityName}ParameterMapping.js`
            );

            // Create the content for the JS file
            let fileContent = `export const ${entityName}ParameterMapping = {\n`;

            // Add coreProperties if it exists
            if (entity.coreProperties) {
                fileContent += `    // Core ${entityName} properties\n`;
                fileContent += `    coreProperties: ${entity.coreProperties},\n\n`;
            }

            // Add attribute functions as methods of the exported object
            for (const [key, value] of Object.entries(entity)) {
                if (key !== 'entity' && key !== 'coreProperties') {
                    const cleanedKey = sanitizePropertiesFromParentheses(key); // Clean the key name
                    fileContent += `    // ${cleanedKey} -> used by ${entityName}${cleanedKey.replace(/ /g, '')}Query\n`;
                    fileContent += `    ${cleanedKey}: ${value},\n`;
                }
            }

            // Close the object
            fileContent += `};\n`;

            // Write the content to a file
            await writeFile(filePath, fileContent, 'utf-8');
            console.log(`Mappings for ${entityName} written to ${filePath}`);
        }
    } catch (error) {
        console.error('Error writing mappings to files:', error);
    }
};
