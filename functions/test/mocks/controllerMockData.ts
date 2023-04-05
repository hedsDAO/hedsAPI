import { UserData } from '../../src/controllers/users/types';
import { SongData } from '../../src/controllers/songs/types';
import { TapeData } from '../../src/controllers/tapes/types';

export const mockUserData: UserData = {
  badges: [],
  banner: 'https://example.com/user_banner.jpg',
  collection: [],
  description: 'A sample user description',
  display_name: 'Sample User',
  history: [],
  joined: 1617621718,
  profile_picture: 'https://example.com/user_profile_picture.jpg',
  votes: [],
  wallet: '0x12345abcde',
  spotlight: 'https://example.com/user_spotlight.jpg',
  role: 'user',
};

export const mockSongData: SongData = {
  audio: 'https://example.com/song_audio.mp3',
  cover: 'https://example.com/song_cover.jpg',
  duration: 180,
  isPublic: true,
  track_name: 'Sample Song',
  type: 'electronic',
  submission_data: {},
  cyanite_id: '12345',
  created: new Date('2021-04-01T00:00:00.000Z'),
  total_likes: 10,
};

export const mockTapeData: TapeData = {
  contract: '0x67890fedcba',
  name: 'Sample Tape',
  description: 'A sample tape description',
  image: 'https://example.com/tape_image.jpg',
  proposal_id: '98765',
  video: 'https://example.com/tape_video.mp4',
  bpm: 120,
  timeline: {},
  type: 'submission',
  splits: '50-50',
  links: {},
};
