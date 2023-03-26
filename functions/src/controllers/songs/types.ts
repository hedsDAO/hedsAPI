export interface SongData {
    audio: string;
    cover: string;
    duration: number;
    isPublic: boolean;
    track_name: string;
    type: string; 
    submission_data: any; 
    cyanite_id: string;
    created: Date;
    total_likes: number;
  }
  
  export interface SongArtistData {
    user_id: number;
    verified: boolean;
    ownership_percent: number;
  }
  