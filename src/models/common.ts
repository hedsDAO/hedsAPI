// USER DATA & MODELS
export interface BadgeData {
  name: string;
  description: string;
  image: string;
}

export interface User {
  profilePicture: string;
  twitterHandle: string;
  badges: Array<BadgeData>;
  description: string;
  displayName: string;
  role: number;
  wallet: string;
}

// ALERTS
export enum Alerts {
  DISCONNECTED = 0,
  NETWORK_CHANGE,
}
