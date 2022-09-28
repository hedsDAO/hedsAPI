import { User } from '@/models/common';

const userData: User = {
  badges: [
    {
      description: 'Welcome to heds.',
      image: 'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
      name: 'Visitor',
    },
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7',
      description: 'Appear on a curated tape.',
      name: 'Artist',
    },
  ],
  profilePicture:
    'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/users%2F0xde5bc302fc6d899eab4334602dd15efb20cd745f.jpeg?alt=media&token=9f251bf5-38c8-4800-b4c4-bc9166a0ebc2',
  displayName: 'Alexander Lewis',
  wallet: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
  role: 2,
  tracks: {
    heds: {
      hedstape: {
        '3': {
          duration: 77,
          track: '5',
          audio:
            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F3%2Faudio%2F5_aj.mp3?alt=media&token=9d848cdf-1397-4fd7-8673-7b4b3f03bea4',
        },
        '5': {
          duration: 73,
          audio:
            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F6%2Faudio%2F5_al.mp3?alt=media&token=8d7d6ba7-a577-483d-bf8c-6f3784db694e',
          track: '5',
        },
      },
    },
  },
  description: '',
  twitterHandle: '_alexanderlewis',
  samples: {
    heds: {
      hedstape: {
        '6': {
          duration: 0,
          track: '0',
          audio:
            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F6%2Fassets%2FHEDSTAPE%2006%20SAMPLE.mp4?alt=media&token=95668103-29a1-4dc8-85bc-acc25cbc578d',
        },
      },
    },
  },
  submissions: {
    heds: {
      hedstape: {
        '5': {
          audio: 'https://www.heds.cloud/ipfs/Qmaf8psHYYhprQpdubAgMrUr4rudLuoeDyoeevweTouRcn',
          duration: 73.6,
          track: 'fretful dormouse',
        },
      },
    },
  },
  public: true,
};

export { userData };
