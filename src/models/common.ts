import { Choice } from 'hedsvote';

/**
 * @name Global
 * @summary Structures used for public user profiles. This can include artists, curators and non-engaged users.
 *
 * @interface ReactChildrenAsProps - returns any number of react children as props from an element.
 * @interface UserRoles - enum mapping for user, artist and curator roles.
 */

export interface ReactChildrenAsProps {
  children: React.ReactNode | React.ReactNode[];
}

export enum UserRoles {
  USER = 0,
  ARTIST,
  CURATOR,
}

/**
 * @name UserModels
 * @summary Structures used for public user profiles. This can include artists, curators and non-engaged users.
 *
 * @interface User - Base user model; conditionally set
 * @interface ArtistMapping - Mapping for referencing artists by wallet id.
 * @interface TrackMetadataMapping - individual track, sample and submissions within a tape.
 * @interface BadgeData - Structure for user profile badges.
 * @interface UserCollection - conditional interface for user collection object.
 */

export interface User {
  profilePicture: string;
  banner: string;
  twitterHandle: string;
  badges: Array<BadgeData>;
  description: string;
  displayName: string;
  role: number;
  wallet: string;
  samples?: TrackMetadataMapping;
  tracks?: TrackMetadataMapping;
  submissions?: TrackMetadataMapping;
  collection?: UserCollection;
  history?: UserListeningHistory[];
  likes?: TrackMetadata[];
  joined: number;
  votes?: UserVoteHistory;
}

export interface TrackMetadataMapping {
  [key: string]: {
    [key: string]: {
      [key: string]: TrackMetadata;
    };
  };
}

export interface BadgeData {
  name: string;
  description: string;
  image: string;
}

export interface ArtistMapping {
  [key: string]: User;
}

export interface TrackMetadata {
  audio: string;
  duration: number;
  track: string;
  artist: string;
  cover: string;
  album: string;
  wallet: string;
  public: boolean;
  stats?: TrackStats;
  type?: TrackType;
  space: string;
  tape: string;
  id: string;
  no?: number;
  subId?: string;
  subImage?: string;
}

export interface TrackStats {
  likes: number;
  likedBy: { [key: string]: boolean };
  plays: number;
}

export enum TrackType {
  SUBMISSION = 0,
  TRACK,
  SAMPLE,
  COLLAB,
}

export interface UserListeningHistory {
  lastListened: number;
  track: TrackMetadata;
}

export interface UserCollection {
  items: { [key: string]: UserCollectionItem };
  lastUpdated: number;
}

export interface UserCollectionItem {
  name: string;
  image: string;
  quantity: number;
  space: string;
  tape: string;
  id: string;
}

export interface UserVoteHistory {
  [key: string]: {
    [key: string]: {
      [key: string]: UserVote;
    };
  };
}

export interface UserVote {
  choice?: UserVoteChoice;
  choiceId?: number;
  created: number;
  scores?: number[];
  signature: string;
  voter: string;
  vp: number;
}

export interface UserVoteChoice {
  [key: string]: {
    choice: Choice;
    weight: number;
  };
}

/**
 * @name TapeModels
 * @summary Properties used for tapes, tracks and artist metadata.
 *
 * @interface AllTapes - Stucture for referencing tapes by tape name and id.
 * @interface TapeData - Tape data when pulled from database
 * @interface TapeAndTrackData - @type {TapeData} that includes artist, audio & sample metadata.
 * @interface TrackArtistMetadata - structure of an individual track or sample within a tape.
 */

export interface AllTapes {
  [tapeId: string]: { [tapeId: string]: TapeData };
}

export interface TapeData {
  bpm: number;
  contract: string;
  curator: string;
  description: string;
  etherscan: string;
  image: string;
  merkleRoot?: string;
  name: string;
  opensea: string;
  route: string;
  proposalId?: string;
  splits?: TapeSplits;
  tracks: Array<string>;
  timeline: Timeline;
  space: string;
  tape: string;
  id: string;
  video: string;
}

export interface TapeAndTrackData {
  bpm: number;
  contract: string;
  curator: User;
  description: string;
  etherscan: string;
  image: string;
  merkleRoot?: string;
  name: string;
  opensea: string;
  route: string;
  proposalId?: string;
  splits?: TapeSplits;
  tracks?: Array<User>;
  timeline: Timeline;
  space: string;
  tape: string;
  id: string;
  video: string;
}

export interface TrackArtistMetadata {
  audio: string;
  duration: number;
  track: string;
  artist: string;
  cover: string;
  tape: string;
  wallet: string;
}

export enum TimelineStatus {
  PRIVATE = 0,
  SUBMIT,
  VOTE,
  CURATE,
  PREMINT,
  MINT,
  CLOSED,
}

export interface Timeline {
  submit: {
    start: number;
    end: number;
  };
  vote: {
    start: number;
    end: number;
  };
  mint: {
    start: number;
    end: number;
  };
  premint?: {
    start: number;
    end: number;
  };
}

export interface TapeSplits {
  primary: string;
  secondary: string;
}
