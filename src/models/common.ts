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

export interface TapeData {
  contract: string;
  curator: string;
  description: string;
  etherscan: string;
  image: string;
  name: string;
  opensea: string;
  route: string;
  tracks: [string];
}
