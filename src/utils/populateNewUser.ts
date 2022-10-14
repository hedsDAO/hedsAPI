import { BadgeData } from '../models/common';

const populateNewUser = (wallet: string) => {
  const vistorBadge: BadgeData = {
    description: 'Welcome to heds.',
    image: 'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
    name: 'Visitor',
  };
  const newUserData = {
    profilePicture:
      'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/users%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc',
    banner: "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=652af26f-1f52-4e2d-852e-0b101c60a015",
    twitterHandle: '',
    badges: [vistorBadge],
    description: '',
    displayName: '',
    votingPower: 0,
    wallet: wallet.toLowerCase(),
    role: 0,
    public: false,
  };
  return newUserData;
};

export default populateNewUser;
