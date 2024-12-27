export const createArtworkQuery = `
MERGE (aw:Artwork {ObjectID: $artwork.ObjectID})
  ON CREATE SET
    aw.Title = $artwork.Title,
    aw.ArtistBio = $artwork.ArtistBio,
    aw.Date = $artwork.Date,
    aw.CreditLine = $artwork.CreditLine,
    aw.AccessionNumber = $artwork.AccessionNumber,
    aw.DateAcquired = $artwork.DateAcquired,
    aw.Cataloged = $artwork.Cataloged,
    aw.URL = $artwork.URL,
    aw.ImageURL = $artwork.ImageURL,
    aw.OnView = $artwork.OnView
  ON MATCH SET
    aw.Title = $artwork.Title,
    aw.ArtistBio = $artwork.ArtistBio,
    aw.Date = $artwork.Date,
    aw.CreditLine = $artwork.CreditLine,
    aw.AccessionNumber = $artwork.AccessionNumber,
    aw.DateAcquired = $artwork.DateAcquired,
    aw.Cataloged = $artwork.Cataloged,
    aw.URL = $artwork.URL,
    aw.ImageURL = $artwork.ImageURL,
    aw.OnView = $artwork.OnView
`;
