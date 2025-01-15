import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export const writeMappingsToFiles = async (
    data: Record<string, Record<string, any>>,
    outputDir: string
) => {
    try {
        console.log('Starting writeMappingsToFiles...');
        console.log('Output directory:', outputDir);

        // Ensure the output directory exists
        await mkdir(outputDir, { recursive: true });

        // Process each entity (e.g., Artist, Artwork)
        for (const [entityName, attributes] of Object.entries(data)) {
            const filePath = path.join(
                outputDir,
                `${entityName}ParameterMapping.ts`
            );
            console.log(
                `Processing entity: ${entityName}, writing to: ${filePath}`
            );

            let fileContent = `export const ${entityName}ParameterMapping = {\n`;

            // Process each attribute in the entity
            for (const [attributeName, attributeDetails] of Object.entries(
                attributes
            )) {
                fileContent += `    ${attributeName}: (row: Record<string, string | null>) => ({\n`;
                fileContent += `        name: row['${attributeDetails.name}'] ?? null,\n`;
                fileContent += `        entity: '${attributeDetails.entity}',\n`;
                fileContent += `        relationship: '${attributeDetails.relationship}',\n`;
                fileContent += `        value: row['${attributeDetails.value}'] ?? null,\n`;
                fileContent += `    }),\n\n`;
            }

            // Close the mapping object
            fileContent += `};\n`;

            // Write the file
            await writeFile(filePath, fileContent, 'utf-8');
            console.log(`File written successfully: ${filePath}`);
        }

        console.log('All mappings written successfully.');
    } catch (error) {
        console.error('Error writing mappings to files:', error);
    }
};
