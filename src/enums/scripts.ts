export const RUNNABLE_SCRIPT_ENUM = {
    GENERATE_DB_INDICES: 'generateDbIndices',
} as const;

export const RUNNABLE_SCRIPT_TITLE_ENUM = {
    GENERATE_DB_INDICES: 'Create DB indices',
} as const;

export const RUNNABLE_SCRIPT_DESCRIPTION_ENUM = {
    GENERATE_DB_INDICES:
        'Create indices for the database based on the provided CSV files by invoking a dynamic tool that generates the Cypher queries for creating the indices.',
} as const;
