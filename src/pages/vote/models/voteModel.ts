import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { createClient } from 'hedsvote';

interface VoteState {
  ipfs_hash: string;
  space_id: number;
  signature: string;
  author: string;
  start_time: string;
  end_time: string;
  block: number;
  state: string; // Might be enum
  method: string; // Might be enum
  title: string;
  description: string;
  scores: number[];
  created_at: string;
  choices: Choice[];
  votes: Vote[];
}

interface Choice {
  id: number;
  proposal_id: string;
  image: string;
  wallet_id: string;
  artist: string;
  name: string;
  location: string;
  media: string;
}

interface Vote {
  id: number;
  proposal_id: string;
  signature: string;
  created: string;
  vp: number;
  voter: string;
  vote_choices: VoteChoice[];
}

interface VoteChoice {
  vote_id: number;
  choice_id: number;
  proposal_id: string;
  amount: number;
}

interface ChoiceWithScore extends Choice {
  score: number;
}

const voteObj = {
  ipfs_hash: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
  space_id: 1,
  signature: '0xe8417fce83d56edb6d2351bde06309fad9a16573dee73bf00f41fe931adddd2e',
  author: '0x6402fE3Af805FcEe00E9b4b635e689Dc0d1FFFbF',
  start_time: '2023-04-14T12:58:32.295Z',
  end_time: '2023-04-14T12:58:32.295Z',
  block: 14916970,
  state: 'closed',
  method: 'quadratic',
  title: 'hedsTAPE 05',
  description: 'Select favorite tracks via heds.app/vote/hedstape/5Vote for your favorite tracks.(optional) update votes and re-submit',
  scores: [
    10.803852851319933, 7.806098120587618, 0.198393863014812, 13.382687742575156, 16.06405770701164, 14.156633389647434, 46.94248993782719, 1.7572523908648476,
    38.37672665408755, 8.50392721595014, 21.128464772715855, 20.018702649660977, 50.53589281461776, 12.17234798633347, 4.626273690804264, 87.85896657582272,
    22.143285807659655, 41.88340844776339, 0.198393863014812, 1.9031154036643627, 52.54768734712005, 4.074008753556534, 39.2751327410928, 57.28330387108323,
    58.82048335358883, 13.00155384424514, 14.5544588715696, 7.453849219291299, 25.37539367497259, 21.15315643853629,
  ],
  created_at: '2023-04-14T16:58:32.336Z',
  choices: [
    {
      id: 1,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmRv3K3CEVRZvpABtb91CyAx7vwgXfFYdiyggm7sbHETh2',
      wallet_id: '0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a',
      artist: '_envimusic',
      name: 'foregoingBUDGERIGAR',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmSm3jpkmoy7D64ZHfNkdYiiECG3pfYz2k5ZEggAS1t9ms',
    },
    {
      id: 2,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmQE9LuaJqytYxCatap3XGeFXpP9v7SL2pSABXQf4Lz3EB',
      wallet_id: '0x0fb82b705f3b0140c5c71a2e73b0d2d044308252',
      artist: '808arc',
      name: 'fewBULL',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/Qmd9AjyuXioPCk44M1DMfk6rFuCmAoUKDpUT1RmZYWdYpw',
    },
    {
      id: 3,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmTzAQjNwyQmbZx9AaxuBmbSSCoQyyFF3s4z6dzZzBq6eY',
      wallet_id: '0x1a4df33590ba393616edb995ddd9731cfd0073ed',
      artist: 'baba__music',
      name: 'flatSLOTH',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmarR53oFRukYqmq7DgomygyiDHXp7BjnRgy7wpQBiUqpf',
    },
    {
      id: 4,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmYyVmkgheFypxSDrAsPyyPGCkiZuKQRWswxVKA9xBSfua',
      wallet_id: '0x1d751999d27f4eb8e48a280075dcdce546078fbd',
      artist: 'theneverafter',
      name: 'extra-largeCOATI',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmZQsjzXCxiRxi7bXuiuATqKLF5VFyHDgqhTRJCNbCS398',
    },
    {
      id: 5,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmeqVZxyV82pWEtKVsMbzfw8G8gNMR5JKAXjEq4PYD5Rd4',
      wallet_id: '0x1e75586b064ac038b13a9f8c6bfb99e64d8b3e62',
      artist: 'HanzBeats',
      name: 'wistfulBABOON',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmR3ZEbytpxBCXdbh6S2dQ1QLFtBtGBpW9hpuuUV4XriAZ',
    },
    {
      id: 6,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmPMijzeeVmLkLCZDmNe25LnP8etjR97Z6XW2Z7vpVDqXX',
      wallet_id: '0x20ff4d6e485e625756b4ce13852eb5c2271bc878',
      artist: 'Lestronica',
      name: 'nearMOUNTAIN',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmXbkqvAzWGo7uRvejF83a2z1MiwZavG8NaNyXXxi5GfY7',
    },
    {
      id: 7,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmVYpU2RPpH8QaKzWi7RD8VmkD4ToBV54D9nbTWtkEi8sU',
      wallet_id: '0x2b4706043ba86aeea7395942404a82cc6ee3e861',
      artist: 'iamkabuki',
      name: 'earlyMARMOSET',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmPEvU521unYMpM2w12sRHeWEEkHc853PpKpJz9SvJVMyB',
    },
    {
      id: 8,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmQeLKFSzGo2eT4FZ3cDBYxnXbPbkRvcufhipgfqX9QXV2',
      wallet_id: '0x33da4f6065310067afff2c13004b31479978c921',
      artist: 'Goodnight_Cody',
      name: 'sulkyIGUANA',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmQ7nH59w6mwTLpDXW3HWbDGZ1CY124SMhYsAY2AahLjK7',
    },
    {
      id: 9,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmSCySpQdh1H4nkPafJoiayNBJqTEQXaAKNX63fXyDmjR5',
      wallet_id: '0x3585ca22df80d70f6d1cc0867d8387c360181349',
      artist: 'sofractures',
      name: 'evenOCTOPUS',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmXxCVC73baf3aJnScNuCvAdPeuvmh6bw2oNyn78xmjcud',
    },
    {
      id: 10,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmSZ9yURo8XwcGBSXoTzMq6XmJHTQLXuxonXmf8LJ73DHp',
      wallet_id: '0x4a5a71184bf725b86a132990eae29031aff2ee9e',
      artist: 'mozadomusic',
      name: 'elfinMOUSE',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/Qmb75wbXyaF7VihUphxDPj78oVUahNXbkmZ896tR1h7SBt',
    },
    {
      id: 11,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmYu9yHQ6gfezW58twBHrHqS8AFmZF1UxNaJU89gzFhqhs',
      wallet_id: '0x5e57783b04e8bc5e1083d57a35b8774a42c9be9b',
      artist: 'ralphhendrik',
      name: 'leftMARTEN',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmQHB4X49gu7xz5PJW7ZzhfC9ydFQZYgby1az3uvrBXrQQ',
    },
    {
      id: 12,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/Qmd5pAkm8ovzAHeaHbHTE1tKQiGRj3vH9pxVLhTcxS9aSM',
      wallet_id: '0x6822d2d69508a086d4c329ea8969484b62cc0f94',
      artist: 'maxfryy',
      name: 'acidicMARMOSET',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmTtF3A3tvjKbyRUvRduhrxzNoewNFGBYMaWK4XZWmGZyh',
    },
    {
      id: 13,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmRsZ9Xm7a8nQRa7orBpT6xuwAm2KYCUPDGDQoCWbeXLAi',
      wallet_id: '0x7b7bbb6e6e9a47edfefd70f1ee736ed916b19a49',
      artist: '_fantompower',
      name: 'sadFOX',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmUuYHCkqx3aXiUreUfp4Q9y4feJKR4BQY7gg9QmfgLbZf',
    },
    {
      id: 14,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmRZcyJMJg5NUG4E9GUgLu7Uiy7cTueSkHGuA7jYweBkkP',
      wallet_id: '0x7dac252fd103b348beb747a1ddb561166f51504b',
      artist: 'Towerzzzz',
      name: 'breezyBEAVER',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmP3Uhbq9wyNxhJYfXwSCV21zTfxX7HKwcinHLxQ3Nt48L',
    },
    {
      id: 15,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmWjrpvHTxrcmHAvztWUwpeTdgcnwmtgBSXqsrjtC4oQR7',
      wallet_id: '0x7e8608f5893a6a57602a014ab190f7af8069d1e1',
      artist: 'SuaveMusic',
      name: 'strangeOCELOT',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmebFAbUz2tyUVgxp5uJwutBXbrBW8f1pjxzetdasca9kd',
    },
    {
      id: 16,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmU5qMc1Uo8NWJbgpn2a1bKHJCeK4L14VvUpupy7VB6dNg',
      wallet_id: '0x9069263bb8ca6da625c248d20c4305990a8cffd6',
      artist: 'charlesnimbus',
      name: 'secretGAZELLE',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmbeoqWawJGk94bafRgSK1mCGnJSKKkmwxRpjedQt17wbu',
    },
    {
      id: 17,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmfAKZWzLehU6TA7CPi7rzauvqSLDdNkL4q5xhupW5rz2z',
      wallet_id: '0x9cb848e6d271ad740fdf1cc02bd9e8e0e47f4868',
      artist: 'rotofosho',
      name: 'jumpyCHAMOIS',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmULDahJHrG3mivkd2kcLDzrNw9JdZDgKmRWWVPDnkdccV',
    },
    {
      id: 18,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmZDZ5ngGoAmK5qLvMUDpFFqZLzDCf5FroqGoCATcDhaf1',
      wallet_id: '0xa2103c4c036f8cc82246b2a31b96296c7feafd8c',
      artist: 'whoslethr',
      name: 'reconditePORCUPINE',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmcE1wf4QvYNkoWM1KeC7eUY7ST21BxJCqRygwwhfjDJBF',
    },
    {
      id: 19,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmaZVYGMuHCoDeAx1du3N2a4LPe1HdRxLcYiRcmLeTPYBu',
      wallet_id: '0xa594340b08bb734852d89584bf2bac0d4e41a595',
      artist: 'chugarchugarr',
      name: 'hystericalWARTHOG',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmSbi6GiK3oeUj4Hury5HXzh6TEeSp8SSas2T1yqQd5VQh',
    },
    {
      id: 20,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmTweLMV5MQdZLxdZPGWhgdM3ZWz5zRa6q1AuyNcgtwfpM',
      wallet_id: '0xace262550c35b7c37d723220aa9876a51d9544cf',
      artist: 'lhomie1990',
      name: 'assortedSTARFISH',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmX4YPfLM5tDgPvBaRGcNbco47MuagKCUiMetE1Gu5ppCR',
    },
    {
      id: 21,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmX1GPxvpisaap9SWb3HdTDhCyPWSLkt34YCVyb861AVqC',
      wallet_id: '0xadbd29476fd78f8117e0f11754646f0584c6c272',
      artist: 'sweepsbeats',
      name: 'haplessTURTLE',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmYakKegQPCeeGdRxk3ZBPBtg25PVT3zYCJehKr8N2mpnz',
    },
    {
      id: 22,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmY5zDSVQWVECgoGngQ2XgrVJvjHCDwJbB4cfeePmW8rdE',
      wallet_id: '0xb2111606a3855602bd46b0343ba87396dd11b121',
      artist: 'floro_beats',
      name: 'fancyIGUANA',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmQ3dDsKMgqMcsgsg7v1DfoQAfthJAjVU4MLaSDtot81op',
    },
    {
      id: 23,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmdFjkFereGQv1fNkUEBZDvEXxMJonn8hBjdxsxS5AqrXU',
      wallet_id: '0xb2e53f9c24875051cfd1c3154f5ffa62169d5ed3',
      artist: 'oneohkay',
      name: 'needyLION',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmPFnQiMp7kMTeimxnPmjGe5CCRQxRVwpNF3QvrfZ6qv38',
    },
    {
      id: 24,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmcD7MVKSsU1FugSnnVX8ma4gQGDd8Ln9pFNQRDidD1Dwv',
      wallet_id: '0xb9c18a66a45ee459ecffb7feb44b32665230d677',
      artist: 'iamgeorgehooks',
      name: 'muteKOALA',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmPDTWtuQMiC3tNbAKnWHRcZbhPVLm4q3W71wwjvwEgw3v',
    },
    {
      id: 25,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmQRGnEAz3rc1MRpDXMSFq1cfMQcAdAvLVE18qRKG2SaYr',
      wallet_id: '0xbb81e31f69181c5b74c126d8cc2b036801af04b8',
      artist: 'DeffieDeff',
      name: 'simplisticGEMSBOK',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmaR85tweC8ygWf4nzAjxQdu1mScBo63taDeWMzxWaKSyK',
    },
    {
      id: 26,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmUdXv68HeVNf9oBhJFZDHYDethNHSY13SnzYUcQXEdKas',
      wallet_id: '0xc3af8efe3c865b8363a79b13b27db530eb5d24af',
      artist: 'greenringmusic',
      name: 'wearyAPE',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmTAFVp6G3ZDP7GmNPhKPRwwiiV4PymqE8q8aKmSFYWYcm',
    },
    {
      id: 27,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmZBH3a2na1MeoW78CdgvtTWu7rBJ7mK9QG9aKF1r2DxHp',
      wallet_id: '0xde5bc302fc6d899eab4334602dd15efb20cd745f',
      artist: '_alexanderlewis',
      name: 'fretfulDORMOUSE',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/Qmaf8psHYYhprQpdubAgMrUr4rudLuoeDyoeevweTouRcn',
    },
    {
      id: 28,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmSjcrSN9wS9ppux1mCjSM9pWGDxjiTodPcm1YSGGsrz2F',
      wallet_id: '0xe0c7c3ed0aacff62e8a91a467a0aa51088952fb3',
      artist: 'unclefrnge',
      name: 'tiresomeBIGHORN',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmNmCMVtgBGPPk8J7tLqzDfno95wTzxr1PtC3nyqoTZ274',
    },
    {
      id: 29,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmcEV6FDAjsk23BVTU7coU7s456ximGtruHGf6Rggq95rY',
      wallet_id: '0xe140ee18bde44dad2170561621a7836ad1218240',
      artist: 'sober_rob',
      name: 'likeableALPACA',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmahRZJjS9K9LGi2LuhKdVMMTWRPVSS5MHj9WAZEfWE5YT',
    },
    {
      id: 30,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      image: 'https://www.heds.cloud/ipfs/QmcNGAXkRBAMbWgVMCG5WH61L86DYCtHuwu2kAX5GDjQNz',
      wallet_id: '0xff7759879f9b1b86cbef2d6670dddcd0ccb0f99d',
      artist: 'iamteezr',
      name: 'venomousOPOSSUM',
      location: 'heds/hedstape/5',
      media: 'https://www.heds.cloud/ipfs/QmXe8VLY3TYWteXQiMrGsBLxKy6618tuJZKXMem3dsC65a',
    },
  ],
  votes: [
    {
      id: 1,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x17013f80b2e0eab8b9d479ada5a2d664ba417e125d11915878c1e8f3f7c5ba87',
      created: '1970-01-19T22:40:08.106Z',
      vp: 110,
      voter: '0xeb54D707252Ee9E26E6a4073680Bf71154Ce7Ab5',
      vote_choices: [
        {
          vote_id: 1,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 1,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 1,
          choice_id: 11,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 1,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 1,
          choice_id: 17,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 1,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 2,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xeacb1b889bbd8faf88b1b7cdb5c3dd008a21df1c5c1ff1b72cd45024ba81d09c',
      created: '1970-01-19T22:40:07.580Z',
      vp: 5,
      voter: '0x708EB0DF44d646B18FaA6249b5CA1617181B032b',
      vote_choices: [
        {
          vote_id: 2,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 2,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 2,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 2,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 2,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 3,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x9d7c288228a017a004f4d35a4a284577cc5cab37f914f639a3ab0a26f053d4a4',
      created: '1970-01-19T22:40:05.618Z',
      vp: 65,
      voter: '0x0b6e9673Ce3998295ac23Da5F5EC021D7222cF8E',
      vote_choices: [
        {
          vote_id: 3,
          choice_id: 6,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 3,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 3,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 3,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 3,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 4,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x87c43a7e67d372f7bf79932e5b5095c990dbdbc114a79968fb72cda8019ef354',
      created: '1970-01-19T22:40:00.784Z',
      vp: 11,
      voter: '0x6822d2D69508a086D4C329ea8969484B62cC0F94',
      vote_choices: [
        {
          vote_id: 4,
          choice_id: 1,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 4,
          choice_id: 12,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 4,
          choice_id: 14,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 5,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x432a857fc403efd65920efce4afed4e67628e24a83186faa7898b0b5129205ab',
      created: '1970-01-19T22:39:59.989Z',
      vp: 83,
      voter: '0xBb81E31F69181C5B74C126D8cC2B036801AF04b8',
      vote_choices: [
        {
          vote_id: 5,
          choice_id: 1,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 5,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 5,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 12,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 5,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 5,
          choice_id: 14,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 15,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 22,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 26,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 27,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 29,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 5,
          choice_id: 30,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
      ],
    },
    {
      id: 6,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xfb4e5bc49019eb94aa22667973db93f134aeb11d16a94d64a0847befe2e97684',
      created: '1970-01-19T22:39:58.590Z',
      vp: 7,
      voter: '0x033b83d255d5BBa6E82a14Fe48135634c85e2069',
      vote_choices: [
        {
          vote_id: 6,
          choice_id: 12,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 6,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 6,
          choice_id: 26,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
      ],
    },
    {
      id: 7,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x9adc07a5f866fae672338015ebc60980265501831b4841bb6ff2007b507f43c8',
      created: '1970-01-19T22:39:57.622Z',
      vp: 15,
      voter: '0x47522BaB65A52AA7f12EE1CEb894c4914f533B08',
      vote_choices: [
        {
          vote_id: 7,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 7,
          choice_id: 11,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 7,
          choice_id: 17,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 7,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 7,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 8,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xee853cd40ef7ea21cef3eb4841bd3813445a717f6fc0306cd0524491ca0760f9',
      created: '1970-01-19T22:39:57.132Z',
      vp: 12,
      voter: '0x589FFBbdA0EaCD5A9C2BA208b379c886B2630503',
      vote_choices: [
        {
          vote_id: 8,
          choice_id: 10,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 8,
          choice_id: 11,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 8,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 8,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 8,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
      ],
    },
    {
      id: 9,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xa2c45830660c87d0a3947ee90a11d3320236d6deaeee7e36342686dce6515712',
      created: '1970-01-19T22:39:51.162Z',
      vp: 5,
      voter: '0x4cb026E379524b25f2044cf4B0a9f77e02E4b3aE',
      vote_choices: [
        {
          vote_id: 9,
          choice_id: 12,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 5,
        },
      ],
    },
    {
      id: 10,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x0ee00b03210e72325d7e22689ca2cc717446ce372697223a087b69d4559c91ba',
      created: '1970-01-19T22:39:42.762Z',
      vp: 52,
      voter: '0x4d18f8f2aE19f1E166c97793cceeb70680A2b6D2',
      vote_choices: [
        {
          vote_id: 10,
          choice_id: 5,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 0,
        },
        {
          vote_id: 10,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 10,
          choice_id: 12,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 10,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 8,
        },
        {
          vote_id: 10,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 8,
        },
        {
          vote_id: 10,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 10,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 10,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 10,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 5,
        },
        {
          vote_id: 10,
          choice_id: 28,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 8,
        },
        {
          vote_id: 10,
          choice_id: 29,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 8,
        },
      ],
    },
    {
      id: 11,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xa8e25091557e39877d7d7bb8519256e4139c50585c102f4096e6f8408843a47d',
      created: '1970-01-19T22:38:37.315Z',
      vp: 5,
      voter: '0x4a5A71184Bf725b86a132990EAE29031AFf2eE9e',
      vote_choices: [
        {
          vote_id: 11,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 11,
          choice_id: 10,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
      ],
    },
    {
      id: 12,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x800322e1ec5f49921a3a59c3aabdfa1cc6e92a05757c93e4a7a1882676e68bea',
      created: '1970-01-19T22:37:00.856Z',
      vp: 7,
      voter: '0xC3aF8EfE3c865b8363A79B13B27dB530Eb5D24Af',
      vote_choices: [
        {
          vote_id: 12,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 12,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 12,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 12,
          choice_id: 26,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
      ],
    },
    {
      id: 13,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x83e18997e42fdb63ea364512615cfc30b3c64cf77ecc797cf7d1af02ae7a590c',
      created: '1970-01-19T22:36:55.591Z',
      vp: 28,
      voter: '0x872268BA314E3a571DB7E9eFE30f423041cd9c54',
      vote_choices: [
        {
          vote_id: 13,
          choice_id: 4,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
        {
          vote_id: 13,
          choice_id: 5,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 10,
        },
        {
          vote_id: 13,
          choice_id: 14,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
        {
          vote_id: 13,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 10,
        },
      ],
    },
    {
      id: 14,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x63327c1507d8bc464833f961324498e46001b505716781e27106e615f9a6ed6b',
      created: '1970-01-19T22:36:55.285Z',
      vp: 35,
      voter: '0x880c4F74C3d4C39D75F8e2aD958F40671416bf66',
      vote_choices: [
        {
          vote_id: 14,
          choice_id: 1,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 2,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 3,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 4,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 5,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 6,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 8,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 10,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 11,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 12,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 14,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 15,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 17,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 19,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 20,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 22,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 26,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 27,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 28,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 29,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 14,
          choice_id: 30,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 15,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x037b7f6816cd4a1bbc740f6db6dcc338c70fe484ee8dc8c88ef2c959e1ce6f3f',
      created: '1970-01-19T22:36:46.158Z',
      vp: 5,
      voter: '0x7e8608f5893A6a57602A014aB190f7af8069D1E1',
      vote_choices: [
        {
          vote_id: 15,
          choice_id: 15,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 5,
        },
      ],
    },
    {
      id: 16,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x0c6e7dbb5beb9313adfa79c1476d456bd97b4513f62220da57cd7937e1a25a86',
      created: '1970-01-19T22:36:44.507Z',
      vp: 21,
      voter: '0x65786B3dEe53D4C61E2fd0bd0F7049C2613b376a',
      vote_choices: [
        {
          vote_id: 16,
          choice_id: 2,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 16,
          choice_id: 4,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 16,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 16,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 16,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 17,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x0806573b1fe53bfd0c498f4e54213db9d20ec8603f3c0f4d3ed04474921d2a29',
      created: '1970-01-19T22:36:21.302Z',
      vp: 10,
      voter: '0x958E2EBB40147DFeE318aB640D9f0e66783eC62d',
      vote_choices: [
        {
          vote_id: 17,
          choice_id: 6,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 17,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 17,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
      ],
    },
    {
      id: 18,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0x37ec9bcd691cf2b5b3a07173aa4abb3fb1ec971b09acf1891b63c41bde4f1040',
      created: '1970-01-19T22:36:20.354Z',
      vp: 11,
      voter: '0xe99e025eB6895D787179ef5cb6332A988B18FE37',
      vote_choices: [
        {
          vote_id: 18,
          choice_id: 6,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 18,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 18,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 18,
          choice_id: 22,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 18,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
      ],
    },
    {
      id: 19,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xf1128a1f482ebd3ed8c81715c079d5904f86939fdecf58f282cbdc705111703a',
      created: '1970-01-19T22:36:10.322Z',
      vp: 48,
      voter: '0xD2D22571b06df7a36F24fd84E528fD1bb12fF5cB',
      vote_choices: [
        {
          vote_id: 19,
          choice_id: 5,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 19,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 19,
          choice_id: 8,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 19,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 19,
          choice_id: 10,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 19,
          choice_id: 11,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 19,
          choice_id: 14,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 19,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 19,
          choice_id: 17,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 19,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 19,
          choice_id: 20,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 19,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 19,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 19,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 5,
        },
        {
          vote_id: 19,
          choice_id: 26,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 19,
          choice_id: 27,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
        {
          vote_id: 19,
          choice_id: 29,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 5,
        },
        {
          vote_id: 19,
          choice_id: 30,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
      ],
    },
    {
      id: 20,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xfe2e677d0f1bd972e25303d63a13cec7b118794088ddb31063f624fdce4dee5c',
      created: '1970-01-19T22:36:10.021Z',
      vp: 21,
      voter: '0xd1Dad82179907CbEbecc3a96C17f105D6329C039',
      vote_choices: [
        {
          vote_id: 20,
          choice_id: 5,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 20,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
        {
          vote_id: 20,
          choice_id: 8,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 20,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 10,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 20,
          choice_id: 11,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 20,
          choice_id: 14,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 17,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 20,
          choice_id: 20,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 23,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
        {
          vote_id: 20,
          choice_id: 26,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 20,
          choice_id: 27,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
        {
          vote_id: 20,
          choice_id: 29,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 3,
        },
        {
          vote_id: 20,
          choice_id: 30,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 4,
        },
      ],
    },
    {
      id: 21,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xa4348f38d7a284e83793f30e5d7dd989761f2d6b02edadcdd5f3d4d9ed6d7dd7',
      created: '1970-01-19T22:36:03.523Z',
      vp: 42,
      voter: '0xA5c8A62F221aDeaf8A7c0BEF60044861D9C4b400',
      vote_choices: [
        {
          vote_id: 21,
          choice_id: 1,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 21,
          choice_id: 2,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 21,
          choice_id: 17,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 21,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 21,
          choice_id: 21,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
      ],
    },
    {
      id: 22,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xd9b4c5d29cc08ff47dcbfdae45ce374ef1607a6d765786d054f844aa37327618',
      created: '1970-01-19T22:36:03.174Z',
      vp: 69,
      voter: '0xe140eE18BdE44dAd2170561621A7836Ad1218240',
      vote_choices: [
        {
          vote_id: 22,
          choice_id: 7,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 22,
          choice_id: 9,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 22,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 2,
        },
        {
          vote_id: 22,
          choice_id: 18,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 22,
          choice_id: 24,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 22,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 22,
          choice_id: 27,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 22,
          choice_id: 28,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 22,
          choice_id: 29,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 23,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xbcebd019dbcbde4030055afce7b1074e6e2eba7974d4378f9f6005bfb29d2cfb',
      created: '1970-01-19T22:35:56.736Z',
      vp: 5,
      voter: '0x7B7bBb6E6e9a47edfEfD70f1eE736ED916b19A49',
      vote_choices: [
        {
          vote_id: 23,
          choice_id: 2,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 23,
          choice_id: 5,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 23,
          choice_id: 13,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 23,
          choice_id: 16,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 23,
          choice_id: 26,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
    {
      id: 24,
      proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
      signature: '0xc0b1ec4faf789433b75ebf3fcd31314600ca6a17877ec8cfa7b462255306a2af',
      created: '1970-01-19T22:35:52.824Z',
      vp: 42,
      voter: '0x6402fE3Af805FcEe00E9b4b635e689Dc0d1FFFbF',
      vote_choices: [
        {
          vote_id: 24,
          choice_id: 4,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 24,
          choice_id: 25,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
        {
          vote_id: 24,
          choice_id: 30,
          proposal_id: 'QmXPniiThBcS8KfD7CqsunVB2LoA1mbsyh1KGsuRP9Wfjr',
          amount: 1,
        },
      ],
    },
  ],
};

export const voteModel = createModel<RootModel>()({
  state: { vote: {} as VoteState, calculatedScores: [] as ChoiceWithScore[] },
  reducers: {
    setProposal(state, vote) {
      return { ...state, vote };
    },
  },
  selectors: (slice, createSelector, hasProps) => ({
    selectCurrentVote: () => slice((state) => state.vote),
    selectChoices: () => slice((state) => state.vote.choices),
    selectSortedChoicesByResults: hasProps(function (models, { choices, scores, tapeTrackIds }) {
      return slice((voteModel) => {
        if (!voteModel || !scores) return [];
        const topVotedScores = [...scores].sort((a, b) => b - a).slice(0, 20);
        const totalScore = scores.reduce((acc: number, score: number) => acc + score, 0);

        // const sortedChoicesByResults: ChoiceWithScore[][] = choices.reduce(
        //   (acc: ChoiceWithScore[][], choice: ChoiceWithScore) => {
        //     const scorePercentage = (scores[choice.id] / totalScore) * 100;
        //     const roundedPercentage = Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
        //     if (tapeTrackIds.includes(choice.walletId)) {
        //       choice.score = roundedPercentage;
        //       acc[0].push(choice);
        //       return acc;
        //     } else if (topVotedScores.includes(scores[choice.id])) {
        //       choice.score = roundedPercentage;
        //       acc[1].push(choice);
        //       return acc;
        //     } else {
        //       choice.score = roundedPercentage;
        //       acc[2].push(choice);
        //       return acc;
        //     }
        //   },
        //   [[], [], []],
        // );

        // for (const array of sortedChoicesByResults) {
        //   array.sort((a: SubmissionChoice, b: SubmissionChoice) => b.score - a.score);
        // }

        // return sortedChoicesByResults;
      });
    }),
  }),
  effects: () => ({
    async getProposalById(ipfsHash: string) {
      try {
        const { getProposal } = createClient();
        const response = await getProposal(ipfsHash);
        this.setProposal(response.data);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    },
  }),
});

// instead of when someone clicks on a choice
// instead of grabbing audio source from choice
// grab the associated song of that choice (make a call when someone clicks)

// OR
// grab all the songs from the tape (getTapeSongs)
// and just map it (onClick)

// load that into global audio
