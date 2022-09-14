// USER DATA & MODELS
export interface BadgeData {
  name: string;
  description: string;
  image: string;
}

export interface TrackMetadata {
  audio: string;
  duration: number;
  track: string;
}

export interface User {
  profilePicture: string;
  twitterHandle: string;
  badges: Array<BadgeData>;
  description: string;
  displayName: string;
  samples?: SampleMapping;
  tracks?: TrackMapping;
  role: number;
  wallet: string;
}

export interface ArtistMapping {
  [key: string]: User;
}

export interface SampleMapping {
  [key: string]: {
    [key: string]: {
      [key: string]: TrackMetadata;
    };
  };
}

export interface TrackMapping {
  [key: string]: {
    [key: string]: {
      [key: string]: TrackMetadata;
    };
  };
}

// ** Alerts **
export enum Alerts {
  DISCONNECTED = 0,
  NETWORK_CHANGE,
}

/**
 * @name TapeModels
 * @summary Properties used for tapes, tracks and artist metadata.
 *
 * @interface AllTapes - Stucture for referencing tapes by tape name and id.
 * @interface TapeData - Tape data when pulled from database
 * @interface TapeAndTrackData - @type {TapeData} that includes artist, audio & sample metadata.
 * @interface TrackArtistMetadata - structure of an individual track or sample within a tape.
 *
 */

export interface AllTapes {
  [tapeName: string]: {
    [tapeId: string]: TapeData;
  };
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
}

export interface TapeAndTrackData {
  contract: string;
  curator: TrackArtistMetadata;
  description: string;
  etherscan: string;
  image: string;
  name: string;
  opensea: string;
  route: string;
  tracks: Array<TrackArtistMetadata>;
}

export interface TrackArtistMetadata {
  audio: string;
  duration: number;
  track: string;
  profilePicture: string;
  wallet: string;
  displayName: string;
}
