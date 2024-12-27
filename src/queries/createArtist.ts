export const createArtistQuery = `
MERGE (a:Artist {ConstituentID: $ConstituentID})
  ON CREATE SET
    a.DisplayName = $DisplayName,
    a.ArtistBio = $ArtistBio,
    a.BeginDate = $BeginDate,
    a.EndDate = $EndDate
  ON MATCH SET
    a.DisplayName = $DisplayName,
    a.ArtistBio = $ArtistBio,
    a.BeginDate = $BeginDate,
    a.EndDate = $EndDate;
`;
