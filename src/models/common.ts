/**
 * @name Global
 * @summary Structures used for public user profiles. This can include artists, curators and non-engaged users.
 *
 * @interface ReactChildrenAsProps - returns any number of react children as props from an element.
 */

export interface ReactChildrenAsProps {
  children: React.ReactNode | React.ReactNode[];
}

/**
 * @name UserModels
 * @summary Structures used for public user profiles. This can include artists, curators and non-engaged users.
 *
 * @interface User - Base user model; conditionally set
 * @interface ArtistMapping - Mapping for referencing artists by wallet id.
 * @interface TrackMetadataMapping - individual track, sample and submissions within a tape.
 * @interface BadgeData - Structure for user profile badges.
 */

export interface User {
  profilePicture: string;
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

export interface CuratorMetadata {
  audio: string | null;
  duration: number | null;
  track: string | null;
  profilePicture: string;
  wallet: string;
  displayName: string;
}
