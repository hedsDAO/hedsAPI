const formatCyaniteGenres = (genre: string) => {
  switch (genre) {
    case 'ambient':
      return 'Ambient';
    case 'blues':
      return 'Blues';
    case 'classical':
      return 'Classical';
    case 'country':
      return 'Country';
    case 'electronicDance':
      return 'Electronic Dance';
    case 'folk':
      return 'Folk';
    case 'folkCountry':
      return 'Folk Country';
    case 'indieAlternative':
      return 'Indie Alternative';
    case 'funkSoul':
      return 'Funk Soul';
    case 'jazz':
      return 'Jazz';
    case 'latin':
      return 'Latin';
    case 'metal':
      return 'Metal';
    case 'pop':
      return 'Pop';
    case 'punk':
      return 'Punk';
    case 'rapHipHop':
      return 'Rap, Hip Hop';
    case 'reggae':
      return 'Reggae';
    case 'rnb':
      return 'RnB';
    case 'rock':
      return 'Rock';
    case 'singerSongwriter':
      return 'Singer Songwriter';
    default:
      return 'Unknown';
  }
};

export default formatCyaniteGenres;
