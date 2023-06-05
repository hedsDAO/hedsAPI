export interface TapeData {
  id: number;
  contract: string;
  name: string;
  description: string;
  image: string;
  proposal_id: string;
  merkle_root?: string;
  video: string;
  bpm: number;
  timeline: any;
  type: 'submission' | 'track' | 'collab' | 'sample' | 'hedsolo';
  splits: string;
  links: any;
  sample_artists: SampleArtist[];
}
export interface SampleArtist {
  id: number;
  display_name: string;
  profile_picture: string;
  wallet: string;
}
