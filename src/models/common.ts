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
  public: boolean;
  collection?: UserCollection;
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
  tape: string;
  wallet: string;
}

export interface UserCollection {
  [key: string]: {
    name: string;
    image: string;
    quantity: number;
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
  [tapeId: string]: TapeData;
}

export interface HedsTapes {
  [tapeId: string]: TapeData;
}

export interface CollabTapes {
  [tapeId: string]: TapeData;
}

export interface TapeData {
  contract: string;
  curator: string;
  description: string;
  etherscan: string;
  image: string;
  name: string;
  opensea: string;
  route: string;
  tracks: Array<string>;
  timeline: Timeline;
}

export interface TapeAndTrackData {
  contract: string;
  curator: User;
  description: string;
  etherscan: string;
  image: string;
  name: string;
  opensea: string;
  route: string;
  tracks: Array<User>;
  timeline: Timeline;
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
  MINT,
  CLOSED,
}

export interface Timeline {
  status: number;
  countdowns?: [string, string, string, string, string];
}
