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
}

export interface UserCollection {
  [key: string]: {
    name: string;
    image: string;
    quantity: number;
  };
}
