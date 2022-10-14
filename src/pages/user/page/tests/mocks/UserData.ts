import { User } from '@/models/common';

const userData: User = {
  wallet: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
  displayName: 'Alexander Lewis',
  banner:
    'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=652af26f-1f52-4e2d-852e-0b101c60a015',
  twitterHandle: '_alexanderlewis',
  badges: [
    {
      name: 'Visitor',
      description: 'Welcome to heds.',
      image: 'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
    },
    {
      description: 'Appear on a curated tape.',
      image: 'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7',
      name: 'Artist',
    },
  ],
  role: 2,
  samples: {
    heds: {
      hedstape: {
        '6': {
          wallet: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
          audio:
            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F6%2Fassets%2FHEDSTAPE%2006%20SAMPLE.mp4?alt=media&token=95668103-29a1-4dc8-85bc-acc25cbc578d',
          artist: 'Alexander Lewis',
          duration: 0,
          track: '0',
          tape: 'hedsTAPE 06',
          cover:
            'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F6.png?alt=media&token=72d071a3-9276-47b9-98df-d1b42177c5a8',
        },
      },
    },
  },
  public: true,
  profilePicture:
    'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/users%2F0xde5bc302fc6d899eab4334602dd15efb20cd745f.jpeg?alt=media&token=9f251bf5-38c8-4800-b4c4-bc9166a0ebc2',
  submissions: {
    heds: {
      hedstape: {
        '3': {
          track: 'witty donkey',
          duration: 77,
          tape: 'hedsTAPE 03',
          artist: 'alexander lewis',
          audio:
            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F3%2Faudio%2F5_aj.mp3?alt=media&token=9d848cdf-1397-4fd7-8673-7b4b3f03bea4',
          cover:
            'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F3.png?alt=media&token=5413c9e1-753a-4c74-8b24-823d78aba1e6',
          wallet: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
        },
        '5': {
          track: 'fretful dormouse',
          wallet: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
          artist: 'alexander lewis',
          audio: 'https://www.heds.cloud/ipfs/Qmaf8psHYYhprQpdubAgMrUr4rudLuoeDyoeevweTouRcn',
          cover:
            'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F5.png?alt=media&token=3a94898c-e05a-4c06-8b1b-11150bfd0c98',
          tape: 'hedsTAPE 05',
          duration: 73.6,
        },
      },
    },
  },
  collection: {},
  description: '',
  tracks: {
    heds: {
      hedstape: {
        '3': {
          tape: 'hedsTAPE 03',
          track: '5',
          wallet: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
          artist: 'alexander lewis',
          duration: 77,
          cover:
            'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F3.png?alt=media&token=5413c9e1-753a-4c74-8b24-823d78aba1e6',
          audio:
            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F3%2Faudio%2F5_aj.mp3?alt=media&token=9d848cdf-1397-4fd7-8673-7b4b3f03bea4',
        },
        '5': {
          wallet: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
          artist: 'alexander lewis',
          track: '5',
          cover:
            'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F5.png?alt=media&token=3a94898c-e05a-4c06-8b1b-11150bfd0c98',
          tape: 'hedsTAPE 05',
          duration: 73,
          audio:
            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F6%2Faudio%2F5_al.mp3?alt=media&token=8d7d6ba7-a577-483d-bf8c-6f3784db694e',
        },
      },
    },
  },
};

export { userData };
