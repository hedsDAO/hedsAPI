import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

interface Badge {
  description: string;
  image: string;
  name: string; // can change to enum
}
interface Collection {
  lastUpdated: number;
  items: CollectionItem[];
}

interface CollectionItem {
  image: string;
  quantity: number;
  tapeId: number;
}

interface History {
  lastListened: number;
  songId: string;
}

interface Vote {
  voteId: number; // need to add vote object
}

enum Role {
  USER,
  ARTIST,
  ADMIN,
}

export interface UserResponse {
  id: number;
  badges: string;
  banner: string;
  collection: string;
  description: string;
  display_name: string;
  history: string;
  joined: number;
  likes?: number;
  profile_picture: string;
  songs: number[];
  votes?: string;
  wallet: string;
  spotlight?: string;
  role: Role;
}

export interface UserState {
  id: number | undefined;
  badges: Badge[];
  banner: string;
  collection: Collection | undefined;
  description: string;
  displayName: string;
  history?: History;
  joined: number;
  likes?: number[];
  profilePicture: string;
  songs?: number[];
  votes?: Vote; // should be object
  wallet: string;
  spotlight?: string;
  role: Role | undefined;
}

export const userModel = createModel<RootModel>()({
  state: {
    id: undefined,
    badges: [],
    banner: '',
    collection: undefined,
    description: '',
    displayName: '',
    joined: undefined,
    profilePicture: '',
    wallet: '',
    role: undefined,
  },
});
