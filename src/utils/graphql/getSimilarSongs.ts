const getSimilarSongs = (id: number) => {
    const data = JSON.stringify({
      query: `
      query SimilarTracksQuery($trackId: ID!) {
        libraryTrack(id: $trackId) {
          __typename
          ... on Error {
            message
          }
          ... on Track {
            id
            similarTracks(target: {library: {}}) {
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
                    audioAnalysisV6 {
                      __typename
                      
                    }
                  }
                }
              }
            }
          }
        }
      }
        `,
      variables: {
        trackId: id,
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
        const audioIds = json.data.libraryTrack.similarTracks.edges.map((x: any) => x.node.title.split('.mp3')[0]);
        return audioIds;
      });
  };
  
  export default getSimilarSongs;
  