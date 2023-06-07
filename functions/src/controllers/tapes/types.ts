export interface TapeData {
  id: number;
  contract: string;
  name: string;
  description: string;
  image: string;
  proposal_id: string;
  merkle_root?: string;
  tape_video: string;
  bpm: number;
  timeline: any;
  tape_type: string;
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
