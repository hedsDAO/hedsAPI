export interface UserState {
  badges: Badge[];
  banner: string;
  collection: Collection;
  description: string;
  displayName: string;
  history?: History;
  joined: number;
  likes?: string[];
  profilePicture: string;
  votes?: Vote; // should be object
  wallet: string;
  spotlight?: string;
  role: Role;
}

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
