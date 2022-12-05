import { createModel } from '@rematch/core';
import { collection, doc, DocumentData, getDoc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
import type { RootModel } from '@/models';
import { User, ArtistMapping, UserRoles } from '../../../models/common';
import { db } from '@/App';

export interface ArtistState {
  artist: User;
  allArtists: Array<User>;
  allCurators: Array<User>;
  artistMapping: ArtistMapping;
  totalArtists: number;
  scrollDataMax: number;
}

export const artistModel = createModel<RootModel>()({
  state: {} as ArtistState,
  selectors: (slice, createSelector, hasProps) => ({
    selectAllCurators() {
      return slice((artistModel) => artistModel.allCurators);
    },
    selectAllArtists() {
      return slice((artistModel) => artistModel.allArtists);
    },
    selectTotalArtists() {
      return slice((artistModel) => artistModel.totalArtists);
    },
    selectScrollDataMax() {
      return slice((artistModel) => artistModel.scrollDataMax);
    },
  }),
  reducers: {
    setUserData: (state, payload: ArtistState) => ({ ...state, ...payload }),
    setAllArtists: (state, allArtists: any) => ({ ...state, allArtists }),
    setAllCurators: (state, allCurators: any) => ({ ...state, allCurators }),
    setArtistMapping: (state, artistMapping: any) => ({ ...state, artistMapping }),
    setScrollDataMax: (state, scrollDataMax: number) => ({ ...state, scrollDataMax: scrollDataMax + 6 }),
    setTotalArtists: (state, totalArtists: number) => ({ ...state, totalArtists }),
  },
  effects: () => ({
    async getArtistData(wallet: string) {
      const docRef = doc(db, 'artists', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setUserData(docSnap.data());
      }
    },
    async getAllArtists() {
      const curatorTank: Array<User> = [];
      const artistTank: Array<User> = [];
      const artistMapping: { [key: string]: User } = {};
      const artistSnapshot = await getDocs(query(collection(db, 'artists'), orderBy('displayName', 'asc')));
      this.setTotalArtists(artistSnapshot.size);
      this.setScrollDataMax(6);
      artistSnapshot.forEach((res: DocumentData) => {
        const currentArtist: User = res.data();
        artistMapping[res.id] = res.data();
        artistTank.push(res.data());
        if (currentArtist.role === UserRoles.CURATOR) curatorTank.push(res.data());
      });
      artistTank.sort((a, b) => a.displayName.localeCompare(b.displayName));
      this.setArtistMapping(artistMapping);
      this.setAllCurators(curatorTank);
      this.setAllArtists(artistTank);
    },
  }),
});
