import { AudioModelState } from '@/hooks/useAudio/models/common';
import { SongLikeData } from '@/pages/song/models/common';

export const audioModelState: AudioModelState = {
  likes: [],
  song: {
    id: 176,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmepvCK3pvqGohFkFVCy8Xg4dL4UuT8rSX7u83BPq28QXF',
    cover: 'https://www.heds.cloud/ipfs/QmSiebUqSnJmzDVz5KyW9Hbx76ofEqoBhxjv2LWcxtxMuX',
    duration: 67.080748,
    public: true,
    track_name: 'seriousORYX',
    type: 'track',
    submission_data: {
      sub_id: 'seriousORYX',
      sub_image: 'https://www.heds.cloud/ipfs/QmSHF1JrcC3zU2Luhb9TR8BFXcxx1j7Mv9Y6evXkmaGTX5',
      proposalId: 'bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha',
    },
    cyanite_id: '14063969',
    created: '2023-02-12T16:00:00.000Z',
    total_likes: 0,
    track_data: {
      track_no: 9,
      tape_name: 'hedsTAPE 11',
    },
    song_video: 'https://www.heds.cloud/ipfs/QmPd9QHEs6iDJ4vzJ3CDYB4PKuUXFToqHfJgJKf7JCmKjH',
    artists: [
      {
        id: 400,
        song_id: 176,
        user_id: 400,
        verified: true,
        ownership_percent: 100,
        profile_picture:
          'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0xb57b74a81d2e550128932e8c3978f58ca03205b6.jpeg?alt=media&token=bbfa4d30-35bb-415e-8974-2c502400253e',
        banner:
          'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
        twitter_handle: 'serboynft',
        badges: [
          {
            name: 'Visitor',
            image:
              'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
            description: 'Welcome to heds.',
          },
          {
            name: 'Artist',
            image:
              'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7',
            description: 'Appear on a curated tape.',
          },
        ],
        description: 'street kid',
        display_name: 'serboy',
        role: 'artist',
        wallet: '0xb57b74a81d2e550128932e8c3978f58ca03205b6',
        joined: 1675462471603,
        spotlight: null,
        collection: {
          items: {},
          lastUpdated: 1675621362688,
        },
        votes: null,
      },
    ],
  },
  isPlaying: true,
  isMuted: false,
  isLoading: true,
  isError: false,
  autoplay: true,
  progress: 50.448694,
  volume: 1,
};
