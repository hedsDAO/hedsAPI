export interface BadgeData {
	name: string;
	description: string;
	image: string;
}

// ALERTS
export enum Alerts {
	DISCONNECTED = 0,
	NETWORK_CHANGE,
}