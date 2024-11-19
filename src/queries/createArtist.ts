export const createArtistQuery = `
MERGE (a:Artist {ConstituentID: $ConstituentID})
SET a.DisplayName = $DisplayName,
    a.ArtistBio = $ArtistBio,
    a.Nationality = $Nationality,
    a.Gender = $Gender,
    a.BeginDate = $BeginDate,
    a.EndDate = $EndDate,
    a.WikiQID = $WikiQID,
    a.ULAN = $ULAN
`;
