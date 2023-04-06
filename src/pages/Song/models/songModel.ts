import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import axios from 'axios';
import { getCyaniteData } from '@/utils';
import { User } from '@/models/common';

interface Song {
  id: number;
  tape_id: number;
  audio: string;
  cover: string;
  duration: number;
  public: boolean;
  track_name: string;
  type: string;
  submission_data: {
    sub_id?: string;
    sub_image?: string;
    proposal_id?: string;
  };
  cyanite_id: string;
  created: number;
  total_likes: number;
  track_data: {
    track_no?: string;
    tape_name?: string;
  };
  cyanite_data: any;
  artists: User[];
}

export const songModel = createModel<RootModel>()({
  state: {
    song: {} as Song,
  } as any,
  reducers: {
    setSong: (state, song: any) => ({ ...state, song }),
  },
  selectors: (slice) => ({
    selectSong: () => slice((state) => state.song),
    selectSongName: () => slice((state): string | undefined => state.song?.track_name),
    selectSongSubId: () => slice((state): string | undefined => state.song.submission_data?.sub_id),
    selectSongArtists: () => slice((state): User[] => state.song.artists),
    selectSongCover: () => slice((state): string | undefined => state.song.cover),
    selectSongSubImage: () => slice((state): string | undefined => state.song.submission_data?.sub_image),
    selectCyaniteData: () => slice((state): any | undefined => state.song?.cyanite_data),
  }),
  effects: () => ({
    async getSongData(audio: string) {
      const response = await axios.get(`http://localhost:5001/heds-104d8/us-central1/api/songs/${audio}`);
      const cyaniteData = await getCyaniteData(response.data.cyanite_id);
      this.setSong({ ...response.data, cyanite_data: cyaniteData.result });
    },
  }),
});
