import { Song, Tape, User } from '@/models/common';

export const tabs = ['Tracks', 'Details'];

export const mockTape: Tape = {
  id: 13,
  contract: '0xfDF7D7FFe3D363f858644057EBC62afABb99152A',
  name: 'hedsTAPE 11',
  merkle_root: '0x41F60DCB50D15915AE00B4F0C480C469F51F2A5A3D38B1B6BA54DBFD29C97334',
  description:
    'MIJA has offered her inimitable take on a wide variety of electronic projects over the years. Accordingly, for a collaborative partner of such creative versatility, Mija’s version of the hedsTAPE sample was recorded at the Vintage Synthesizer Museum, an electronic music recording studio located in Highland Park, CA. The sample includes recordings from an original TR-808, a Moog MiniMoog Model D, a Yamaha CS-80 and more. Sounds were recorded through a Universal Audio Apollo 16.',
  image: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
  proposal_id: 'bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha',
  video: 'https://www.heds.cloud/ipfs/QmPgvakDVJ7eXbTazFKaXDStJz7xWNfpo4Vm1VGC5j1Qsf',
  bpm: 161,
  timeline:
    '{"mint": {"end": 1677355200000, "start": 1677268800000}, "vote": {"end": 1676750400000, "start": 1676404800000}, "submit": {"end": 1676235600000, "start": 1675540800000}, "premint": {"end": 1677268785000, "start": 1677189600000}}',
  type: 'hedstape',
  splits: '',
  links: '{}',
};

export const mockUser: User = {
  id: 514,
  profile_picture:
    'https://storage.googleapis.com/heds-104d8.appspot.com/profilePictures/0xe4c80780cc7fc7047bccb30e2cbcb67400752a88.jpeg?GoogleAccessId=firebase-adminsdk-u5n5o%40heds-104d8.iam.gserviceaccount.com&Expires=16447046400&Signature=ZEjLUiN4RnrJ4T3sUtQdA0HOy9neCTC8NJH9BihMpONnjuJ%2BYiaZlLE5%2BXWzE3jgUia6glrwojLUohmwlnonisGP1l26LJBwbEd3Xji9BCtf8Fxzt4f36mkwzdFY2nYFN28TYFketleO%2FhWn%2FH2Kk5NuexpmBA7ePI13LgsTZ88kVXsvv6TdyitlihXFmIvZIlETuV7KSqnD8Xfde17Kjq1gAj%2Bta1dhlz4rjLFlhrrMQi%2BQt%2FbjAARYk32DrQFnes6Ih0b5NCJQRwk6I16kvQdxCFG%2FTA7F3LwLjsyndLOTKjx41S9kR3qlR2q38ScJ4eHRsQ6NGwqsDTaQWcvuWw%3D%3D',
  banner:
    'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
  twitter_handle: 'hi_mija',
  badges:
    '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
  description: 'international superstar dj wannabe degen music nft dealer',
  display_name: 'Mija',
  role: 'artist',
  wallet: '0xe4c80780cc7fc7047bccb30e2cbcb67400752a88',
  joined: 1.65934631e12,
  spotlight: null,
  collection:
    '{"items": {"0xfDF7D7FFe3D363f858644057EBC62afABb99152A": {"id": "11", "name": "hedsTAPE 11", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2", "space": "heds", "quantity": 1}}, "lastUpdated": 1677301993025}',
  votes: null,
};

export const mockTapeTracks: Song[] = [
  {
    id: 11,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmWvSojHfBGqRSmyL9xADgxWwyKBnmoFTj8VU1rniAohFf',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 89.440998,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "roomyCROCODILE", "sub_image": "https://www.heds.cloud/ipfs/QmTcgv9skPrRX9uA6w5UvVYga2S6FKLouV7fgcPi8Buv9L", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064202',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 3}',
  },
  {
    id: 78,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmdLVfeDqc75gTeEJtVfNdoD51WnDcHWH5tpdpMUnHnEkR',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 84.9763,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "nappyERMINE", "sub_image": "https://www.heds.cloud/ipfs/QmTJfVoo2pHWkNqWvFuFNodQFZ2wQ6YJL6ThUmdpsF1B39", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064004',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 1}',
  },
  {
    id: 103,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmXHwQebEQMU6MyKwQ8jkkuR86nAJJ3AqZ4xbXQ72bBZYr',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 74.605725,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "sturdyBASILISK", "sub_image": "https://www.heds.cloud/ipfs/QmUaHBdy7QDGD6QsPQzE62UoQnaSBvrMCyoov3WzpkeatP", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064247',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 4}',
  },
  {
    id: 133,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmRKhEUSW6YgEwf2Jnnx7k5YyiJBjnmzsyViHLJbsE4cTV',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 71.568,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "sourZEBRA", "sub_image": "https://www.heds.cloud/ipfs/QmbWTLst78RqDMDH4Uki9u77AWVG5oY32S1GS42NZa3RG2", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064141',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 2}',
  },
  {
    id: 151,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmZ3qiXikp6BP1Yee1BVSQ43qcEE3VcLjJYDAKb6LFzsmV',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 77.515533,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "synonymousYAK", "sub_image": "https://www.heds.cloud/ipfs/QmTSCGp36r8fHe2JmEZJSKW3Q6AKhhHcjVuHpbjyiJZhc6", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064240',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 7}',
  },
  {
    id: 176,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmepvCK3pvqGohFkFVCy8Xg4dL4UuT8rSX7u83BPq28QXF',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 67.080748,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "seriousORYX", "sub_image": "https://www.heds.cloud/ipfs/QmSHF1JrcC3zU2Luhb9TR8BFXcxx1j7Mv9Y6evXkmaGTX5", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14063969',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 9}',
  },
  {
    id: 214,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmXo7RQ4duGFhDPnxwnSd5261FnZNDxsEMbTLVuRbgSrHJ',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 65.593946,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "livelyOCTOPUS", "sub_image": "https://www.heds.cloud/ipfs/QmZNnd3FNSdTvUhY7veeMFmZRipxsEGB5AZotZ4RdnrpQs", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064231',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 6}',
  },
  {
    id: 225,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmPBirAHJ5hgCPw2fuP1xW5heVn2WhXhmcMa8tdrZ6hNdz',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 87.577642,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "zanyBULL", "sub_image": "https://www.heds.cloud/ipfs/QmZuuirhiePqbNtatxxUAGBQL8AbfKzvJS2wqrz3aFR2pe", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064094',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 10}',
  },
  {
    id: 49,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmUf1qj4baEj2RcuVi5583PExpxHNfkEGvzZFhUf5RK65A',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 89.472,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "blushingGORILLA", "sub_image": "https://www.heds.cloud/ipfs/QmRTELEPQfoVQay3utwwrVn3CXjrDVpAg3ZXxNQffksf29", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064176',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 8}',
  },
  {
    id: 122,
    tape_id: 13,
    audio: 'https://www.heds.cloud/ipfs/QmSmWnYxvXxGdXSmeLdhCKqDBysxWEnea1gCWGgCF6a1hC',
    cover:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
    duration: 60.559025,
    public: true,
    track_name: null,
    type: 'track',
    submission_data:
      '{"sub_id": "numerousSTARFISH", "sub_image": "https://www.heds.cloud/ipfs/QmT7tvhCBMPQUCdanumiZrYBFseFt6oteoDunv2cUGKiA6", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
    cyanite_id: '14064184',
    created: null,
    total_likes: null,
    track_data: '{"track_no": 5}',
  },
];

export const mockTapeArtists: User[] = [
  {
    id: 21,
    profile_picture:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a.jpeg?alt=media&token=ee81597e-2901-41b2-8838-44e6102142a4',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: '_envimusic',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '',
    display_name: 'envi',
    role: 'artist',
    wallet: '0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a',
    joined: 1.6514928e12,
    spotlight: null,
    collection:
      '{"items": {"0x567e687C93103010962F9E9Cf5730Ae8DBFC6d41": {"id": "3", "name": "hedsTAPE 03", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F3.png?alt=media&token=5413c9e1-753a-4c74-8b24-823d78aba1e6", "space": "heds", "quantity": 1}, "0x8f36eB094F7B960a234a482d4d8FFb8b37f728C6": {"id": "5", "name": "hedsTAPE 05", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F5.png?alt=media&token=3a94898c-e05a-4c06-8b1b-11150bfd0c98", "space": "heds", "quantity": 1}, "0xeeb431caa15b526f48ee4db3697fe57ec8223a8e": {"id": "goodsociety", "name": "Good Society", "tape": "collabtape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2FcollabTAPES%2FGood%20Society%2FImages%2FGSCOVER.png?alt=media&token=f93e25d3-e8f2-4c4d-9e1f-25c8b3bd99e5", "space": "heds", "quantity": 1}}, "lastUpdated": 1675547094154}',
    votes:
      '{"heds": {"hedstape": {"7": {"vp": 11, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"3": {"choice": {"id": 2, "name": "plantWILDCAT", "image": "https://www.heds.cloud/ipfs/Qmf45uU6DfZuEgpHPF6tmbG68T6FzC6coiWJxeyeg8WTtF", "media": "https://www.heds.cloud/ipfs/Qmc6Qbyoo8XqNX9aJjQK9CP2CwcDukuWk4m5Ap8d12UEKC", "artist": "_envimusic", "location": "heds/hedstape/7", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 11}, "7": {"choice": {"id": 6, "name": "hospitableWILDCAT", "image": "https://www.heds.cloud/ipfs/Qmf3MwkPgt2fuSTkXySeyGDcdkviP5oxAAbmoDVw1H7Rzv", "media": "https://www.heds.cloud/ipfs/QmQ4Zaxe69P9eqYfQw7AQe71DvyXHdC7NHMFovhvwDYrxr", "artist": "iamkabuki", "location": "heds/hedstape/7", "walletId": "0x2b4706043ba86aeea7395942404a82cc6ee3e861"}, "weight": 1}, "13": {"choice": {"id": 12, "name": "impoliteHARE", "image": "https://www.heds.cloud/ipfs/QmWkBKSg2Gb1pG79nrUnTygikKwyakyEFYei8LisPfrmt1", "media": "https://www.heds.cloud/ipfs/QmQ61X77h47kNkFdZHQaVWnLAz5WNp1TmjG3Qcus9UNqoC", "artist": "maxfryy", "location": "heds/hedstape/7", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 3}, "16": {"choice": {"id": 15, "name": "magicalBURRO", "image": "https://www.heds.cloud/ipfs/QmcPk8j2TVbFog26NxEW2ttNFk66pbLvNjUprVs3LWY4hG", "media": "https://www.heds.cloud/ipfs/QmYEZfVXMb4GyNLysU5MzJnAtHrUi8dV8YmhEon5nybVey", "artist": "_harriscole", "location": "heds/hedstape/7", "walletId": "0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83"}, "weight": 0}}, "created": 1660234329}, "8": {"vp": 26, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"1": {"choice": {"id": 0, "name": "seriousERMINE", "image": "https://www.heds.cloud/ipfs/QmXhMPstjbX2dM3Z1gxnKZrKKWs8ZibQk4QEGsU7k1JERM", "media": "https://www.heds.cloud/ipfs/QmRYMjDCCj8g9MEVVW585MJEChgshQUSvbK76FH5tAfkcW", "artist": "_envimusic", "location": "heds/hedstape/8", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 5}, "5": {"choice": {"id": 4, "name": "aquaticORYX", "image": "https://www.heds.cloud/ipfs/QmbMiC2SkNPyNBPYFwTWpK17JQt72LtC1KSa76D8nogimr", "media": "https://www.heds.cloud/ipfs/QmbwCZvfdniM6eRu3u1jzCaigC8gNo3KqALHfpmychZ5jC", "artist": "mrmarstoday", "location": "heds/hedstape/8", "walletId": "0x57c32b6ed10c90ee448e87b888608465ff7711b5"}, "weight": 3}, "6": {"choice": {"id": 5, "name": "mercifulCIVET", "image": "https://www.heds.cloud/ipfs/QmeCiiyF7ezoXAj5VmWHQBNH2nGmoFsz3cEGuccvC7QKWi", "media": "https://www.heds.cloud/ipfs/QmXvpW67hoPpPTS2YWQ479qK8Ly3KdQKrNufiNNbF4jt3d", "artist": "maxfryy", "location": "heds/hedstape/8", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 5}, "16": {"choice": {"id": 15, "name": "enthusiasticFISH", "image": "https://www.heds.cloud/ipfs/QmdyCGsZSNUxV65BacUiC8D2U3TkNWjcK983AtNoSStUTK", "media": "https://www.heds.cloud/ipfs/QmSBHMwYCBxGmZjXqydNE38qMZqeGa4k8Bsq5jXYCNnumx", "artist": "alloveprod", "location": "heds/hedstape/8", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 3}, "17": {"choice": {"id": 16, "name": "modernHARTEBEEST", "image": "https://www.heds.cloud/ipfs/QmdYgVj8o7scqgeAvRKxHisU6rxLoSk2EF8Mmdy3givFCZ", "media": "https://www.heds.cloud/ipfs/QmXRGaE5LUCK7v8fjAyt51bqRuqezNppRbpJjwxekAmkz6", "artist": "robumusic", "location": "heds/hedstape/8", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 5}}, "created": 1663650096}, "9": {"vp": 26, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"1": {"choice": {"id": 0, "name": "abidingRAT", "image": "https://www.heds.cloud/ipfs/QmRD6BaC1487FmfWzAWghTfF828sXxsVGUt1YZtVb1sSNc", "media": "https://www.heds.cloud/ipfs/QmZSpS8aLB7tUeCdmBWQsz45yi9uQysHNach2V98vEQUng", "artist": "_envimusic", "location": "heds/hedstape/9", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 4}, "9": {"choice": {"id": 8, "name": "nostalgicLOVEBIRD", "image": "https://www.heds.cloud/ipfs/QmSra2Ni6bhv7oR2D5SpmJXDWoFnY7jb38QQ9Bp5SCbAKL", "media": "https://www.heds.cloud/ipfs/QmPMmixLJ1sPmojSWAW1MVJggQxoeMy958atiqNadnpUoL", "artist": "maxfryy", "location": "heds/hedstape/9", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 4}, "18": {"choice": {"id": 17, "name": "wickedCHAMELEON", "image": "https://www.heds.cloud/ipfs/QmW1z5ANa47vnrtZvC2gqpSnnoKLYpUab3QKCr7rPXr8ge", "media": "https://www.heds.cloud/ipfs/QmWP6o1uznedpPD6goJyqzxQiyd4okAFc9FoaQogwMQSQH", "artist": "alloveprod", "location": "heds/hedstape/9", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 4}, "19": {"choice": {"id": 18, "name": "plasticCOUGAR", "image": "https://www.heds.cloud/ipfs/QmeJPYZGU6PrfTscAhqZcx45t8tm2VLvGSUpXGVsYB1JHh", "media": "https://www.heds.cloud/ipfs/QmTz1RkutPMY2Gxap12rkfoWQZwj3b1yD14ubXHGUEd5Ys", "artist": "robumusic", "location": "heds/hedstape/9", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 4}, "23": {"choice": {"id": 22, "name": "fumblingORANGUTAN", "image": "https://www.heds.cloud/ipfs/QmdTsmfuim54HKdntWGe72LJXZJyi7goypuuHSg8nGqFhS", "media": "https://www.heds.cloud/ipfs/Qma8kpfjdHjek9wbNWNzWsDfv1LWQtfRhgzmXJVgJipJh9", "artist": "madimakesmusica", "location": "heds/hedstape/9", "walletId": "0xd68892aed5b3a9b1e419b8a2c0d2c6a9c17d7679"}, "weight": 4}, "27": {"choice": {"id": 26, "name": "wide-eyedAPE", "image": "https://www.heds.cloud/ipfs/QmfDVe3N91ZCp6RAzDGhpisDNZVkPHJoUEfk9CB9eC4aJg", "media": "https://www.heds.cloud/ipfs/QmZoTXDMDPAUNft2XQWzTEwg4VgL6UpNAkmaKj8SSwYfEB", "artist": "haiSem0r", "location": "heds/hedstape/9", "walletId": "0xf5099efa89868b49b7a9ae0b6d86139fe6acb04f"}, "weight": 4}, "28": {"choice": {"id": 27, "name": "fourHORSE", "image": "https://www.heds.cloud/ipfs/Qmeb2uTmcdiF9nFikYfh2BghAy2JBFdNVeqDF526jG8Z2a", "media": "https://www.heds.cloud/ipfs/QmfSH2gaZw12P6wpk8e8apGYq7DPVhbBCSW3foJAyCEmBZ", "artist": "whoispham", "location": "heds/hedstape/9", "walletId": "0xf50f785fba275ac052d9c4137d3fd7a4de5681e5"}, "weight": 4}}, "created": 1666040571}, "10": {"vp": 26, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"1": {"choice": {"id": 0, "name": "coldOPOSSUM", "image": "https://www.heds.cloud/ipfs/QmUwpHb3aimtH73N1YVggdhcoqmb6oJWds6qDVnkijsvGY", "media": "https://www.heds.cloud/ipfs/QmPp1yJ2mk2JChzuiM5iinkMwQeZeqV6quFcY1zwH79LPH", "artist": "_envimusic", "location": "heds/hedstape/10", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 2}, "4": {"choice": {"id": 3, "name": "sordidSHREW", "image": "https://www.heds.cloud/ipfs/QmXR9KtYvRtMGxqvbmh5XbbgPFw84S3jkijPJZxaLroKcr", "media": "https://www.heds.cloud/ipfs/QmX3wA1LeFHi2F6xSndrzsmJkzkGCecpGETAmsHs4Pq8Kk", "artist": "HanzBeats", "location": "heds/hedstape/10", "walletId": "0x1e75586b064ac038b13a9f8c6bfb99e64d8b3e62"}, "weight": 2}, "5": {"choice": {"id": 4, "name": "lackadaisicalAPE", "image": "https://www.heds.cloud/ipfs/QmR4VfndHG3vRrtPx7JfUTmJh3ZsY5bksf56BXZwyEbRA8", "media": "https://www.heds.cloud/ipfs/QmZ3HHAu5g1jR73cAWo6iwxe8bVV8RnTnedg4qjM8qD8yp", "artist": "boyapocalypse_", "location": "heds/hedstape/10", "walletId": "0x329fdb9d6eba98a6159a75edaae6f86f382a65b0"}, "weight": 2}, "9": {"choice": {"id": 8, "name": "longingHYENA", "image": "https://www.heds.cloud/ipfs/QmNyKLw6tYP5oiJe6k4yJzid46aCPZ4R1hnSYYCKwK9wSB", "media": "https://www.heds.cloud/ipfs/QmUw2FNXPa8tyPLdBht2t2W5NhXot2ou7rx82aQcadsi5F", "artist": "maxfryy", "location": "heds/hedstape/10", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 2}, "10": {"choice": {"id": 9, "name": "classyWARTHOG", "image": "https://www.heds.cloud/ipfs/QmP2QxH5xGyPeeWX1YYvtbdGRJgVZrGXzdzWGUcXMYLBNt", "media": "https://www.heds.cloud/ipfs/QmeQtZu66oABGfqp4BbaC3phPw2BQavGUnNN2apdy3YNy4", "artist": "therobyguy", "location": "heds/hedstape/10", "walletId": "0x8095b40cb745d9c5f66685b46c73cd66afe48166"}, "weight": 2}, "11": {"choice": {"id": 10, "name": "vacuousPUMA", "image": "https://www.heds.cloud/ipfs/QmUJLPf6f6BT8uQvxESWEDvSWXHnhoyLqKsbt9AG2zWBpV", "media": "https://www.heds.cloud/ipfs/QmRDWUobjgiXdg5rSoPazHws6qjFzhZuj3LEAU9Dz8htCn", "artist": "tsanch_1", "location": "heds/hedstape/10", "walletId": "0x8480e77b3df1d804efdc4ed537be189ea91a761b"}, "weight": 2}, "15": {"choice": {"id": 14, "name": "wearyGNU", "image": "https://www.heds.cloud/ipfs/QmXxjmLJNYhWrRb3uNaGiXV96Lo6gX1uhTAxLGtGLfnVr2", "media": "https://www.heds.cloud/ipfs/QmYM9EZwWoxTJojuWuPrrHaEY3V9gvb8G66r63dZAHvaYC", "artist": "iamgeorgehooks", "location": "heds/hedstape/10", "walletId": "0xb9c18a66a45ee459ecffb7feb44b32665230d677"}, "weight": 2}, "16": {"choice": {"id": 15, "name": "messyCOATI", "image": "https://www.heds.cloud/ipfs/Qmadxr2zufQJyEeU9Kec57XsYfYc8babZBRyQnBxdP8JLD", "media": "https://www.heds.cloud/ipfs/Qmdc4PGoi5KVsncAYDvxqCVjgrLT4kUX5j1KZqMqa4grP4", "artist": "DeffieDeff", "location": "heds/hedstape/10", "walletId": "0xbb81e31f69181c5b74c126d8cc2b036801af04b8"}, "weight": 2}, "17": {"choice": {"id": 16, "name": "unhealthyRACCOON", "image": "https://www.heds.cloud/ipfs/QmSd3XwxaK8WWbxJNYk32QLS8x62qypHKs1bWiyX8chxzv", "media": "https://www.heds.cloud/ipfs/QmNZh86gtNtHmPcVRm1iBjjjz2N8SfLXaEVepo49M7JXLZ", "artist": "cravewav", "location": "heds/hedstape/10", "walletId": "0xc1ff40db9e85a45f684d881c9925bc3308e69187"}, "weight": 2}, "18": {"choice": {"id": 17, "name": "fearlessSTALLION", "image": "https://www.heds.cloud/ipfs/QmXCxX3zmx1QmsaRFV4EYWQ8mzfFdNXhZstqappgUpUJ2E", "media": "https://www.heds.cloud/ipfs/QmSDq4hSKmqtVz7pkWjy7z7XS64kxuE89375L4LzPDBjrP", "artist": "alloveprod", "location": "heds/hedstape/10", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 2}, "19": {"choice": {"id": 18, "name": "teeny-tinyAARDVARK", "image": "https://www.heds.cloud/ipfs/Qmbg21dTj9JufBeNdPT134eNTBxw2xLTsEtSNA4pJQLUjV", "media": "https://www.heds.cloud/ipfs/QmS6Bxq1qQirKzASTeMcdjNo5EBovNxrpjrtKRU4Zb7cLk", "artist": "robumusic", "location": "heds/hedstape/10", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 2}, "22": {"choice": {"id": 21, "name": "levelSHEEP", "image": "https://www.heds.cloud/ipfs/QmZvZvVYiDfrKxFtQCZB4N3mJALVae7pgzrk7gTgYYJZAG", "media": "https://www.heds.cloud/ipfs/QmTYxLMZvt7n7vaZouRNA2XwzFVXQ9kziFwLvYgif33WhW", "artist": "haiSem0r", "location": "heds/hedstape/10", "walletId": "0xf5099efa89868b49b7a9ae0b6d86139fe6acb04f"}, "weight": 2}}, "created": 1669181369}, "11": {"vp": 27, "voter": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a", "choice": {"1": {"choice": {"id": 0, "name": "roomyCROCODILE", "image": "https://www.heds.cloud/ipfs/QmTcgv9skPrRX9uA6w5UvVYga2S6FKLouV7fgcPi8Buv9L", "media": "https://www.heds.cloud/ipfs/QmWvSojHfBGqRSmyL9xADgxWwyKBnmoFTj8VU1rniAohFf", "artist": "envi", "location": "hed/hedstape/11", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 5}, "3": {"choice": {"id": 2, "name": "numerousALLIGATOR", "image": "https://www.heds.cloud/ipfs/QmWedvk6vA7HPskN4FxUsQEEXw7Ghc2aFgejaJmZuJup1Y", "media": "https://www.heds.cloud/ipfs/QmPRzQiAgQjew43tHuetDt6FqdHZG4y3gXumYN5yKT3cEf", "artist": "HOUNDTRACK", "location": "hed/hedstape/11", "walletId": "0x17c72771bb6b283bade0c07e0901744c37ff8c41"}, "weight": 1}, "12": {"choice": {"id": 11, "name": "sturdyBASILISK", "image": "https://www.heds.cloud/ipfs/QmUaHBdy7QDGD6QsPQzE62UoQnaSBvrMCyoov3WzpkeatP", "media": "https://www.heds.cloud/ipfs/QmXHwQebEQMU6MyKwQ8jkkuR86nAJJ3AqZ4xbXQ72bBZYr", "artist": "max fry", "location": "hed/hedstape/11", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 5}, "14": {"choice": {"id": 13, "name": "relievedJACKAL", "image": "https://www.heds.cloud/ipfs/QmPqihqBwtYf5tWjQr11oqgKeV7a5BQw9TDGFrBL27zFp6", "media": "https://www.heds.cloud/ipfs/QmPtv74EyYMq9fuBeZYku3vcEy4STBdcBDpd4HpZKcH47N", "artist": "TSheds", "location": "hed/hedstape/11", "walletId": "0x8480e77b3df1d804efdc4ed537be189ea91a761b"}, "weight": 5}, "21": {"choice": {"id": 20, "name": "alertGORILLA", "image": "https://www.heds.cloud/ipfs/QmNWHGdFafPd68542oFCogswprucPTt2ZdBsZjamohp84p", "media": "https://www.heds.cloud/ipfs/QmYgrHEiiTTwSkJUUDDYbnH5dbHoCoGRMRU36ssXBEjHtT", "artist": "allove", "location": "hed/hedstape/11", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 1}, "22": {"choice": {"id": 21, "name": "livelyOCTOPUS", "image": "https://www.heds.cloud/ipfs/QmZNnd3FNSdTvUhY7veeMFmZRipxsEGB5AZotZ4RdnrpQs", "media": "https://www.heds.cloud/ipfs/QmXo7RQ4duGFhDPnxwnSd5261FnZNDxsEMbTLVuRbgSrHJ", "artist": "robu", "location": "hed/hedstape/11", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 1}}, "created": 1676408168897, "signature": "0x40168673ad2d349c107ceb50dcded53e3f1cfffb811ccdbca6fdad65d17ca98a143fb482930519fa7aa12a61a529872f4c91a3b260ea5f9cffb72d1f0555a03f1b"}}}}',
  },
  {
    id: 108,
    profile_picture:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x308474848c18cfaa48d7833ed6235b205366def8.jpeg?alt=media&token=f87962fd-6ed7-4d41-801d-fe174e4f41c2',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x308474848c18cfaa48d7833ed6235b205366def8.jpeg?alt=media&token=c8ab416b-f63a-4d8a-924a-f58cb18872c4',
    twitter_handle: 'evjaston',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '૮ ･ ﻌ･ა',
    display_name: 'EVAN ROLSTON',
    role: 'artist',
    wallet: '0x308474848c18cfaa48d7833ed6235b205366def8',
    joined: 1.675638016923e12,
    spotlight: null,
    collection: '{"items": {}, "lastUpdated": 1678805979218}',
    votes: null,
  },
  {
    id: 165,
    profile_picture:
      'https://storage.googleapis.com/heds-104d8.appspot.com/profilePictures/0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2.png?GoogleAccessId=firebase-adminsdk-u5n5o%40heds-104d8.iam.gserviceaccount.com&Expires=16447046400&Signature=xJ3bDa5gKyzAR5Y3wLlvIfvFs38h6t2YzYndHKG09dcksnQxLLCU4UHkdEpedrdWmJhB9YrqYhAMqYS9EhCg5rl7hPRsCRjkRKKHNgtKST4KbG9n6vn7VttnxGC1inJEcFtGXXVY0mWRSSzDOZRGySPMH4CNBFTFEccya56DGoEaxuLCQH%2F%2FOaDvhS6ZEgOnYS5K1P9WH6ne0a7bFM4wamuyWoYM6xN%2BSDHaSuy%2B94eK%2FvMSkjXApu4poXi%2B4LJkytNtNyKYKYEStlslrtyvyhE%2Bc9psfkjFu1cSIovU45q6rKgdIvCpfoyvzWfY6nQhiYvnkE7wYS9MIVMK7LkuGg%3D%3D',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: 'oshimakesmusic',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '',
    display_name: 'oshi',
    role: 'artist',
    wallet: '0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2',
    joined: 1.641816e12,
    spotlight: null,
    collection:
      '{"items": {"0x5083cF11003f2B25Ca7456717e6dC980545002e5": {"id": "2", "name": "hedsTAPE 02", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F2.png?alt=media&token=b37ac39b-243e-411f-820f-17c9b8e454df", "space": "heds", "quantity": 1}, "0x567e687C93103010962F9E9Cf5730Ae8DBFC6d41": {"id": "3", "name": "hedsTAPE 03", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F3.png?alt=media&token=5413c9e1-753a-4c74-8b24-823d78aba1e6", "space": "heds", "quantity": 3}, "0x8045fd700946a00436923f37d08f280ade3b4af6": {"id": "4", "name": "hedsTAPE 04", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F4.png?alt=media&token=f1035070-2eb5-49eb-9dc8-c1ab43506399", "space": "heds", "quantity": 3}, "0xeeb431caa15b526f48ee4db3697fe57ec8223a8e": {"id": "goodsociety", "name": "Good Society", "tape": "collabtape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2FcollabTAPES%2FGood%20Society%2FImages%2FGSCOVER.png?alt=media&token=f93e25d3-e8f2-4c4d-9e1f-25c8b3bd99e5", "space": "heds", "quantity": 3}}, "lastUpdated": 1677789674933}',
    votes:
      '{"heds": {"hedstape": {"4": {"vp": 24, "voter": "0x4d18f8f2aE19f1E166c97793cceeb70680A2b6D2", "choice": {"4": {"choice": {"id": 3, "name": "abrasiveZEBU", "image": "https://www.heds.cloud/ipfs/QmT9eYYGPmeWaCxsftHMZuCWt7M8Shz8ZW8jTvTJKtWPAj", "media": "https://ipfs.io/ipfs/Qme6XPZHwdnCq7Fs4Yaj5wwvdZiEgmqvAHpyzeUnBozPRM", "artist": "brijplease", "location": "heds/hedstape/4", "walletId": "0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c"}, "weight": 1}, "7": {"choice": {"id": 6, "name": "verdantALLIGATOR", "image": "https://www.heds.cloud/ipfs/Qmd3r5fXc5cx8JXqMb24EC3bH3Jn9B8tYJoUVmXsaGexQo", "media": "https://ipfs.io/ipfs/QmZ8V2geWHLtJYArXB6LVssk41vzpSFUAHvNTE6hDuXG7s", "artist": "PryceMusic", "location": "heds/hedstape/4", "walletId": "0x16561d0523ae6ced2547fc22c702b1f9c6279ad3"}, "weight": 1}, "13": {"choice": {"id": 12, "name": "flowerySTALLION", "image": "https://www.heds.cloud/ipfs/QmR4HmuziGjY2c2dVdWKTBftiVd4YfXxe3pM9wVJGokUbK", "media": "https://ipfs.io/ipfs/Qmf8wdAhjpoTpVNV7DFgMuFNWFaNtBD98gY3bB437pYEGG", "artist": "mozadomusic", "location": "heds/hedstape/4", "walletId": "0x4a5a71184bf725b86a132990eae29031aff2ee9e"}, "weight": 1}, "16": {"choice": {"id": 15, "name": "secondSQUIRREL", "image": "https://www.heds.cloud/ipfs/QmTSX2dMCxZDTjZVD8oKqRfTWCURPuP7NJfrZtuEiB77pT", "media": "https://ipfs.io/ipfs/QmX2Mv1hzKr2ZEyKkCFLgZoF89WxSCb3AJVQuUiZtm4AA7", "artist": "thepark", "location": "heds/hedstape/4", "walletId": "0x589ffbbda0eacd5a9c2ba208b379c886b2630503"}, "weight": 1}, "17": {"choice": {"id": 16, "name": "bashfulBUFFALO", "image": "https://www.heds.cloud/ipfs/QmRVHrXdKDojsDSPtaMHK3N9jbMMTvNCrgBdMSJ14FJqSa", "media": "https://ipfs.io/ipfs/QmYRPE2V9rtLfXhqRH5XCbiDpBVKDdq21W3P4jx9YZCdU1", "artist": "maxfryy", "location": "heds/hedstape/4", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 1}, "18": {"choice": {"id": 17, "name": "greatBUFFALO", "image": "https://www.heds.cloud/ipfs/QmYXUPtt1nigb6rkyTF1vWWNpU1sv7XS3AS4DCTTqJFT3C", "media": "https://ipfs.io/ipfs/QmaFyQV1NjPgLWxK2VvEJiHKBt9Ee5inNW6xPTTcPb4oeW", "artist": "_fantompower", "location": "heds/hedstape/4", "walletId": "0x7b7bbb6e6e9a47edfefd70f1ee736ed916b19a49"}, "weight": 1}, "19": {"choice": {"id": 18, "name": "aloofMUSKRAT", "image": "https://www.heds.cloud/ipfs/QmYGxKQ5U42DM6AVdxSzGxw3BYgwCWshdtN81CyX6xsQu6", "media": "https://ipfs.io/ipfs/QmZ3aD6Ua5sWob2oaFiBiua78e6gqsw4Fg32xSxWm1uJMK", "artist": "Towerzzzz", "location": "heds/hedstape/4", "walletId": "0x7dac252fd103b348beb747a1ddb561166f51504b"}, "weight": 1}, "21": {"choice": {"id": 20, "name": "picayuneELAND", "image": "https://www.heds.cloud/ipfs/Qmf4bf3heZ6X2aP6mh8Zzn3A1tsRhCfiMca8DjDkb4xJjH", "media": "https://ipfs.io/ipfs/QmVGAtH86AB5FtQyn6BNxeiSRnkXbVMN1ZPmdnBvbG3iLe", "artist": "charlesnimbus", "location": "heds/hedstape/4", "walletId": "0x9069263bb8ca6da625c248d20c4305990a8cffd6"}, "weight": 1}, "25": {"choice": {"id": 24, "name": "headyCHIPMUNK", "image": "https://www.heds.cloud/ipfs/QmX7zTWY2CHTNv2c42478Der6LggErYaSkvTYLawBTRwFn", "media": "https://ipfs.io/ipfs/QmcnEr9k4YhQowBbSzHdB4GLuRS4L78Y3SHG1WKPii8iGh", "artist": "floro_beats", "location": "heds/hedstape/4", "walletId": "0xb2111606a3855602bd46b0343ba87396dd11b121"}, "weight": 1}, "26": {"choice": {"id": 25, "name": "hard-to-findTAPIR", "image": "https://www.heds.cloud/ipfs/QmfEvAHtHKAWLB27dDXbLdFy5qPuK8Y91cwyFgJ9n8QUnC", "media": "https://ipfs.io/ipfs/QmX1qpyYF9Apg9Xzqw3BnGyxRppNaAvftrxr2xnR1YKscA", "artist": "oneohkay", "location": "heds/hedstape/4", "walletId": "0xb2e53f9c24875051cfd1c3154f5ffa62169d5ed3"}, "weight": 1}, "29": {"choice": {"id": 28, "name": "amusingOTTER", "image": "https://www.heds.cloud/ipfs/QmcxHDs1vGrrqsFJjLLUBYthpoNLoy1GZZLkBv7cEeAN52", "media": "https://ipfs.io/ipfs/QmZt2dT2ebKYidbMMPCQPFhapqgVqYEpcbX78d1QotEa6Y", "artist": "glowstone00", "location": "heds/hedstape/4", "walletId": "0xbbef915aa048d53281f31ba864be76133d695d62"}, "weight": 1}, "31": {"choice": {"id": 30, "name": "hystericalEWE", "image": "https://www.heds.cloud/ipfs/QmSLvPbNAPBm5yo9W1Yj1VRq7C3Lmo4BcRogMky4tmYxoL", "media": "https://ipfs.io/ipfs/Qmf3pqeVgQSFZgBjiydbpe5T7i8H5aTA6pW9KxPt3Vr2sH", "artist": "greenringmusic", "location": "heds/hedstape/4", "walletId": "0xc3af8efe3c865b8363a79b13b27db530eb5d24af"}, "weight": 1}, "33": {"choice": {"id": 32, "name": "uninterestedLYNX", "image": "https://www.heds.cloud/ipfs/QmeKG5VPfaWf1tDFALWnyd7DEBVLxxnBmy9izsWPvzt2ny", "media": "https://ipfs.io/ipfs/QmQ4VhwV8q7x1HHVjvRuigRntPiB8S96h1Zd3tPtydzomA", "artist": "_AbJo", "location": "heds/hedstape/4", "walletId": "0xcf669804ac78cfc589beae782f045f961fc10381"}, "weight": 1}, "36": {"choice": {"id": 35, "name": "abusiveDORMOUSE", "image": "https://www.heds.cloud/ipfs/QmSAiJNNnjZ4q92Q8gQUsHrwzBgnMnMe1oWwNKCMYDjBGA", "media": "https://ipfs.io/ipfs/QmV9vRFajUKJUGsSPZuCdMiWed2wqBbLynLm4EwoBq8XPx", "artist": "obwnmusic", "location": "heds/hedstape/4", "walletId": "0xdaa8f0a07d3c356cab270587d220b42c20df0973"}, "weight": 1}, "39": {"choice": {"id": 38, "name": "quickestSTEER", "image": "https://www.heds.cloud/ipfs/QmTdPEHr8w1frjT7NAFmBjYfWcgFUbAmgYFUyBvbeHKZmp", "media": "https://ipfs.io/ipfs/QmWbZs6TxHyiXoR6KPgzzBvGbp6tdgGyLqg1kv2zTTuY3D", "artist": "haiSem0r", "location": "heds/hedstape/4", "walletId": "0xf5099efa89868b49b7a9ae0b6d86139fe6acb04f"}, "weight": 1}}, "created": 1652464390}, "5": {"vp": 52, "voter": "0x4d18f8f2aE19f1E166c97793cceeb70680A2b6D2", "choice": {"5": {"choice": {"id": 4, "name": "wistfulBABOON", "image": "https://www.heds.cloud/ipfs/QmeqVZxyV82pWEtKVsMbzfw8G8gNMR5JKAXjEq4PYD5Rd4", "media": "https://www.heds.cloud/ipfs/QmR3ZEbytpxBCXdbh6S2dQ1QLFtBtGBpW9hpuuUV4XriAZ", "artist": "HanzBeats", "location": "heds/hedstape/5", "walletId": "0x1e75586b064ac038b13a9f8c6bfb99e64d8b3e62"}, "weight": 0}, "9": {"choice": {"id": 8, "name": "evenOCTOPUS", "image": "https://www.heds.cloud/ipfs/QmSCySpQdh1H4nkPafJoiayNBJqTEQXaAKNX63fXyDmjR5", "media": "https://www.heds.cloud/ipfs/QmXxCVC73baf3aJnScNuCvAdPeuvmh6bw2oNyn78xmjcud", "artist": "sofractures", "location": "heds/hedstape/5", "walletId": "0x3585ca22df80d70f6d1cc0867d8387c360181349"}, "weight": 3}, "12": {"choice": {"id": 11, "name": "acidicMARMOSET", "image": "https://www.heds.cloud/ipfs/Qmd5pAkm8ovzAHeaHbHTE1tKQiGRj3vH9pxVLhTcxS9aSM", "media": "https://www.heds.cloud/ipfs/QmTtF3A3tvjKbyRUvRduhrxzNoewNFGBYMaWK4XZWmGZyh", "artist": "maxfryy", "location": "heds/hedstape/5", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 2}, "13": {"choice": {"id": 12, "name": "sadFOX", "image": "https://www.heds.cloud/ipfs/QmRsZ9Xm7a8nQRa7orBpT6xuwAm2KYCUPDGDQoCWbeXLAi", "media": "https://www.heds.cloud/ipfs/QmUuYHCkqx3aXiUreUfp4Q9y4feJKR4BQY7gg9QmfgLbZf", "artist": "_fantompower", "location": "heds/hedstape/5", "walletId": "0x7b7bbb6e6e9a47edfefd70f1ee736ed916b19a49"}, "weight": 8}, "16": {"choice": {"id": 15, "name": "secretGAZELLE", "image": "https://www.heds.cloud/ipfs/QmU5qMc1Uo8NWJbgpn2a1bKHJCeK4L14VvUpupy7VB6dNg", "media": "https://www.heds.cloud/ipfs/QmbeoqWawJGk94bafRgSK1mCGnJSKKkmwxRpjedQt17wbu", "artist": "charlesnimbus", "location": "heds/hedstape/5", "walletId": "0x9069263bb8ca6da625c248d20c4305990a8cffd6"}, "weight": 8}, "18": {"choice": {"id": 17, "name": "reconditePORCUPINE", "image": "https://www.heds.cloud/ipfs/QmZDZ5ngGoAmK5qLvMUDpFFqZLzDCf5FroqGoCATcDhaf1", "media": "https://www.heds.cloud/ipfs/QmcE1wf4QvYNkoWM1KeC7eUY7ST21BxJCqRygwwhfjDJBF", "artist": "whoslethr", "location": "heds/hedstape/5", "walletId": "0xa2103c4c036f8cc82246b2a31b96296c7feafd8c"}, "weight": 1}, "23": {"choice": {"id": 22, "name": "needyLION", "image": "https://www.heds.cloud/ipfs/QmdFjkFereGQv1fNkUEBZDvEXxMJonn8hBjdxsxS5AqrXU", "media": "https://www.heds.cloud/ipfs/QmPFnQiMp7kMTeimxnPmjGe5CCRQxRVwpNF3QvrfZ6qv38", "artist": "oneohkay", "location": "heds/hedstape/5", "walletId": "0xb2e53f9c24875051cfd1c3154f5ffa62169d5ed3"}, "weight": 3}, "24": {"choice": {"id": 23, "name": "muteKOALA", "image": "https://www.heds.cloud/ipfs/QmcD7MVKSsU1FugSnnVX8ma4gQGDd8Ln9pFNQRDidD1Dwv", "media": "https://www.heds.cloud/ipfs/QmPDTWtuQMiC3tNbAKnWHRcZbhPVLm4q3W71wwjvwEgw3v", "artist": "iamgeorgehooks", "location": "heds/hedstape/5", "walletId": "0xb9c18a66a45ee459ecffb7feb44b32665230d677"}, "weight": 3}, "25": {"choice": {"id": 24, "name": "simplisticGEMSBOK", "image": "https://www.heds.cloud/ipfs/QmQRGnEAz3rc1MRpDXMSFq1cfMQcAdAvLVE18qRKG2SaYr", "media": "https://www.heds.cloud/ipfs/QmaR85tweC8ygWf4nzAjxQdu1mScBo63taDeWMzxWaKSyK", "artist": "DeffieDeff", "location": "heds/hedstape/5", "walletId": "0xbb81e31f69181c5b74c126d8cc2b036801af04b8"}, "weight": 5}, "28": {"choice": {"id": 27, "name": "tiresomeBIGHORN", "image": "https://www.heds.cloud/ipfs/QmSjcrSN9wS9ppux1mCjSM9pWGDxjiTodPcm1YSGGsrz2F", "media": "https://www.heds.cloud/ipfs/QmNmCMVtgBGPPk8J7tLqzDfno95wTzxr1PtC3nyqoTZ274", "artist": "unclefrnge", "location": "heds/hedstape/5", "walletId": "0xe0c7c3ed0aacff62e8a91a467a0aa51088952fb3"}, "weight": 8}, "29": {"choice": {"id": 28, "name": "likeableALPACA", "image": "https://www.heds.cloud/ipfs/QmcEV6FDAjsk23BVTU7coU7s456ximGtruHGf6Rggq95rY", "media": "https://www.heds.cloud/ipfs/QmahRZJjS9K9LGi2LuhKdVMMTWRPVSS5MHj9WAZEfWE5YT", "artist": "sober_rob", "location": "heds/hedstape/5", "walletId": "0xe140ee18bde44dad2170561621a7836ad1218240"}, "weight": 8}}, "created": 1654782762}, "7": {"vp": 52, "voter": "0x4d18f8f2aE19f1E166c97793cceeb70680A2b6D2", "choice": {"17": {"choice": {"id": 16, "name": "maniacalPIG", "image": "https://www.heds.cloud/ipfs/QmY23KiLDr8aRGijytP8kAxdiaFjaDb4Gd45kHXD3FrUdE", "media": "https://www.heds.cloud/ipfs/QmUvANy2tFn4rwZNAGeL7R6P1Te8hGKtfS34V8MEXuFgSE", "artist": "charlesnimbus", "location": "heds/hedstape/7", "walletId": "0x9069263bb8ca6da625c248d20c4305990a8cffd6"}, "weight": 55}}, "created": 1660084632}, "11": {"vp": 66, "voter": "0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2", "choice": {"3": {"choice": {"id": 2, "name": "numerousALLIGATOR", "image": "https://www.heds.cloud/ipfs/QmWedvk6vA7HPskN4FxUsQEEXw7Ghc2aFgejaJmZuJup1Y", "media": "https://www.heds.cloud/ipfs/QmPRzQiAgQjew43tHuetDt6FqdHZG4y3gXumYN5yKT3cEf", "artist": "HOUNDTRACK", "location": "hed/hedstape/11", "walletId": "0x17c72771bb6b283bade0c07e0901744c37ff8c41"}, "weight": 2}, "4": {"choice": {"id": 3, "name": "bestPANTHER", "image": "https://www.heds.cloud/ipfs/QmQkdRLQ2bmit7hSgDagzQ9p3siFs5HWcXRPV1LmWH7kpC", "media": "https://www.heds.cloud/ipfs/QmRtrFDTTUJ4CrdHyi26W7wrUH9Lw5fRZjDaZ7esMP4sXs", "artist": "hanz beats", "location": "hed/hedstape/11", "walletId": "0x1e75586b064ac038b13a9f8c6bfb99e64d8b3e62"}, "weight": 10}, "5": {"choice": {"id": 4, "name": "boringWOMBAT", "image": "https://www.heds.cloud/ipfs/QmPnzfTy81MZEnAemkP7zKxfsc8Wxs52sQ5FnJWBZ48MgH", "media": "https://www.heds.cloud/ipfs/QmcT5hCvQM8pAQBu6Tb84WkDrr9qGHvFNdewVGuyRsPSJX", "artist": "anatu", "location": "hed/hedstape/11", "walletId": "0x2423e325bf785096516d88355a5e3854f9d59d1a"}, "weight": 5}, "9": {"choice": {"id": 8, "name": "nappyERMINE", "image": "https://www.heds.cloud/ipfs/QmTJfVoo2pHWkNqWvFuFNodQFZ2wQ6YJL6ThUmdpsF1B39", "media": "https://www.heds.cloud/ipfs/QmdLVfeDqc75gTeEJtVfNdoD51WnDcHWH5tpdpMUnHnEkR", "artist": "oshi", "location": "hed/hedstape/11", "walletId": "0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2"}, "weight": 20}, "10": {"choice": {"id": 9, "name": "deliciousHOG", "image": "https://www.heds.cloud/ipfs/QmPBuJMjcZfqPeyDdovVQyQPM5i7T9L3KBNHUBiHNFYqAi", "media": "https://www.heds.cloud/ipfs/QmdZwAMNDXsAf1uGKaYwP3nh87m4S3sHYj8HSGSWZAKSU4", "artist": "agwi", "location": "hed/hedstape/11", "walletId": "0x56b236d0228072f9864bed97436425eba1a3b1a1"}, "weight": 5}, "15": {"choice": {"id": 14, "name": "sourZEBRA", "image": "https://www.heds.cloud/ipfs/QmbWTLst78RqDMDH4Uki9u77AWVG5oY32S1GS42NZa3RG2", "media": "https://www.heds.cloud/ipfs/QmRKhEUSW6YgEwf2Jnnx7k5YyiJBjnmzsyViHLJbsE4cTV", "artist": "harris cole", "location": "hed/hedstape/11", "walletId": "0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83"}, "weight": 1}, "20": {"choice": {"id": 19, "name": "charmingOPOSSUM", "image": "https://www.heds.cloud/ipfs/QmadvSQEqF68jNfSGu2Vs3sj5SLBdhS2Zav73zo5XoLuxq", "media": "https://www.heds.cloud/ipfs/QmceuJ6tggqzS1DyoERnYHNjcx1RLMPWaQXqUsT4PFTk1K", "artist": "george hooks", "location": "hed/hedstape/11", "walletId": "0xb9c18a66a45ee459ecffb7feb44b32665230d677"}, "weight": 2}, "22": {"choice": {"id": 21, "name": "livelyOCTOPUS", "image": "https://www.heds.cloud/ipfs/QmZNnd3FNSdTvUhY7veeMFmZRipxsEGB5AZotZ4RdnrpQs", "media": "https://www.heds.cloud/ipfs/QmXo7RQ4duGFhDPnxwnSd5261FnZNDxsEMbTLVuRbgSrHJ", "artist": "robu", "location": "hed/hedstape/11", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 10}}, "created": 1676411727727, "signature": "0x5025ef85525b9636f4504d7ddb663f979d0c3e71a7a909a60615e2cd1670061e1460db2b1fa60932cb33b4ae223e573961f80341fc54a95940efa902670ba8e31c"}}}}',
  },
  {
    id: 229,
    profile_picture:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x6822d2d69508a086d4c329ea8969484b62cc0f94.jpeg?alt=media&token=9bc73c28-8332-404f-9ddc-91a70c0f8a59',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: 'maxfryy',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '',
    display_name: 'max fry',
    role: 'artist',
    wallet: '0x6822d2d69508a086d4c329ea8969484b62cc0f94',
    joined: 1.6454448e12,
    spotlight: null,
    collection:
      '{"items": {"0x9f396644ec4b2a2bc3c6cf665d29165dde0e83f1": {"id": "10", "name": "hedsTAPE 10", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F10.png?alt=media&token=9bd7824a-4008-4e12-b70d-f895c5206f3c", "space": "heds", "quantity": 1}, "0xfDF7D7FFe3D363f858644057EBC62afABb99152A": {"id": "11", "name": "hedsTAPE 11", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2", "space": "heds", "quantity": 1}}, "lastUpdated": 1679274278371}',
    votes:
      '{"heds": {"hedstape": {"4": {"vp": 8, "voter": "0x6822d2D69508a086D4C329ea8969484B62cC0F94", "choice": {"3": {"choice": {"id": 2, "name": "quirkyJACKAL", "image": "https://www.heds.cloud/ipfs/QmWNsXouvgtVoxdRQzPVQbHpmkNDEDwx58z2nMXXjNnzep", "media": "https://ipfs.io/ipfs/QmWe3XQgF3fryqo3vMXiVkU5nt1ZywwGh56jQYtFQLCM63", "artist": "_envimusic", "location": "heds/hedstape/4", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 2}, "17": {"choice": {"id": 16, "name": "bashfulBUFFALO", "image": "https://www.heds.cloud/ipfs/QmRVHrXdKDojsDSPtaMHK3N9jbMMTvNCrgBdMSJ14FJqSa", "media": "https://ipfs.io/ipfs/QmYRPE2V9rtLfXhqRH5XCbiDpBVKDdq21W3P4jx9YZCdU1", "artist": "maxfryy", "location": "heds/hedstape/4", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 8}, "19": {"choice": {"id": 18, "name": "aloofMUSKRAT", "image": "https://www.heds.cloud/ipfs/QmYGxKQ5U42DM6AVdxSzGxw3BYgwCWshdtN81CyX6xsQu6", "media": "https://ipfs.io/ipfs/QmZ3aD6Ua5sWob2oaFiBiua78e6gqsw4Fg32xSxWm1uJMK", "artist": "Towerzzzz", "location": "heds/hedstape/4", "walletId": "0x7dac252fd103b348beb747a1ddb561166f51504b"}, "weight": 2}, "29": {"choice": {"id": 28, "name": "amusingOTTER", "image": "https://www.heds.cloud/ipfs/QmcxHDs1vGrrqsFJjLLUBYthpoNLoy1GZZLkBv7cEeAN52", "media": "https://ipfs.io/ipfs/QmZt2dT2ebKYidbMMPCQPFhapqgVqYEpcbX78d1QotEa6Y", "artist": "glowstone00", "location": "heds/hedstape/4", "walletId": "0xbbef915aa048d53281f31ba864be76133d695d62"}, "weight": 2}, "40": {"choice": {"id": 39, "name": "franticJAGUAR", "image": "https://www.heds.cloud/ipfs/Qmav2Qzj4d9hhAMsZAWhaPAw4vpyXKR9BentTsKVC6dFwX", "media": "https://ipfs.io/ipfs/QmcS14w2ykRZHH4gn85GBA2HbTYwKHKkE5zMx5U5kPw4pJ", "artist": "whoispham", "location": "heds/hedstape/4", "walletId": "0xf50f785fba275ac052d9c4137d3fd7a4de5681e5"}, "weight": 2}}, "created": 1652402567}, "5": {"vp": 11, "voter": "0x6822d2D69508a086D4C329ea8969484B62cC0F94", "choice": {"1": {"choice": {"id": 0, "name": "foregoingBUDGERIGAR", "image": "https://www.heds.cloud/ipfs/QmRv3K3CEVRZvpABtb91CyAx7vwgXfFYdiyggm7sbHETh2", "media": "https://www.heds.cloud/ipfs/QmSm3jpkmoy7D64ZHfNkdYiiECG3pfYz2k5ZEggAS1t9ms", "artist": "_envimusic", "location": "heds/hedstape/5", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 2}, "12": {"choice": {"id": 11, "name": "acidicMARMOSET", "image": "https://www.heds.cloud/ipfs/Qmd5pAkm8ovzAHeaHbHTE1tKQiGRj3vH9pxVLhTcxS9aSM", "media": "https://www.heds.cloud/ipfs/QmTtF3A3tvjKbyRUvRduhrxzNoewNFGBYMaWK4XZWmGZyh", "artist": "maxfryy", "location": "heds/hedstape/5", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 1}, "14": {"choice": {"id": 13, "name": "breezyBEAVER", "image": "https://www.heds.cloud/ipfs/QmRZcyJMJg5NUG4E9GUgLu7Uiy7cTueSkHGuA7jYweBkkP", "media": "https://www.heds.cloud/ipfs/QmP3Uhbq9wyNxhJYfXwSCV21zTfxX7HKwcinHLxQ3Nt48L", "artist": "Towerzzzz", "location": "heds/hedstape/5", "walletId": "0x7dac252fd103b348beb747a1ddb561166f51504b"}, "weight": 1}}, "created": 1654800784}, "6": {"vp": 16, "voter": "0x6822d2D69508a086D4C329ea8969484B62cC0F94", "choice": {"7": {"choice": {"id": 6, "name": "volcanic/lava", "image": "https://www.heds.cloud/ipfs/QmTrHb2vwkRx4W6tWrYxkZjmST8ZSY4tWMLB7CobKfuU2t", "media": "", "artist": "heds", "location": "heds/hedstape/6", "walletId": "0x55C59AE5b124261d021421f07C6cad699C993b3d"}, "weight": 1}}, "created": 1657656469}, "7": {"vp": 16, "voter": "0x6822d2D69508a086D4C329ea8969484B62cC0F94", "choice": {"9": {"choice": {"id": 8, "name": "bitterBAT", "image": "https://www.heds.cloud/ipfs/QmesBtnXThq8YTTTJv9JY3RdwFoZAeujFRVW4MEj5kd5Re", "media": "https://www.heds.cloud/ipfs/QmThvmCbwCqoABuZWt99END4zp9RsswnWJnqR8wRyo52mK", "artist": "mcwtrs", "location": "heds/hedstape/7", "walletId": "0x3bc39bfaa69f6087a93e99c4093943ef8715166c"}, "weight": 1}, "13": {"choice": {"id": 12, "name": "impoliteHARE", "image": "https://www.heds.cloud/ipfs/QmWkBKSg2Gb1pG79nrUnTygikKwyakyEFYei8LisPfrmt1", "media": "https://www.heds.cloud/ipfs/QmQ61X77h47kNkFdZHQaVWnLAz5WNp1TmjG3Qcus9UNqoC", "artist": "maxfryy", "location": "heds/hedstape/7", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 27}, "23": {"choice": {"id": 22, "name": "grayPUMA", "image": "https://www.heds.cloud/ipfs/QmT7vgFQ85HTrQ49nLPBwpaC83toRRnLhfpsocbqQa2VcJ", "media": "https://www.heds.cloud/ipfs/QmYKDnCN2d89NqE6cbLwAwRHv7PStNUELTgfceefb7Zqyw", "artist": "alloveprod", "location": "heds/hedstape/7", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 1}, "32": {"choice": {"id": 31, "name": "limpingSTEER", "image": "https://www.heds.cloud/ipfs/QmeVES6jCNGK9tu32ChrrCKkMM6a12vEMtth4Yb4xwYmhH", "media": "https://www.heds.cloud/ipfs/QmPTyxM1sHNnpGhGhwn96FmxtQwag2E3cXiskDnqm961jC", "artist": "itsskinnyatlas", "location": "heds/hedstape/7", "walletId": "0xe32730fa8a8f9592fa7dc3cc0e7262a49c271578"}, "weight": 1}}, "created": 1660238043}, "8": {"vp": 31, "voter": "0x6822d2D69508a086D4C329ea8969484B62cC0F94", "choice": {"1": {"choice": {"id": 0, "name": "seriousERMINE", "image": "https://www.heds.cloud/ipfs/QmXhMPstjbX2dM3Z1gxnKZrKKWs8ZibQk4QEGsU7k1JERM", "media": "https://www.heds.cloud/ipfs/QmRYMjDCCj8g9MEVVW585MJEChgshQUSvbK76FH5tAfkcW", "artist": "_envimusic", "location": "heds/hedstape/8", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 6}, "4": {"choice": {"id": 3, "name": "saltyZEBU", "image": "https://www.heds.cloud/ipfs/QmQVvcMJS9chR2R2DEbLZsBHVupMqCn4XBuSMsmQMuUcrv", "media": "https://www.heds.cloud/ipfs/QmRXCz9iLbueJAQDhY9UCHRG3uGr2m8h24tyVngcWdU6bK", "artist": "mcwtrs", "location": "heds/hedstape/8", "walletId": "0x3bc39bfaa69f6087a93e99c4093943ef8715166c"}, "weight": 6}, "6": {"choice": {"id": 5, "name": "mercifulCIVET", "image": "https://www.heds.cloud/ipfs/QmeCiiyF7ezoXAj5VmWHQBNH2nGmoFsz3cEGuccvC7QKWi", "media": "https://www.heds.cloud/ipfs/QmXvpW67hoPpPTS2YWQ479qK8Ly3KdQKrNufiNNbF4jt3d", "artist": "maxfryy", "location": "heds/hedstape/8", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 5}, "9": {"choice": {"id": 8, "name": "secondNEWT", "image": "https://www.heds.cloud/ipfs/QmdD7WaVVMvTxdMi9jVWN4urcb978c3TnHJDqAG7Yfco5M", "media": "https://www.heds.cloud/ipfs/QmaNHpFPuDkG1dGm2xbfMTrNNBMuwqTvWy2Duft9sN56ov", "artist": "Junomars3d", "location": "heds/hedstape/8", "walletId": "0x94ecdf4a8b94417c28b935faf45b2ea428310d24"}, "weight": 1}, "16": {"choice": {"id": 15, "name": "enthusiasticFISH", "image": "https://www.heds.cloud/ipfs/QmdyCGsZSNUxV65BacUiC8D2U3TkNWjcK983AtNoSStUTK", "media": "https://www.heds.cloud/ipfs/QmSBHMwYCBxGmZjXqydNE38qMZqeGa4k8Bsq5jXYCNnumx", "artist": "alloveprod", "location": "heds/hedstape/8", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 6}, "18": {"choice": {"id": 17, "name": "wide-eyedORYX", "image": "https://www.heds.cloud/ipfs/QmQNaz8KE9mPX5uZont9ouaE9NiTmAXP5VHcMocUwfQJek", "media": "https://www.heds.cloud/ipfs/QmTCTMCpLGcNu29CnL3dBf2nCJJksZuCrfTWiKHyGgLzPm", "artist": "greenringmusic", "location": "heds/hedstape/8", "walletId": "0xc3af8efe3c865b8363a79b13b27db530eb5d24af"}, "weight": 1}, "21": {"choice": {"id": 20, "name": "greasyCAPYBARA", "image": "https://www.heds.cloud/ipfs/QmbrZzRaT14CAxhpYXg9uUiY54P1nLpWh6qb7BRzd4krK3", "media": "https://www.heds.cloud/ipfs/QmZ5t1KFMz5AKdN26YCUbMaoFSP6y1u6mYd6H2mAqt7kSJ", "artist": "itsskinnyatlas", "location": "heds/hedstape/8", "walletId": "0xe32730fa8a8f9592fa7dc3cc0e7262a49c271578"}, "weight": 6}}, "created": 1663617844}, "9": {"vp": 25, "voter": "0x6822d2D69508a086D4C329ea8969484B62cC0F94", "choice": {"1": {"choice": {"id": 0, "name": "abidingRAT", "image": "https://www.heds.cloud/ipfs/QmRD6BaC1487FmfWzAWghTfF828sXxsVGUt1YZtVb1sSNc", "media": "https://www.heds.cloud/ipfs/QmZSpS8aLB7tUeCdmBWQsz45yi9uQysHNach2V98vEQUng", "artist": "_envimusic", "location": "heds/hedstape/9", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 1}, "9": {"choice": {"id": 8, "name": "nostalgicLOVEBIRD", "image": "https://www.heds.cloud/ipfs/QmSra2Ni6bhv7oR2D5SpmJXDWoFnY7jb38QQ9Bp5SCbAKL", "media": "https://www.heds.cloud/ipfs/QmPMmixLJ1sPmojSWAW1MVJggQxoeMy958atiqNadnpUoL", "artist": "maxfryy", "location": "heds/hedstape/9", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 1}, "18": {"choice": {"id": 17, "name": "wickedCHAMELEON", "image": "https://www.heds.cloud/ipfs/QmW1z5ANa47vnrtZvC2gqpSnnoKLYpUab3QKCr7rPXr8ge", "media": "https://www.heds.cloud/ipfs/QmWP6o1uznedpPD6goJyqzxQiyd4okAFc9FoaQogwMQSQH", "artist": "alloveprod", "location": "heds/hedstape/9", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 1}, "19": {"choice": {"id": 18, "name": "plasticCOUGAR", "image": "https://www.heds.cloud/ipfs/QmeJPYZGU6PrfTscAhqZcx45t8tm2VLvGSUpXGVsYB1JHh", "media": "https://www.heds.cloud/ipfs/QmTz1RkutPMY2Gxap12rkfoWQZwj3b1yD14ubXHGUEd5Ys", "artist": "robumusic", "location": "heds/hedstape/9", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 1}, "23": {"choice": {"id": 22, "name": "fumblingORANGUTAN", "image": "https://www.heds.cloud/ipfs/QmdTsmfuim54HKdntWGe72LJXZJyi7goypuuHSg8nGqFhS", "media": "https://www.heds.cloud/ipfs/Qma8kpfjdHjek9wbNWNzWsDfv1LWQtfRhgzmXJVgJipJh9", "artist": "madimakesmusica", "location": "heds/hedstape/9", "walletId": "0xd68892aed5b3a9b1e419b8a2c0d2c6a9c17d7679"}, "weight": 1}, "26": {"choice": {"id": 25, "name": "nextTIGER", "image": "https://www.heds.cloud/ipfs/QmarU3En6BL5gPHJrhRKuwg7xoBdmg17ZawboKAknXZnEH", "media": "https://www.heds.cloud/ipfs/QmcngzsriAe6DiucFuvKheFQaQnAwydvi5tCnc2HzLAYaC", "artist": "itsskinnyatlas", "location": "heds/hedstape/9", "walletId": "0xe32730fa8a8f9592fa7dc3cc0e7262a49c271578"}, "weight": 1}}, "created": 1666034221}, "10": {"vp": 33, "voter": "0x6822d2D69508a086D4C329ea8969484B62cC0F94", "choice": {"1": {"choice": {"id": 0, "name": "coldOPOSSUM", "image": "https://www.heds.cloud/ipfs/QmUwpHb3aimtH73N1YVggdhcoqmb6oJWds6qDVnkijsvGY", "media": "https://www.heds.cloud/ipfs/QmPp1yJ2mk2JChzuiM5iinkMwQeZeqV6quFcY1zwH79LPH", "artist": "_envimusic", "location": "heds/hedstape/10", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 1}, "2": {"choice": {"id": 1, "name": "rigidBIGHORN", "image": "https://www.heds.cloud/ipfs/QmVLVrpfACWGFC8RAJtmRb5q5cUBc5Kr1AK1C2sPZ34pVi", "media": "https://www.heds.cloud/ipfs/QmdWXN5NdVjagap7QVPKCx5QbwPusvD9Sa6aTXLfgvSAjV", "artist": "itsbrendvn", "location": "heds/hedstape/10", "walletId": "0x0f9c4b57f918a3161c906c137e637e2f5b3457a7"}, "weight": 1}, "4": {"choice": {"id": 3, "name": "sordidSHREW", "image": "https://www.heds.cloud/ipfs/QmXR9KtYvRtMGxqvbmh5XbbgPFw84S3jkijPJZxaLroKcr", "media": "https://www.heds.cloud/ipfs/QmX3wA1LeFHi2F6xSndrzsmJkzkGCecpGETAmsHs4Pq8Kk", "artist": "HanzBeats", "location": "heds/hedstape/10", "walletId": "0x1e75586b064ac038b13a9f8c6bfb99e64d8b3e62"}, "weight": 1}, "9": {"choice": {"id": 8, "name": "longingHYENA", "image": "https://www.heds.cloud/ipfs/QmNyKLw6tYP5oiJe6k4yJzid46aCPZ4R1hnSYYCKwK9wSB", "media": "https://www.heds.cloud/ipfs/QmUw2FNXPa8tyPLdBht2t2W5NhXot2ou7rx82aQcadsi5F", "artist": "maxfryy", "location": "heds/hedstape/10", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 1}, "14": {"choice": {"id": 13, "name": "ruddyDONKEY", "image": "https://www.heds.cloud/ipfs/QmXAYi9CuXSQLcjtm6UgWNmnJzhEMpj52bDCkE7ScFZUyA", "media": "https://www.heds.cloud/ipfs/QmXPgdV6i4tRNHpQr7LNxLnAyb2gLwKF6P4cjYkyCtjmVb", "artist": "serboynft", "location": "heds/hedstape/10", "walletId": "0xb57b74a81d2e550128932e8c3978f58ca03205b6"}, "weight": 1}, "15": {"choice": {"id": 14, "name": "wearyGNU", "image": "https://www.heds.cloud/ipfs/QmXxjmLJNYhWrRb3uNaGiXV96Lo6gX1uhTAxLGtGLfnVr2", "media": "https://www.heds.cloud/ipfs/QmYM9EZwWoxTJojuWuPrrHaEY3V9gvb8G66r63dZAHvaYC", "artist": "iamgeorgehooks", "location": "heds/hedstape/10", "walletId": "0xb9c18a66a45ee459ecffb7feb44b32665230d677"}, "weight": 1}, "18": {"choice": {"id": 17, "name": "fearlessSTALLION", "image": "https://www.heds.cloud/ipfs/QmXCxX3zmx1QmsaRFV4EYWQ8mzfFdNXhZstqappgUpUJ2E", "media": "https://www.heds.cloud/ipfs/QmSDq4hSKmqtVz7pkWjy7z7XS64kxuE89375L4LzPDBjrP", "artist": "alloveprod", "location": "heds/hedstape/10", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 1}, "20": {"choice": {"id": 19, "name": "truculentSNAKE", "image": "https://www.heds.cloud/ipfs/QmbX8fMqhos7jbkqtZp32VW1ML6ih9crP33fhA7WpFup3Q", "media": "https://www.heds.cloud/ipfs/QmPde9dE6WjerNYsBYTeZhxYdhp1oLeQFsr89nCgwLq9AH", "artist": "producedbydav", "location": "heds/hedstape/10", "walletId": "0xcb7504c4cb986e80ab4983b44263381f21273482"}, "weight": 1}, "23": {"choice": {"id": 22, "name": "chubbyMOOSE", "image": "https://www.heds.cloud/ipfs/QmZdUUogpAAmSj9zJr7tLXCWMg1nSaGQ8sVjnGPTNDXciE", "media": "https://www.heds.cloud/ipfs/QmQAsYZyC6PKJ3PahvLwwKmqQZNLQ6ESV3bW8KM3gLopqJ", "artist": "Promethulomek", "location": "heds/hedstape/10", "walletId": "0xf56888473f519ccca1288d3fb78db522841a3173"}, "weight": 1}}, "created": 1669062611}, "11": {"vp": 33, "voter": "0x6822d2d69508a086d4c329ea8969484b62cc0f94", "choice": {"1": {"choice": {"id": 0, "name": "roomyCROCODILE", "image": "https://www.heds.cloud/ipfs/QmTcgv9skPrRX9uA6w5UvVYga2S6FKLouV7fgcPi8Buv9L", "media": "https://www.heds.cloud/ipfs/QmWvSojHfBGqRSmyL9xADgxWwyKBnmoFTj8VU1rniAohFf", "artist": "envi", "location": "hed/hedstape/11", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 1}, "12": {"choice": {"id": 11, "name": "sturdyBASILISK", "image": "https://www.heds.cloud/ipfs/QmUaHBdy7QDGD6QsPQzE62UoQnaSBvrMCyoov3WzpkeatP", "media": "https://www.heds.cloud/ipfs/QmXHwQebEQMU6MyKwQ8jkkuR86nAJJ3AqZ4xbXQ72bBZYr", "artist": "max fry", "location": "hed/hedstape/11", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 1}, "14": {"choice": {"id": 13, "name": "relievedJACKAL", "image": "https://www.heds.cloud/ipfs/QmPqihqBwtYf5tWjQr11oqgKeV7a5BQw9TDGFrBL27zFp6", "media": "https://www.heds.cloud/ipfs/QmPtv74EyYMq9fuBeZYku3vcEy4STBdcBDpd4HpZKcH47N", "artist": "TSheds", "location": "hed/hedstape/11", "walletId": "0x8480e77b3df1d804efdc4ed537be189ea91a761b"}, "weight": 1}, "21": {"choice": {"id": 20, "name": "alertGORILLA", "image": "https://www.heds.cloud/ipfs/QmNWHGdFafPd68542oFCogswprucPTt2ZdBsZjamohp84p", "media": "https://www.heds.cloud/ipfs/QmYgrHEiiTTwSkJUUDDYbnH5dbHoCoGRMRU36ssXBEjHtT", "artist": "allove", "location": "hed/hedstape/11", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 1}, "26": {"choice": {"id": 25, "name": "broadHORSE", "image": "https://www.heds.cloud/ipfs/QmNsiGrMEeWmseLdBKotHXxDfXSWuDRsE3thyjLMigx7EY", "media": "https://www.heds.cloud/ipfs/QmdRn6ZWm6vgswjygnPBArAEtAujbCgVr2miJc8nPK9a45", "artist": "soulecist", "location": "hed/hedstape/11", "walletId": "0xffeff45d647ae0e6744c0c4e9283599fed77f7cc"}, "weight": 1}}, "created": 1676406654606, "signature": "0xa203954a54652ad7f1947d5cce34a6f4cba25fa6f43d2f47624fa7d935ca927f075bf1b125e160ad77f813aa2d6a691d3c87db2b1960e779a912412ea725c8cc1c"}}}}',
  },
  {
    id: 290,
    profile_picture:
      'https://storage.googleapis.com/heds-104d8.appspot.com/profilePictures/0x7e8608f5893a6a57602a014ab190f7af8069d1e1.jpeg?GoogleAccessId=firebase-adminsdk-u5n5o%40heds-104d8.iam.gserviceaccount.com&Expires=16447046400&Signature=AyAZwhTKcmUv1iUlzA2BaOH8TOLInQfMCwqkWeuUI%2B3EGcCpD8k36AbkTUlFvHFJvuZLGJRXAEcJtBbjtrPGNAzeAuMXFZxY11Lw%2FtRxToOfIiqUyBf7XBV4hV2EKIaGLNmDwXKd5pJoe%2FL%2Bjl%2B%2FiPFU0oPACWcyRsk%2BbnWwMthVj3ehmVgMMXVJnfqkaWitlF6MqD%2BjV9uO97I4gnIhKGdSWiKQUKCBekOruvdDCPH8PkIgsU%2BrKDynJgdAam%2BbJm%2F0glQOwbqifP%2F9XStQnem3ST%2BFUewUJWT6vzWPhFzMqsLUt72pCHvd%2BkJ6DG%2FYqLCuV7JE4vSuiG7DU%2B68iA%3D%3D',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: 'SuaveMusic',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: 'Musician / Vocalist / Producer. \nFeatured on: hedsTAPE 07 and 11',
    display_name: 'Suave',
    role: 'artist',
    wallet: '0x7e8608f5893a6a57602a014ab190f7af8069d1e1',
    joined: 1.651433064e12,
    spotlight: null,
    collection:
      '{"items": {"0x20F2717F113d0B3815124876F3D72f8E1179341e": {"id": "7", "name": "hedsTAPE 07", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F7.png?alt=media&token=6669ac60-7886-4e4e-a41a-6976afb978aa", "space": "heds", "quantity": 3}, "0x567e687C93103010962F9E9Cf5730Ae8DBFC6d41": {"id": "3", "name": "hedsTAPE 03", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F3.png?alt=media&token=5413c9e1-753a-4c74-8b24-823d78aba1e6", "space": "heds", "quantity": 1}, "0x9f396644ec4b2a2bc3c6cf665d29165dde0e83f1": {"id": "10", "name": "hedsTAPE 10", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F10.png?alt=media&token=9bd7824a-4008-4e12-b70d-f895c5206f3c", "space": "heds", "quantity": 1}, "0xeeb431caa15b526f48ee4db3697fe57ec8223a8e": {"id": "goodsociety", "name": "Good Society", "tape": "collabtape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2FcollabTAPES%2FGood%20Society%2FImages%2FGSCOVER.png?alt=media&token=f93e25d3-e8f2-4c4d-9e1f-25c8b3bd99e5", "space": "heds", "quantity": 1}, "0xfDF7D7FFe3D363f858644057EBC62afABb99152A": {"id": "11", "name": "hedsTAPE 11", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2", "space": "heds", "quantity": 1}}, "lastUpdated": 1679274115255}',
    votes:
      '{"heds": {"hedstape": {"5": {"vp": 5, "voter": "0x7e8608f5893A6a57602A014aB190f7af8069D1E1", "choice": {"15": {"choice": {"id": 14, "name": "strangeOCELOT", "image": "https://www.heds.cloud/ipfs/QmWjrpvHTxrcmHAvztWUwpeTdgcnwmtgBSXqsrjtC4oQR7", "media": "https://www.heds.cloud/ipfs/QmebFAbUz2tyUVgxp5uJwutBXbrBW8f1pjxzetdasca9kd", "artist": "SuaveMusic", "location": "heds/hedstape/5", "walletId": "0x7e8608f5893a6a57602a014ab190f7af8069d1e1"}, "weight": 5}}, "created": 1654606158}, "7": {"vp": 5, "voter": "0x7e8608f5893A6a57602A014aB190f7af8069D1E1", "choice": {"15": {"choice": {"id": 14, "name": "tiredKITTEN", "image": "https://www.heds.cloud/ipfs/QmbKFW11gMQMbZkby9Bsrn9yqUJrbNg1RSGDctYf92mbqY", "media": "https://www.heds.cloud/ipfs/QmRZXjYDgG12cFvjbjwKwzTtfm7TYYz3x7j4hVeugq6px4", "artist": "SuaveMusic", "location": "heds/hedstape/7", "walletId": "0x7e8608f5893a6a57602a014ab190f7af8069d1e1"}, "weight": 9}}, "created": 1660060833}, "8": {"vp": 38, "voter": "0x7e8608f5893A6a57602A014aB190f7af8069D1E1", "choice": {"8": {"choice": {"id": 7, "name": "necessaryELK", "image": "https://www.heds.cloud/ipfs/QmRE2Kir6PxevJCH3VPEUyTPApkivivJZJHJuidu8BtqGi", "media": "https://www.heds.cloud/ipfs/QmVGMcXzP6Vf4YfiHT8j6LRMywUZxdjADJABjTQ5YLSSPf", "artist": "SuaveMusic", "location": "heds/hedstape/8", "walletId": "0x7e8608f5893a6a57602a014ab190f7af8069d1e1"}, "weight": 10}}, "created": 1663614447}, "10": {"vp": 38, "voter": "0x7e8608f5893A6a57602A014aB190f7af8069D1E1", "choice": {"7": {"choice": {"id": 6, "name": "petiteHARE", "image": "https://www.heds.cloud/ipfs/QmaAWwpE27LVQTe1yW3t1mmn8oDTfTHUxHLNrh3PTrbLfw", "media": "https://www.heds.cloud/ipfs/QmfPX2swm9XazrKyQWXdT9QYtYFaGASqzCHPfpGnSjjidX", "artist": "Agwiworld", "location": "heds/hedstape/10", "walletId": "0x56b236d0228072f9864bed97436425eba1a3b1a1"}, "weight": 1}}, "created": 1669222046}, "11": {"vp": 46, "voter": "0x7e8608f5893a6a57602a014ab190f7af8069d1e1", "choice": {"13": {"choice": {"id": 12, "name": "numerousSTARFISH", "image": "https://www.heds.cloud/ipfs/QmT7tvhCBMPQUCdanumiZrYBFseFt6oteoDunv2cUGKiA6", "media": "https://www.heds.cloud/ipfs/QmSmWnYxvXxGdXSmeLdhCKqDBysxWEnea1gCWGgCF6a1hC", "artist": "suave music", "location": "hed/hedstape/11", "walletId": "0x7e8608f5893a6a57602a014ab190f7af8069d1e1"}, "weight": 46}}, "created": 1676475216984, "signature": "0x1a4af983083a5000c4392076c62435dca55304e9c58e4f852af898475de2f18e465327ef4676f85941921da0842a314c98c5be635127d13bbb94ae7133ccf2721b"}}}}',
  },
  {
    id: 327,
    profile_picture:
      'https://storage.googleapis.com/heds-104d8.appspot.com/profilePictures/0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83.jpeg?GoogleAccessId=firebase-adminsdk-u5n5o%40heds-104d8.iam.gserviceaccount.com&Expires=16447046400&Signature=H2Ngxsn7NVSv3ILUDRNHw3c3NL9hSEI0cisJpzZUy%2F5g1lT9Xnhq6hs3wVrpkjik%2BRodU00zusT70uD%2FxnPhEQkWuSRY3jddIV1HZ6Exvd%2B1eHotYj6kH2CjJ%2FLNmBO2r4AgJuGjFqWspTwRy4ZLlU8qCjnbO%2BcoFU3CzFSOMb%2BujM8q4kORUX54bDEbOzpF60wdEprh%2FTqftUOT3%2FIg%2B1pHIp0AALWq%2BdTC8XcIPk%2BppY3PY006WqPXrXxH7FUgVOSi6eLiOxMvrAW3YRzGBmlR4uwJSW2KU4%2FNMJ79sk%2FAcrLz6t2HSI%2BzX%2FjNDiIUx41YoSaDsX2ihVXe0u3BVQ%3D%3D',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: '_harriscole',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '',
    display_name: 'harris cole',
    role: 'artist',
    wallet: '0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83',
    joined: 1.641816e12,
    spotlight: null,
    collection: '{}',
    votes:
      '{"heds": {"hedstape": {"7": {"vp": 6, "voter": "0x8e09b494f20aEadB8d9b3c8B3Bec7Cb6C7e18e83", "choice": {"16": {"choice": {"id": 15, "name": "magicalBURRO", "image": "https://www.heds.cloud/ipfs/QmcPk8j2TVbFog26NxEW2ttNFk66pbLvNjUprVs3LWY4hG", "media": "https://www.heds.cloud/ipfs/QmYEZfVXMb4GyNLysU5MzJnAtHrUi8dV8YmhEon5nybVey", "artist": "_harriscole", "location": "heds/hedstape/7", "walletId": "0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83"}, "weight": 1}}, "created": 1660012679}, "11": {"vp": 20, "voter": "0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83", "choice": {"15": {"choice": {"id": 14, "name": "sourZEBRA", "image": "https://www.heds.cloud/ipfs/QmbWTLst78RqDMDH4Uki9u77AWVG5oY32S1GS42NZa3RG2", "media": "https://www.heds.cloud/ipfs/QmRKhEUSW6YgEwf2Jnnx7k5YyiJBjnmzsyViHLJbsE4cTV", "artist": "harris cole", "location": "hed/hedstape/11", "walletId": "0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83"}, "weight": 20}}, "created": 1676405640448, "signature": "0x48f226dc9b3d0721225fa0eabfc0ba7e53ad64e55b3959049c830f89789aaccb085f6377ce3402b310485010141e25f20ecf526ab4891d629fef3b4cc84c2ca31c"}}}}',
  },
  {
    id: 357,
    profile_picture:
      'https://storage.googleapis.com/heds-104d8.appspot.com/profilePictures/0x9cb848e6d271ad740fdf1cc02bd9e8e0e47f4868.jpeg?GoogleAccessId=firebase-adminsdk-u5n5o%40heds-104d8.iam.gserviceaccount.com&Expires=16447046400&Signature=Znpv3VKEp%2BVzBg%2FJDOXVnLEdzH%2Fb9lh8HhyXiof21v%2BYPE9eOgbStlr032JVTjINeoLXudvPjeCBNkkKdbM8v4DvYxkQeuSSyBHIINUVx1zUpMsl5g2RO8lVEkGOPKRxiVC%2FeFsGK41yuj7SZ9PKKNheMas9FDNgwzHW1vKiU59HIKTO87AD3esLrYemJhfHIBSkMYKJ8%2Fwbw1tvGVVihQuQhE5g955VmoBQvKESclDaSA6U6tHL2GlXirUQ1OJK7l8EieJyB3OSIc2BZaxc6Q9Fkzkj0bmBNiGCB63c%2FTv%2FyO5%2FM1bJOzzfgalRhh%2F8xQaAR5p1aDKDwQ55rQ9XNQ%3D%3D',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: 'rotofosho',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '',
    display_name: 'roto',
    role: 'artist',
    wallet: '0x9cb848e6d271ad740fdf1cc02bd9e8e0e47f4868',
    joined: 1.65138485e12,
    spotlight: null,
    collection: '{}',
    votes:
      '{"heds": {"hedstape": {"8": {"vp": 15, "voter": "0x9cb848e6d271Ad740fdF1CC02Bd9E8e0E47f4868", "choice": {"4": {"choice": {"id": 3, "name": "saltyZEBU", "image": "https://www.heds.cloud/ipfs/QmQVvcMJS9chR2R2DEbLZsBHVupMqCn4XBuSMsmQMuUcrv", "media": "https://www.heds.cloud/ipfs/QmRXCz9iLbueJAQDhY9UCHRG3uGr2m8h24tyVngcWdU6bK", "artist": "mcwtrs", "location": "heds/hedstape/8", "walletId": "0x3bc39bfaa69f6087a93e99c4093943ef8715166c"}, "weight": 3}, "5": {"choice": {"id": 4, "name": "aquaticORYX", "image": "https://www.heds.cloud/ipfs/QmbMiC2SkNPyNBPYFwTWpK17JQt72LtC1KSa76D8nogimr", "media": "https://www.heds.cloud/ipfs/QmbwCZvfdniM6eRu3u1jzCaigC8gNo3KqALHfpmychZ5jC", "artist": "mrmarstoday", "location": "heds/hedstape/8", "walletId": "0x57c32b6ed10c90ee448e87b888608465ff7711b5"}, "weight": 3}, "11": {"choice": {"id": 10, "name": "fatCANARY", "image": "https://www.heds.cloud/ipfs/QmaE1SnqisL9QTGSk9nRULWS53itiJgMS1V4onKmgpv764", "media": "https://www.heds.cloud/ipfs/QmRvp2nMeaQgjANXZr8F3YaxqxhzktKsMgbBFBzpoAbLLF", "artist": "rotofosho", "location": "heds/hedstape/8", "walletId": "0x9cb848e6d271ad740fdf1cc02bd9e8e0e47f4868"}, "weight": 9}}, "created": 1663810280}}}}',
  },
  {
    id: 400,
    profile_picture:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0xb57b74a81d2e550128932e8c3978f58ca03205b6.jpeg?alt=media&token=bbfa4d30-35bb-415e-8974-2c502400253e',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: 'serboynft',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: 'street kid',
    display_name: 'serboy',
    role: 'artist',
    wallet: '0xb57b74a81d2e550128932e8c3978f58ca03205b6',
    joined: 1.675462471603e12,
    spotlight: null,
    collection: '{"items": {}, "lastUpdated": 1675621362688}',
    votes: null,
  },
  {
    id: 433,
    profile_picture:
      'https://storage.googleapis.com/heds-104d8.appspot.com/profilePictures/0xc378d995d8c687ddc1be3094dd243e34097ad81e.jpeg?GoogleAccessId=firebase-adminsdk-u5n5o%40heds-104d8.iam.gserviceaccount.com&Expires=16447046400&Signature=pvUu1waeVmiItNyC3o1DUDG1K0yK2KRQDWLnykJb20tb3cjaPSbtM5PbL5bJJnsXZUxtcLSDzsVPUmt%2Fen5JayYT6mVMZV7PU4eTaczpMH%2BXSJuROEQcK0pQhR0TCJABqhG3JZrkCN9GBmEo7d3tN4O21%2FdbZ%2FQrpSkrqGCoG2eYmJz%2Bd2U7nOz2uRoj%2BWBjY6MV2%2FRDGOgzDw1yHw3dO1wCZMlNv6eXC5g61vmHJX%2BaNcctP%2Fy%2Bzs%2FbiRGD6hRFnVBKo4ammqta5olICjI81hX9SHuq7tjW2V3AaNazZg9JK1zc7wZO5It8RLbanvddA0H1Fe%2FJkMeTV5pAtfoEiA%3D%3D',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: 'robumusic',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '',
    display_name: 'robu',
    role: 'artist',
    wallet: '0xc378d995d8c687ddc1be3094dd243e34097ad81e',
    joined: 1.641816e12,
    spotlight: null,
    collection:
      '{"items": {"0x567e687C93103010962F9E9Cf5730Ae8DBFC6d41": {"id": "3", "name": "hedsTAPE 03", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F3.png?alt=media&token=5413c9e1-753a-4c74-8b24-823d78aba1e6", "space": "heds", "quantity": 1}}, "lastUpdated": 1679273472385}',
    votes:
      '{"heds": {"hedstape": {"4": {"vp": 3, "voter": "0xC378D995D8C687ddc1bE3094dd243E34097AD81E", "choice": {"4": {"choice": {"id": 3, "name": "abrasiveZEBU", "image": "https://www.heds.cloud/ipfs/QmT9eYYGPmeWaCxsftHMZuCWt7M8Shz8ZW8jTvTJKtWPAj", "media": "https://ipfs.io/ipfs/Qme6XPZHwdnCq7Fs4Yaj5wwvdZiEgmqvAHpyzeUnBozPRM", "artist": "brijplease", "location": "heds/hedstape/4", "walletId": "0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c"}, "weight": 1}, "30": {"choice": {"id": 29, "name": "happyHIPPOPOTAMUS", "image": "https://www.heds.cloud/ipfs/QmRW1XJHAmP5tmfwudBHe1NF6CVG2ahcur2RZVfS9pDyxB", "media": "https://ipfs.io/ipfs/QmSkQTsKxMphmbQzaQFaL2pBDHhiito9i7ims5oCrb7Y8M", "artist": "robumusic", "location": "heds/hedstape/4", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 2}}, "created": 1652446232}, "7": {"vp": 5, "voter": "0xC378D995D8C687ddc1bE3094dd243E34097AD81E", "choice": {"24": {"choice": {"id": 23, "name": "beneficialDONKEY", "image": "https://www.heds.cloud/ipfs/QmbAytJHgURMYavKC1Lic2PCJ9cKFEWpVcg4AyGZkFA1t8", "media": "https://www.heds.cloud/ipfs/QmcdCgeQhUoKrXy4Dnn3JhorkJBaTBCdGJxmk1K2Xro2Uw", "artist": "robumusic", "location": "heds/hedstape/7", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 1}, "30": {"choice": {"id": 29, "name": "flatTIGER", "image": "https://www.heds.cloud/ipfs/QmUkGD9cZo7DwqvJrvmc7xB64Szeps7Hmfsf8guqZHAvoD", "media": "https://www.heds.cloud/ipfs/QmVtehWUBr21ZsCqS4unyFSwF7svnUCqcqpQQRH4VVYPeh", "artist": "insowmya_offcl", "location": "heds/hedstape/7", "walletId": "0xe12b7aec386a468762b37cfcaadb459e1e09dc76"}, "weight": 1}}, "created": 1660037497}, "8": {"vp": 20, "voter": "0xC378D995D8C687ddc1bE3094dd243E34097AD81E", "choice": {"17": {"choice": {"id": 16, "name": "modernHARTEBEEST", "image": "https://www.heds.cloud/ipfs/QmdYgVj8o7scqgeAvRKxHisU6rxLoSk2EF8Mmdy3givFCZ", "media": "https://www.heds.cloud/ipfs/QmXRGaE5LUCK7v8fjAyt51bqRuqezNppRbpJjwxekAmkz6", "artist": "robumusic", "location": "heds/hedstape/8", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 1}}, "created": 1663622847}, "9": {"vp": 20, "voter": "0xC378D995D8C687ddc1bE3094dd243E34097AD81E", "choice": {"19": {"choice": {"id": 18, "name": "plasticCOUGAR", "image": "https://www.heds.cloud/ipfs/QmeJPYZGU6PrfTscAhqZcx45t8tm2VLvGSUpXGVsYB1JHh", "media": "https://www.heds.cloud/ipfs/QmTz1RkutPMY2Gxap12rkfoWQZwj3b1yD14ubXHGUEd5Ys", "artist": "robumusic", "location": "heds/hedstape/9", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 1}, "24": {"choice": {"id": 23, "name": "crowdedMARTEN", "image": "https://www.heds.cloud/ipfs/QmR3wBx3LgmDert1Hpit1dNciJMhuMBP4NPWhdJiRYLUGq", "media": "https://www.heds.cloud/ipfs/QmbwcokpxPqKsbdrdB1JF5LySN5SucLAej7m5sbjNSo1FJ", "artist": "insowmya_offcl", "location": "heds/hedstape/9", "walletId": "0xe12b7aec386a468762b37cfcaadb459e1e09dc76"}, "weight": 1}}, "created": 1666087654}, "10": {"vp": 20, "voter": "0xC378D995D8C687ddc1bE3094dd243E34097AD81E", "choice": {"19": {"choice": {"id": 18, "name": "teeny-tinyAARDVARK", "image": "https://www.heds.cloud/ipfs/Qmbg21dTj9JufBeNdPT134eNTBxw2xLTsEtSNA4pJQLUjV", "media": "https://www.heds.cloud/ipfs/QmS6Bxq1qQirKzASTeMcdjNo5EBovNxrpjrtKRU4Zb7cLk", "artist": "robumusic", "location": "heds/hedstape/10", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 1}, "21": {"choice": {"id": 20, "name": "languidPANTHER", "image": "https://www.heds.cloud/ipfs/QmXrXFKi7Zrtn6TEMXbHFvvADDBw9qMJ3gT3PNB4MS4krX", "media": "https://www.heds.cloud/ipfs/QmVkdbyoJALjJppkceTXVZFh1LPSLDSgt1EWRDaWuHo1sj", "artist": "insowmya_offcl", "location": "heds/hedstape/10", "walletId": "0xe12b7aec386a468762b37cfcaadb459e1e09dc76"}, "weight": 1}}, "created": 1669078043}, "11": {"vp": 20, "voter": "0xc378d995d8c687ddc1be3094dd243e34097ad81e", "choice": {"22": {"choice": {"id": 21, "name": "livelyOCTOPUS", "image": "https://www.heds.cloud/ipfs/QmZNnd3FNSdTvUhY7veeMFmZRipxsEGB5AZotZ4RdnrpQs", "media": "https://www.heds.cloud/ipfs/QmXo7RQ4duGFhDPnxwnSd5261FnZNDxsEMbTLVuRbgSrHJ", "artist": "robu", "location": "hed/hedstape/11", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": {"choice": {"id": 21, "name": "livelyOCTOPUS", "image": "https://www.heds.cloud/ipfs/QmZNnd3FNSdTvUhY7veeMFmZRipxsEGB5AZotZ4RdnrpQs", "media": "https://www.heds.cloud/ipfs/QmXo7RQ4duGFhDPnxwnSd5261FnZNDxsEMbTLVuRbgSrHJ", "artist": "robu", "location": "hed/hedstape/11", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 8}}}, "created": 1676748241907, "signature": "0x2e8d3cf72a583b6271747be7c89e6829208b0a5fccca2757151d75e9b18d63ae48f826f06d7bb3843374f20918d292e152f3bb5692dcf3894b62e0613947e7521b"}}}}',
  },
  {
    id: 442,
    profile_picture:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    twitter_handle: 'vaarwellmusic',
    badges:
      '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
    description: '',
    display_name: 'vaarwell',
    role: 'artist',
    wallet: '0xc65c21aadef59c6ced6b180743e68ff325939a13',
    joined: 1.676229667771e12,
    spotlight: null,
    collection:
      '{"items": {"0xfDF7D7FFe3D363f858644057EBC62afABb99152A": {"id": "11", "name": "hedsTAPE 11", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2", "space": "heds", "quantity": 1}}, "lastUpdated": 1678831387483}',
    votes: null,
  },
];
