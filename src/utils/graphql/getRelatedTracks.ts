const getRelatedTracks = (id: number, limit?: number) => {
  const data = JSON.stringify({
    query: `
      query SimilarTracksQuery($id: ID!) {
        libraryTrack(id: $id) {
          __typename
          ... on Error {
            message
          }
          ... on Track {
            id
            similarTracks(first: ${limit || 10}, target: { library: {}}) {
              __typename
              ... on SimilarTracksError {
                code
                message
              }
              ... on SimilarTracksConnection {
                edges {
                  node {
                    id
                    title
                  }
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
      if (json.data?.libraryTrack?.similarTracks?.edges) {
        const list = json.data?.libraryTrack?.similarTracks?.edges?.map((edge: any) => edge?.node?.title?.split('.')[0]);
        return list;
      } else return null;
    });
};

export default getRelatedTracks;
