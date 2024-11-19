export const artworkParameterMapping = {
    ObjectID: (row: Record<string, string>) => row['ObjectID'],
    Title: (row: Record<string, string>) => row['Title'],
    ArtistBio: (row: Record<string, string>) => row['ArtistBio'],
    Nationality: (row: Record<string, string>) => row['Nationality'],
    BeginDate: (row: Record<string, string>) =>
        row['BeginDate'] ? parseInt(row['BeginDate']) : null,
    EndDate: (row: Record<string, string>) =>
        row['EndDate'] ? parseInt(row['EndDate']) : null,
    Gender: (row: Record<string, string>) => row['Gender'],
    Date: (row: Record<string, string>) => row['Date'],
    Medium: (row: Record<string, string>) => row['Medium'],
    Dimensions: (row: Record<string, string>) => row['Dimensions'],
    CreditLine: (row: Record<string, string>) => row['CreditLine'],
    AccessionNumber: (row: Record<string, string>) => row['AccessionNumber'],
    Classification: (row: Record<string, string>) => row['Classification'],
    Department: (row: Record<string, string>) => row['Department'],
    DateAcquired: (row: Record<string, string>) => row['DateAcquired'],
    Cataloged: (row: Record<string, string>) => row['Cataloged'],
    URL: (row: Record<string, string>) => row['URL'],
    ImageURL: (row: Record<string, string>) => row['ImageURL'],
    OnView: (row: Record<string, string>) => row['OnView'],
    Circumference_cm: (row: Record<string, string>) =>
        row['Circumference (cm)']
            ? parseFloat(row['Circumference (cm)'])
            : null,
    Depth_cm: (row: Record<string, string>) =>
        row['Depth (cm)'] ? parseFloat(row['Depth (cm)']) : null,
    Diameter_cm: (row: Record<string, string>) =>
        row['Diameter (cm)'] ? parseFloat(row['Diameter (cm)']) : null,
    Height_cm: (row: Record<string, string>) =>
        row['Height (cm)'] ? parseFloat(row['Height (cm)']) : null,
    Length_cm: (row: Record<string, string>) =>
        row['Length (cm)'] ? parseFloat(row['Length (cm)']) : null,
    Weight_kg: (row: Record<string, string>) =>
        row['Weight (kg)'] ? parseFloat(row['Weight (kg)']) : null,
    Width_cm: (row: Record<string, string>) =>
        row['Width (cm)'] ? parseFloat(row['Width (cm)']) : null,
    SeatHeight_cm: (row: Record<string, string>) =>
        row['Seat Height (cm)'] ? parseFloat(row['Seat Height (cm)']) : null,
    Duration_sec: (row: Record<string, string>) =>
        row['Duration (sec.)'] ? parseFloat(row['Duration (sec.)']) : null,
};
