import { User } from '../models/common';

const icons: { [key: string]: string } = {
  '1': 'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/icons%2Fhedstape%2F1.jpg?alt=media&token=22fd5c42-5906-45f3-9b04-c69cbeb241bd',
  '2': 'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/icons%2Fhedstape%2F2.jpg?alt=media&token=c5647610-bd7c-4504-9d86-33cce70c7ac6',
  '3': 'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/icons%2Fhedstape%2F3.jpg?alt=media&token=75dd221f-d5e1-4864-acc0-d8f30078a91c',
  '4': 'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/icons%2Fhedstape%2F4.jpg?alt=media&token=6a700862-ca61-4118-81a1-51c6489df19d',
  '5': 'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/icons%2Fhedstape%2F5.jpg?alt=media&token=c8c1892c-9918-4fd1-8c85-0909021b9150',
  '6': 'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/icons%2Fhedstape%2F6.jpg?alt=media&token=53f85484-b7b0-4020-9c09-64e4ed570b59',
  '7': 'https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/icons%2Fhedstape%2F7.jpg?alt=media&token=9a620817-2d4a-470c-9e72-1ffb6f84a326',
};

function parseTapeIcons(user: User) {
  const space = 'heds';
  const tape = 'hedstape';
  if (user?.tracks?.[space]?.[tape]) {
    const tapeIcons = Object.keys(user.tracks[space][tape]);
    return tapeIcons.map((num) => icons[num]);
  } else if (user?.samples?.[space]?.[tape]) {
    const tapeIcons = Object.keys(user.samples?.[space][tape]);
    return tapeIcons.map((num) => icons[num]);
  } else return [];
}

export default parseTapeIcons;
