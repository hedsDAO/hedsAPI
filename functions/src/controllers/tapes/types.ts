export interface TapeData {
    contract: string;
    name: string;
    description: string;
    image: string;
    proposal_id: string;
    video: string;
    bpm: number;
    timeline: any;
    type: 'submission' | 'track' | 'collab' | 'sample' | 'hedsolo';
    splits: string;
    links: any;
  }
  