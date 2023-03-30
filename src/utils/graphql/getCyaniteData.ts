const getCyaniteData = (id: number) => {
  const data = JSON.stringify({
    query: `
      query LibraryTrackQuery($id: ID!) {
        libraryTrack(id: $id) {
          __typename
          ... on LibraryTrack {
            audioAnalysisV6 {
              __typename
              ... on AudioAnalysisV6Finished {
                result {
                  bpmRangeAdjusted
                  mood {
                    aggressive
                    calm
                    chilled
                    dark
                    energetic
                    epic
                    happy
                    romantic
                    sad
                    scary
                    sexy
                    ethereal
                    uplifting
                  }
                  genreTags
                  subgenreTags
                  moodAdvancedTags
                  keyPrediction {
                    value
                    confidence
                  }
                  emotionalProfile
                  musicalEraTag
                  transformerCaption
                }
              }
            }
          }
        }
      }
      `,
    variables: {
      id: id,
    },
  });
  return fetch('https://api.cyanite.ai/graphql', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' +
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjo0NzQsInVzZXJJZCI6MTY2NDMsImFjY2Vzc1Rva2VuU2VjcmV0IjoiYmNmYjE4YWIzNGE5YTA5NWJjYmI4YTQ1MTkyN2NlNmRjNTdlMjI3ZjNjMmI2YzczMDgyODljYTY0MjZjYTdjMyIsImlhdCI6MTY3OTcwNjU2Mn0.oBonXhDpVkFRWHlk-etjvCU3fMFRCApxRIzAjVMAMWU`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      return json.data.libraryTrack.audioAnalysisV6;
    });
};

export default getCyaniteData;
