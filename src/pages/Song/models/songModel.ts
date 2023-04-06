import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import axios from 'axios';
import { getCyaniteData, getSimilarSongs } from '@/utils';
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
  similar_songs: Song[];
}

export const songModel = createModel<RootModel>()({
  state: {
    song: {} as Song,
  } as any,
  reducers: {
    setSong: (state, song: any) => ({ ...state, song }),
    setSimilarSongs: (state, similarSongs: Song[]) => ({ ...state, song: { ...state.song, similar_songs: similarSongs } }),
  },
  selectors: (slice) => ({
    selectSong: () => slice((state) => state.song),
    selectSongName: () => slice((state): string | undefined => state.song?.track_name),
    selectSongSubId: () => slice((state): string | undefined => state.song.submission_data?.sub_id),
    selectSongArtists: () => slice((state): User[] => state.song.artists),
    selectSongCover: () => slice((state): string | undefined => state.song.cover),
    selectSongSubImage: () => slice((state): string | undefined => state.song.submission_data?.sub_image),
    selectCyaniteData: () => slice((state): any | undefined => state.song?.cyanite_data),
    selectSongId: () => slice((state): number | undefined => state.song?.id),
  }),
  effects: () => ({
    async getSongData(audio: string) {
      const response = await axios.get(`http://localhost:5001/heds-104d8/us-central1/api/songs/${audio}`);
      const cyaniteId = response.data.cyanite_id;
      const [audioIds, cyaniteData] = await Promise.all([getSimilarSongs(cyaniteId), getCyaniteData(cyaniteId)]);
      const similarSongs = await axios.post(`http://localhost:5001/heds-104d8/us-central1/api/songs/audio_ids`, { audioIds });
      this.setSong({ ...response.data, cyanite_data: cyaniteData.result });
      this.setSimilarSongs(similarSongs.data);
    },
    async likeSong([userId, songId]: number[]) {
      const response = await axios.post(`http://localhost:5001/heds-104d8/us-central1/api/likes/addLike`, { userId, songId });
      console.log(response.data, 'song like');
    },
  }),
});
