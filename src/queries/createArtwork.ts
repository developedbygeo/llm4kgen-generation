export const createArtworkQuery = `
UNWIND $rows AS row
MERGE (aw:Artwork {ObjectID: row.artwork.ObjectID})
  ON CREATE SET
    aw.Title = row.artwork.Title,
    aw.ArtistBio = row.artwork.ArtistBio,
    aw.Date = row.artwork.Date,
    aw.CreditLine = row.artwork.CreditLine,
    aw.AccessionNumber = row.artwork.AccessionNumber,
    aw.DateAcquired = row.artwork.DateAcquired,
    aw.Cataloged = row.artwork.Cataloged,
    aw.URL = row.artwork.URL,
    aw.ImageURL = row.artwork.ImageURL,
    aw.OnView = row.artwork.OnView
  ON MATCH SET
    aw.Title = row.artwork.Title,
    aw.ArtistBio = row.artwork.ArtistBio,
    aw.Date = row.artwork.Date,
    aw.CreditLine = row.artwork.CreditLine,
    aw.AccessionNumber = row.artwork.AccessionNumber,
    aw.DateAcquired = row.artwork.DateAcquired,
    aw.Cataloged = row.artwork.Cataloged,
    aw.URL = row.artwork.URL,
    aw.ImageURL = row.artwork.ImageURL,
    aw.OnView = row.artwork.OnView
`;
