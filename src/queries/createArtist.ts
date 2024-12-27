export const createArtistQuery = `
UNWIND $rows AS row
MERGE (a:Artist {ConstituentID: row.ConstituentID})
  ON CREATE SET
    a.DisplayName = row.DisplayName,
    a.ArtistBio = row.ArtistBio,
    a.BeginDate = row.BeginDate,
    a.EndDate = row.EndDate
  ON MATCH SET
    a.DisplayName = row.DisplayName,
    a.ArtistBio = row.ArtistBio,
    a.BeginDate = row.BeginDate,
    a.EndDate = row.EndDate;
`;
