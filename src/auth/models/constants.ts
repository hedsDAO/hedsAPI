import { DateTime } from 'luxon';

export const createNewUserData = (wallet: string): { [key: string]: any } => {
  return {
    badges: JSON.stringify([
      {
        name: 'Visitor',
        image: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
        description: 'Welcome to heds.',
      },
    ]),
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    collection: {},
    description: '',
    display_name: '',
    joined: DateTime.now().toMillis(),
    profile_picture:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc',
    votes: null,
    wallet: wallet?.toLowerCase(),
    spotlight: null,
    role: 'user',
  };
};

export type Whitelist = [
  '0xd7a22c594a8874e53b9630922d13b014e83032bf',
  '0x958e2ebb40147dfee318ab640d9f0e66783ec62d',
  '0xb9f5039273a63275d2f15e3c970bdbfcf47d0a5f',
  '0x5da7351a4cb03c33e11f51841bc614d985812821',
  '0xa4a2ff873929fd58f18388bd07835e0c57648ced',
  '0x1e341aa44c293d95d13d778492d417d1be4e63d5',
  '0x2d87178f1b0ebf1751299a9050c57cfee544679d',
  '0x87715066daf3c2e0a05085a2f1b6087b90aeaf82',
  '0xeaff5716a61a6be7151b3bad141ad2ac3d683bcb',
  '0x0f03e5264108d7fcfc6963483d990c07ff043b93',
  '0xbb81e31f69181c5b74c126d8cc2b036801af04b8',
  '0xb6321c5e3d0a97b8d4218bc15ec95bd8d1f7d639',
  '0x70ee05f3a23819859607e25f19204fed98a5522a',
  '0x0b6e9673ce3998295ac23da5f5ec021d7222cf8e',
  '0x880c4f74c3d4c39d75f8e2ad958f40671416bf66',
  '0xa5c8a62f221adeaf8a7c0bef60044861d9c4b400',
  '0x1762563fb2a6783d2968f1309470094486168d10',
  '0x0a17a9ec3d10b3209d8f7df2e094043cc4ff9916',
  '0x860993dcb240bd1e60f29f1887164f15ffb6a049',
  '0x4e16d9eedcf3dae294d9405df3db42e70fbba574',
  '0xeb54d707252ee9e26e6a4073680bf71154ce7ab5',
  '0x96acf191c0112806f9709366bad77642b99b21a9',
  '0xf8dca3189c747ee1d23bed5d7377121912519efd',
  '0xe0d62cc9233c7e2f1f23fe8c77d6b4d1a265d7cd',
  '0x55313b424de97716c9dfc7f6f97dcaab0234274d',
  '0x3d9456ad6463a77bd77123cb4836e463030bfab4',
  '0x3e397e679fb1adb0ac1facf4679cc222a9dea1a3',
  '0x5b93ff82faaf241c15997ea3975419dddd8362c5',
  '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9',
  '0xd2d22571b06df7a36f24fd84e528fd1bb12ff5cb',
  '0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2',
  '0xe6579058063d8e85fca8a8b3a5eea9f6dd299990',
  '0xcef871b113d2bb5d3fa5dc96d2d288dd38082aae',
  '0xf1ed268dca3de9d2e0b55e6a53ace3ef1ad0a557',
  '0xeeb6faae3094b31859f6b7b34a183ae212e43cfb',
  '0xdd5d3ac28853613300438ec9f3af370b202a449a',
  '0x8ecd3fce6a1bd1372a0e731d15ecea500d35cb3a',
  '0xd5e089906d0c759f27403f3db7ae76007ca09dad',
  '0x17c72771bb6b283bade0c07e0901744c37ff8c41',
  '0xe140ee18bde44dad2170561621a7836ad1218240',
  '0x049cd1f76d337179d0660d6bcbbf7d3b04f4055e',
  '0xa45f48727a8bfdf1adb63ff69fe69ec07426a8b8',
  '0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c',
  '0xbebf76d496a855964845706f12a9f75e9ae6423d',
  '0xe6a5f1690fcda05d9ba0a663b6e7ddf3c97eb7b1',
  '0xe6445bd1d9674fe7fbedad2f56f3b1eaea1b029e',
  '0xbcefc4906b443e4db64e2b00b9af2c39e76c785c',
  '0xbf46d2161045251cb97d0b41929bc1d36044e1a0',
  '0x8a5016858402cb19c3da59a07b5e188ee7fdc655',
  '0xb4a9f7d78c438e972199288ed9c4c1c13693a8fc',
  '0x74667801993b457b8ccf19d03bbbaa52b7fff43b',
  '0x2aab747822b72b9e749252899f19f92e107454dc',
  '0x753e19e3a4b4cddad08ac8f7b606442c096e2f81',
  '0xaffd42ed3e414130f517650e6b75bba5094cd608',
  '0x441bc640742bf34ffa5050ea9f387ceef02c36b7',
  '0x47522bab65a52aa7f12ee1ceb894c4914f533b08',
  '0x87d22ce8e93cd212c87647b16490c6cdaa6b5417',
  '0x6402fe3af805fcee00e9b4b635e689dc0d1fffbf',
  '0xf6f5b3ce3cd7f8c17baef34eba9a2bac74c048ab',
  '0x65786b3dee53d4c61e2fd0bd0f7049c2613b376a',
  '0xa3d1c6ce2d602668f27a7685ddf7ce2a08a7b555',
];

export type TokenMapping = {
  '0x958e2ebb40147dfee318ab640d9f0e66783ec62d': { eth: 2.03; tokenCount: 2030 };
  '0xb9f5039273a63275d2f15e3c970bdbfcf47d0a5f': { eth: 2; tokenCount: 2000 };
  '0x5da7351a4cb03c33e11f51841bc614d985812821': { eth: 1.5; tokenCount: 1500 };
  '0xa4a2ff873929fd58f18388bd07835e0c57648ced': { eth: 1.5; tokenCount: 1500 };
  '0x1e341aa44c293d95d13d778492d417d1be4e63d5': { eth: 1.4; tokenCount: 1400 };
  '0x2d87178f1b0ebf1751299a9050c57cfee544679d': { eth: 1; tokenCount: 1000 };
  '0x87715066daf3c2e0a05085a2f1b6087b90aeaf82': { eth: 0.7; tokenCount: 700 };
  '0xeaff5716a61a6be7151b3bad141ad2ac3d683bcb': { eth: 0.6; tokenCount: 600 };
  '0x0f03e5264108d7fcfc6963483d990c07ff043b93': { eth: 0.6; tokenCount: 600 };
  '0xbb81e31f69181c5b74c126d8cc2b036801af04b8': { eth: 0.5; tokenCount: 500 };
  '0xb6321c5e3d0a97b8d4218bc15ec95bd8d1f7d639': { eth: 0.5; tokenCount: 500 };
  '0x70ee05f3a23819859607e25f19204fed98a5522a': { eth: 0.4; tokenCount: 400 };
  '0x880c4f74c3d4c39d75f8e2ad958f40671416bf66': { eth: 0.4; tokenCount: 400 };
  '0xa5c8a62f221adeaf8a7c0bef60044861d9c4b400': { eth: 0.4; tokenCount: 400 };
  '0x1762563fb2a6783d2968f1309470094486168d10': { eth: 0.4; tokenCount: 400 };
  '0x0a17a9ec3d10b3209d8f7df2e094043cc4ff9916': { eth: 0.4; tokenCount: 400 };
  '0x860993dcb240bd1e60f29f1887164f15ffb6a049': { eth: 0.4; tokenCount: 400 };
  '0x4e16d9eedcf3dae294d9405df3db42e70fbba574': { eth: 0.4; tokenCount: 400 };
  '0xeb54d707252ee9e26e6a4073680bf71154ce7ab5': { eth: 0.3; tokenCount: 300 };
  '0x96acf191c0112806f9709366bad77642b99b21a9': { eth: 0.3; tokenCount: 300 };
  '0xf8dca3189c747ee1d23bed5d7377121912519efd': { eth: 0.2; tokenCount: 200 };
  '0xe0d62cc9233c7e2f1f23fe8c77d6b4d1a265d7cd': { eth: 0.2; tokenCount: 200 };
  '0x55313b424de97716c9dfc7f6f97dcaab0234274d': { eth: 0.2; tokenCount: 200 };
  '0x3d9456ad6463a77bd77123cb4836e463030bfab4': { eth: 0.2; tokenCount: 200 };
  '0x3e397e679fb1adb0ac1facf4679cc222a9dea1a3': { eth: 0.2; tokenCount: 200 };
  '0x5b93ff82faaf241c15997ea3975419dddd8362c5': { eth: 0.2; tokenCount: 200 };
  '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9': { eth: 0.2; tokenCount: 200 };
  '0xd2d22571b06df7a36f24fd84e528fd1bb12ff5cb': { eth: 0.15; tokenCount: 150 };
  '0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2': { eth: 0.12; tokenCount: 120 };
  '0xe6579058063d8e85fca8a8b3a5eea9f6dd299990': { eth: 0.1; tokenCount: 100 };
  '0xcef871b113d2bb5d3fa5dc96d2d288dd38082aae': { eth: 0.1; tokenCount: 100 };
  '0xf1ed268dca3de9d2e0b55e6a53ace3ef1ad0a557': { eth: 0.1; tokenCount: 100 };
  '0xeeb6faae3094b31859f6b7b34a183ae212e43cfb': { eth: 0.1; tokenCount: 100 };
  '0xdd5d3ac28853613300438ec9f3af370b202a449a': { eth: 0.1; tokenCount: 100 };
  '0x8ecd3fce6a1bd1372a0e731d15ecea500d35cb3a': { eth: 0.1; tokenCount: 100 };
  '0xd5e089906d0c759f27403f3db7ae76007ca09dad': { eth: 0.1; tokenCount: 100 };
  '0x17c72771bb6b283bade0c07e0901744c37ff8c41': { eth: 0.1; tokenCount: 100 };
  '0xe140ee18bde44dad2170561621a7836ad1218240': { eth: 0.1; tokenCount: 100 };
  '0x049cd1f76d337179d0660d6bcbbf7d3b04f4055e': { eth: 0.1; tokenCount: 100 };
  '0xa45f48727a8bfdf1adb63ff69fe69ec07426a8b8': { eth: 0.1; tokenCount: 100 };
  '0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c': { eth: 0.1; tokenCount: 100 };
  '0xbebf76d496a855964845706f12a9f75e9ae6423d': { eth: 0.1; tokenCount: 100 };
  '0xe6a5f1690fcda05d9ba0a663b6e7ddf3c97eb7b1': { eth: 0.1; tokenCount: 100 };
  '0xe6445bd1d9674fe7fbedad2f56f3b1eaea1b029e': { eth: 0.1; tokenCount: 100 };
  '0xbcefc4906b443e4db64e2b00b9af2c39e76c785c': { eth: 0.1; tokenCount: 100 };
  '0xbf46d2161045251cb97d0b41929bc1d36044e1a0': { eth: 0.1; tokenCount: 100 };
  '0x8a5016858402cb19c3da59a07b5e188ee7fdc655': { eth: 0.1; tokenCount: 100 };
  '0xb4a9f7d78c438e972199288ed9c4c1c13693a8fc': { eth: 0.1; tokenCount: 100 };
  '0x74667801993b457b8ccf19d03bbbaa52b7fff43b': { eth: 0.1; tokenCount: 100 };
  '0x2aab747822b72b9e749252899f19f92e107454dc': { eth: 0.1; tokenCount: 100 };
  '0x753e19e3a4b4cddad08ac8f7b606442c096e2f81': { eth: 0.1; tokenCount: 100 };
  '0xaffd42ed3e414130f517650e6b75bba5094cd608': { eth: 0.1; tokenCount: 100 };
  '0x441bc640742bf34ffa5050ea9f387ceef02c36b7': { eth: 0.1; tokenCount: 100 };
  '0x47522bab65a52aa7f12ee1ceb894c4914f533b08': { eth: 0.1; tokenCount: 100 };
  '0x87d22ce8e93cd212c87647b16490c6cdaa6b5417': { eth: 0.05; tokenCount: 50 };
  '0x6402fe3af805fcee00e9b4b635e689dc0d1fffbf': { eth: 0.02; tokenCount: 20 };
  '0xf6f5b3ce3cd7f8c17baef34eba9a2bac74c048ab': { eth: 0.01; tokenCount: 10 };
  '0x65786b3dee53d4c61e2fd0bd0f7049c2613b376a': { eth: 0.01; tokenCount: 10 };
  '0xa3d1c6ce2d602668f27a7685ddf7ce2a08a7b555': { eth: 0.01; tokenCount: 10 };
};

const whitelist: Whitelist = [
  '0xd7a22c594a8874e53b9630922d13b014e83032bf',
  '0x958e2ebb40147dfee318ab640d9f0e66783ec62d',
  '0xb9f5039273a63275d2f15e3c970bdbfcf47d0a5f',
  '0x5da7351a4cb03c33e11f51841bc614d985812821',
  '0xa4a2ff873929fd58f18388bd07835e0c57648ced',
  '0x1e341aa44c293d95d13d778492d417d1be4e63d5',
  '0x2d87178f1b0ebf1751299a9050c57cfee544679d',
  '0x87715066daf3c2e0a05085a2f1b6087b90aeaf82',
  '0xeaff5716a61a6be7151b3bad141ad2ac3d683bcb',
  '0x0f03e5264108d7fcfc6963483d990c07ff043b93',
  '0xbb81e31f69181c5b74c126d8cc2b036801af04b8',
  '0xb6321c5e3d0a97b8d4218bc15ec95bd8d1f7d639',
  '0x70ee05f3a23819859607e25f19204fed98a5522a',
  '0x0b6e9673ce3998295ac23da5f5ec021d7222cf8e',
  '0x880c4f74c3d4c39d75f8e2ad958f40671416bf66',
  '0xa5c8a62f221adeaf8a7c0bef60044861d9c4b400',
  '0x1762563fb2a6783d2968f1309470094486168d10',
  '0x0a17a9ec3d10b3209d8f7df2e094043cc4ff9916',
  '0x860993dcb240bd1e60f29f1887164f15ffb6a049',
  '0x4e16d9eedcf3dae294d9405df3db42e70fbba574',
  '0xeb54d707252ee9e26e6a4073680bf71154ce7ab5',
  '0x96acf191c0112806f9709366bad77642b99b21a9',
  '0xf8dca3189c747ee1d23bed5d7377121912519efd',
  '0xe0d62cc9233c7e2f1f23fe8c77d6b4d1a265d7cd',
  '0x55313b424de97716c9dfc7f6f97dcaab0234274d',
  '0x3d9456ad6463a77bd77123cb4836e463030bfab4',
  '0x3e397e679fb1adb0ac1facf4679cc222a9dea1a3',
  '0x5b93ff82faaf241c15997ea3975419dddd8362c5',
  '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9',
  '0xd2d22571b06df7a36f24fd84e528fd1bb12ff5cb',
  '0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2',
  '0xe6579058063d8e85fca8a8b3a5eea9f6dd299990',
  '0xcef871b113d2bb5d3fa5dc96d2d288dd38082aae',
  '0xf1ed268dca3de9d2e0b55e6a53ace3ef1ad0a557',
  '0xeeb6faae3094b31859f6b7b34a183ae212e43cfb',
  '0xdd5d3ac28853613300438ec9f3af370b202a449a',
  '0x8ecd3fce6a1bd1372a0e731d15ecea500d35cb3a',
  '0xd5e089906d0c759f27403f3db7ae76007ca09dad',
  '0x17c72771bb6b283bade0c07e0901744c37ff8c41',
  '0xe140ee18bde44dad2170561621a7836ad1218240',
  '0x049cd1f76d337179d0660d6bcbbf7d3b04f4055e',
  '0xa45f48727a8bfdf1adb63ff69fe69ec07426a8b8',
  '0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c',
  '0xbebf76d496a855964845706f12a9f75e9ae6423d',
  '0xe6a5f1690fcda05d9ba0a663b6e7ddf3c97eb7b1',
  '0xe6445bd1d9674fe7fbedad2f56f3b1eaea1b029e',
  '0xbcefc4906b443e4db64e2b00b9af2c39e76c785c',
  '0xbf46d2161045251cb97d0b41929bc1d36044e1a0',
  '0x8a5016858402cb19c3da59a07b5e188ee7fdc655',
  '0xb4a9f7d78c438e972199288ed9c4c1c13693a8fc',
  '0x74667801993b457b8ccf19d03bbbaa52b7fff43b',
  '0x2aab747822b72b9e749252899f19f92e107454dc',
  '0x753e19e3a4b4cddad08ac8f7b606442c096e2f81',
  '0xaffd42ed3e414130f517650e6b75bba5094cd608',
  '0x441bc640742bf34ffa5050ea9f387ceef02c36b7',
  '0x47522bab65a52aa7f12ee1ceb894c4914f533b08',
  '0x87d22ce8e93cd212c87647b16490c6cdaa6b5417',
  '0x6402fe3af805fcee00e9b4b635e689dc0d1fffbf',
  '0xf6f5b3ce3cd7f8c17baef34eba9a2bac74c048ab',
  '0x65786b3dee53d4c61e2fd0bd0f7049c2613b376a',
  '0xa3d1c6ce2d602668f27a7685ddf7ce2a08a7b555',
];

const tokenMapping: TokenMapping = {
  '0x958e2ebb40147dfee318ab640d9f0e66783ec62d': { eth: 2.03, tokenCount: 2030 },
  '0xb9f5039273a63275d2f15e3c970bdbfcf47d0a5f': { eth: 2, tokenCount: 2000 },
  '0x5da7351a4cb03c33e11f51841bc614d985812821': { eth: 1.5, tokenCount: 1500 },
  '0xa4a2ff873929fd58f18388bd07835e0c57648ced': { eth: 1.5, tokenCount: 1500 },
  '0x1e341aa44c293d95d13d778492d417d1be4e63d5': { eth: 1.4, tokenCount: 1400 },
  '0x2d87178f1b0ebf1751299a9050c57cfee544679d': { eth: 1, tokenCount: 1000 },
  '0x87715066daf3c2e0a05085a2f1b6087b90aeaf82': { eth: 0.7, tokenCount: 700 },
  '0xeaff5716a61a6be7151b3bad141ad2ac3d683bcb': { eth: 0.6, tokenCount: 600 },
  '0x0f03e5264108d7fcfc6963483d990c07ff043b93': { eth: 0.6, tokenCount: 600 },
  '0xbb81e31f69181c5b74c126d8cc2b036801af04b8': { eth: 0.5, tokenCount: 500 },
  '0xb6321c5e3d0a97b8d4218bc15ec95bd8d1f7d639': { eth: 0.5, tokenCount: 500 },
  '0x70ee05f3a23819859607e25f19204fed98a5522a': { eth: 0.4, tokenCount: 400 },
  '0x880c4f74c3d4c39d75f8e2ad958f40671416bf66': { eth: 0.4, tokenCount: 400 },
  '0xa5c8a62f221adeaf8a7c0bef60044861d9c4b400': { eth: 0.4, tokenCount: 400 },
  '0x1762563fb2a6783d2968f1309470094486168d10': { eth: 0.4, tokenCount: 400 },
  '0x0a17a9ec3d10b3209d8f7df2e094043cc4ff9916': { eth: 0.4, tokenCount: 400 },
  '0x860993dcb240bd1e60f29f1887164f15ffb6a049': { eth: 0.4, tokenCount: 400 },
  '0x4e16d9eedcf3dae294d9405df3db42e70fbba574': { eth: 0.4, tokenCount: 400 },
  '0xeb54d707252ee9e26e6a4073680bf71154ce7ab5': { eth: 0.3, tokenCount: 300 },
  '0x96acf191c0112806f9709366bad77642b99b21a9': { eth: 0.3, tokenCount: 300 },
  '0xf8dca3189c747ee1d23bed5d7377121912519efd': { eth: 0.2, tokenCount: 200 },
  '0xe0d62cc9233c7e2f1f23fe8c77d6b4d1a265d7cd': { eth: 0.2, tokenCount: 200 },
  '0x55313b424de97716c9dfc7f6f97dcaab0234274d': { eth: 0.2, tokenCount: 200 },
  '0x3d9456ad6463a77bd77123cb4836e463030bfab4': { eth: 0.2, tokenCount: 200 },
  '0x3e397e679fb1adb0ac1facf4679cc222a9dea1a3': { eth: 0.2, tokenCount: 200 },
  '0x5b93ff82faaf241c15997ea3975419dddd8362c5': { eth: 0.2, tokenCount: 200 },
  '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9': { eth: 0.2, tokenCount: 200 },
  '0xd2d22571b06df7a36f24fd84e528fd1bb12ff5cb': { eth: 0.15, tokenCount: 150 },
  '0x4d18f8f2ae19f1e166c97793cceeb70680a2b6d2': { eth: 0.12, tokenCount: 120 },
  '0xe6579058063d8e85fca8a8b3a5eea9f6dd299990': { eth: 0.1, tokenCount: 100 },
  '0xcef871b113d2bb5d3fa5dc96d2d288dd38082aae': { eth: 0.1, tokenCount: 100 },
  '0xf1ed268dca3de9d2e0b55e6a53ace3ef1ad0a557': { eth: 0.1, tokenCount: 100 },
  '0xeeb6faae3094b31859f6b7b34a183ae212e43cfb': { eth: 0.1, tokenCount: 100 },
  '0xdd5d3ac28853613300438ec9f3af370b202a449a': { eth: 0.1, tokenCount: 100 },
  '0x8ecd3fce6a1bd1372a0e731d15ecea500d35cb3a': { eth: 0.1, tokenCount: 100 },
  '0xd5e089906d0c759f27403f3db7ae76007ca09dad': { eth: 0.1, tokenCount: 100 },
  '0x17c72771bb6b283bade0c07e0901744c37ff8c41': { eth: 0.1, tokenCount: 100 },
  '0xe140ee18bde44dad2170561621a7836ad1218240': { eth: 0.1, tokenCount: 100 },
  '0x049cd1f76d337179d0660d6bcbbf7d3b04f4055e': { eth: 0.1, tokenCount: 100 },
  '0xa45f48727a8bfdf1adb63ff69fe69ec07426a8b8': { eth: 0.1, tokenCount: 100 },
  '0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c': { eth: 0.1, tokenCount: 100 },
  '0xbebf76d496a855964845706f12a9f75e9ae6423d': { eth: 0.1, tokenCount: 100 },
  '0xe6a5f1690fcda05d9ba0a663b6e7ddf3c97eb7b1': { eth: 0.1, tokenCount: 100 },
  '0xe6445bd1d9674fe7fbedad2f56f3b1eaea1b029e': { eth: 0.1, tokenCount: 100 },
  '0xbcefc4906b443e4db64e2b00b9af2c39e76c785c': { eth: 0.1, tokenCount: 100 },
  '0xbf46d2161045251cb97d0b41929bc1d36044e1a0': { eth: 0.1, tokenCount: 100 },
  '0x8a5016858402cb19c3da59a07b5e188ee7fdc655': { eth: 0.1, tokenCount: 100 },
  '0xb4a9f7d78c438e972199288ed9c4c1c13693a8fc': { eth: 0.1, tokenCount: 100 },
  '0x74667801993b457b8ccf19d03bbbaa52b7fff43b': { eth: 0.1, tokenCount: 100 },
  '0x2aab747822b72b9e749252899f19f92e107454dc': { eth: 0.1, tokenCount: 100 },
  '0x753e19e3a4b4cddad08ac8f7b606442c096e2f81': { eth: 0.1, tokenCount: 100 },
  '0xaffd42ed3e414130f517650e6b75bba5094cd608': { eth: 0.1, tokenCount: 100 },
  '0x441bc640742bf34ffa5050ea9f387ceef02c36b7': { eth: 0.1, tokenCount: 100 },
  '0x47522bab65a52aa7f12ee1ceb894c4914f533b08': { eth: 0.1, tokenCount: 100 },
  '0x87d22ce8e93cd212c87647b16490c6cdaa6b5417': { eth: 0.05, tokenCount: 50 },
  '0x6402fe3af805fcee00e9b4b635e689dc0d1fffbf': { eth: 0.02, tokenCount: 20 },
  '0xf6f5b3ce3cd7f8c17baef34eba9a2bac74c048ab': { eth: 0.01, tokenCount: 10 },
  '0x65786b3dee53d4c61e2fd0bd0f7049c2613b376a': { eth: 0.01, tokenCount: 10 },
  '0xa3d1c6ce2d602668f27a7685ddf7ce2a08a7b555': { eth: 0.01, tokenCount: 10 },
};

export { whitelist, tokenMapping };
