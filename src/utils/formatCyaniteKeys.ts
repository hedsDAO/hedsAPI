const formatCyaniteKeys = (key: string) => {
  switch (key) {
    case 'aMinor':
      return 'A Minor';
    case 'eMinor':
      return 'E Minor';
    case 'bMinor':
      return 'B Minor';
    case 'fsMinor':
      return 'F# Minor';
    case 'csMinor':
      return 'C# Minor';
    case 'gsMinor':
      return 'G# Minor';
    case 'dsMinor':
      return 'D# Minor';
    case 'bbMinor':
      return 'Bb Minor';
    case 'fMinor':
      return 'F Minor';
    case 'cMinor':
      return 'C Minor';
    case 'gMinor':
      return 'G Minor';
    case 'dMinor':
      return 'D Minor';
    case 'cMajor':
      return 'C Major';
    case 'gMajor':
      return 'G Major';
    case 'dMajor':
      return 'D Major';
    case 'aMajor':
      return 'A Major';
    case 'eMajor':
      return 'E Major';
    case 'bMajor':
      return 'B Major';
    case 'fsMajor':
      return 'F# Major';
    case 'dbMajor':
      return 'Db Major';
    case 'abMajor':
      return 'Ab Major';
    case 'ebMajor':
      return 'Eb Major';
    case 'bbMajor':
      return 'Bb Major';
    case 'fMajor':
      return 'F Major';
    default:
      return 'Unknown Key';
  }
};

export default formatCyaniteKeys;
