/**
 * relationshipParameter.ts
 *
 * This file provides mapping functions for extracting data from CSV rows
 * in order to build relationships in Neo4j. Each function returns the
 * fields needed to MERGE the nodes involved and create the desired relationship.
 */

export const relationshipParameterMapping = {
    /**
     * Maps to the "CREATED" relationship: (Artist)-[:CREATED]->(Artwork)
     *
     * Requires two fields from the CSV:
     *  - "ConstituentID" (to find the correct Artist)
     *  - "ObjectID"      (to find the correct Artwork)
     */
    createdRelationship: (row: Record<string, string>) => ({
        ConstituentID: row['ConstituentID'],
        ObjectID: row['ObjectID'],
    }),

    /**
     * Maps to the "HAS_NATIONALITY" relationship: (Artist)-[:HAS_NATIONALITY]->(Nationality)
     *
     * The CSV row should contain a "Nationality" field. You would first MERGE
     * the (:Nationality {name: ...}) node, then MERGE the relationship:
     * (artist)-[:HAS_NATIONALITY]->(nationalityNode).
     */
    hasNationality: (row: Record<string, string>) => row['Nationality'] ?? null,

    /**
     * Maps to the "HAS_GENDER" relationship: (Artist)-[:HAS_GENDER]->(Gender)
     *
     * The CSV row should contain a "Gender" field. You would first MERGE
     * the (:Gender {label: ...}) node, then MERGE the relationship:
     * (artist)-[:HAS_GENDER]->(genderNode).
     */
    hasGender: (row: Record<string, string>) => row['Gender'] ?? null,

    /**
     * Maps to the "HAS_REFERENCE" relationship: (Artist)-[:HAS_REFERENCE]->(Reference)
     *
     * In your CSV, "Wiki QID" and "ULAN" may appear. You could store them as
     * properties of a single :Reference node or create separate reference nodes
     * for each type.
     *
     * Example usage:
     * MERGE (r:Reference { source: "WikiData", id: WikiQID })
     * MERGE (a)-[:HAS_REFERENCE]->(r)
     */
    references: (row: Record<string, string>) => ({
        WikiQID: row['Wiki QID'] ?? null,
        ULAN: row['ULAN'] ?? null,
    }),

    /**
     * Maps to the "BELONGS_TO_CLASSIFICATION" relationship: (Artwork)-[:BELONGS_TO_CLASSIFICATION]->(Classification)
     *
     * The CSV row should contain a "Classification" field. You would first MERGE
     * the (:Classification {name: ...}) node, then MERGE the relationship:
     * (artwork)-[:BELONGS_TO_CLASSIFICATION]->(classificationNode).
     */
    belongsToClassification: (row: Record<string, string>) =>
        row['Classification'] ?? null,

    /**
     * Maps to the "BELONGS_TO_DEPARTMENT" relationship: (Artwork)-[:BELONGS_TO_DEPARTMENT]->(Department)
     *
     * The CSV row should contain a "Department" field. You would first MERGE
     * the (:Department {name: ...}) node, then MERGE the relationship:
     * (artwork)-[:BELONGS_TO_DEPARTMENT]->(departmentNode).
     */
    belongsToDepartment: (row: Record<string, string>) =>
        row['Department'] ?? null,

    /**
     * Maps to the "HAS_MEDIUM" relationship: (Artwork)-[:HAS_MEDIUM]->(Medium)
     *
     * The CSV row should contain a "Medium" field. You would first MERGE
     * the (:Medium {name: ...}) node, then MERGE the relationship:
     * (artwork)-[:HAS_MEDIUM]->(mediumNode).
     */
    hasMedium: (row: Record<string, string>) => row['Medium'] ?? null,

    /**
     * Maps to the "HAS_DIMENSION" relationship: (Artwork)-[:HAS_DIMENSION]->(Dimension)
     *
     * The CSV row contains multiple dimension fields:
     *   "Circumference (cm)", "Depth (cm)", "Diameter (cm)", "Height (cm)",
     *   "Length (cm)", "Weight (kg)", "Width (cm)", "Seat Height (cm)", "Duration (sec.)"
     *
     * We'll combine them into one object. You can then MERGE a single (:Dimension)
     * node with these properties, and MERGE the relationship to Artwork.
     */
    hasDimension: (row: Record<string, string>) => ({
        circumference_cm: row['Circumference (cm)']
            ? parseFloat(row['Circumference (cm)'])
            : null,
        depth_cm: row['Depth (cm)'] ? parseFloat(row['Depth (cm)']) : null,
        diameter_cm: row['Diameter (cm)']
            ? parseFloat(row['Diameter (cm)'])
            : null,
        height_cm: row['Height (cm)'] ? parseFloat(row['Height (cm)']) : null,
        length_cm: row['Length (cm)'] ? parseFloat(row['Length (cm)']) : null,
        weight_kg: row['Weight (kg)'] ? parseFloat(row['Weight (kg)']) : null,
        width_cm: row['Width (cm)'] ? parseFloat(row['Width (cm)']) : null,
        seatHeight_cm: row['Seat Height (cm)']
            ? parseFloat(row['Seat Height (cm)'])
            : null,
        duration_sec: row['Duration (sec.)']
            ? parseFloat(row['Duration (sec.)'])
            : null,
    }),

    /**
     * (Optional) If you store "OnView" as a location-based relationship like:
     * (Artwork)-[:ON_VIEW_AT]->(Location {name: "Gallery XXX"})
     *
     * You can do something like this:
     */
    onViewAt: (row: Record<string, string>) => row['OnView'] ?? null,
};
