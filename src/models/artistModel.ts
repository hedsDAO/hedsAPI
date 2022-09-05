import { createModel } from '@rematch/core';
import { collection, doc, DocumentData, getDoc, getDocs, limit, orderBy, query, setDoc } from 'firebase/firestore';
import type { RootModel } from '.';
import { User } from './common';
import { populateNewUser } from '../../src/utils/populateNewUser';
import { db } from '../../src/App';

export interface ArtistState {
  artist: User;
  allArtists: Array<User>;
  totalArtists: number;
  totalPages: number;
  currentPage: number;
}

export const artistModel = createModel<RootModel>()({
  state: {} as ArtistState,
  reducers: {
    setUserData: (state, payload: ArtistState) => ({ ...state, ...payload }),
    setAllArtists: (state, allArtists: any) => ({ ...state, allArtists }),
    setTotalArtists: (state, totalArtists: number) => ({ ...state, totalArtists }),
    setTotalPages: (state, totalPages: number) => ({ ...state, totalPages }),
    setCurrentPage: (state, currentPage: number) => ({ ...state, currentPage }),
    setPreviousPage: (state) => {
      const newState = {...state}
      const currentPage = newState.currentPage - 1;
      if (currentPage) return ({...state, currentPage})
      else return ({...state})
    },
    setNextPage: (state) => {
      const newState = {...state};
      const currentPage = newState.currentPage + 1;
      if (currentPage <= newState.totalPages) return ({...state, currentPage})
      else return ({...state})
    },
  },
  effects: () => ({
    async getArtistData(wallet: string) {
      const docRef = doc(db, 'artists', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setUserData(docSnap.data());
      } else {
        const newUserData = populateNewUser(wallet);
        await setDoc(docRef, newUserData).then(() => {
          this.setUserData(newUserData);
        });
      }
    },
    async getAllArtists() {
      const artistTank: Array<User> = [];
      const artistSnapshot = await getDocs(query(collection(db, "artists"), orderBy("displayName", "asc"), limit(10000)));
      this.setTotalArtists(artistSnapshot.size);
      this.setTotalPages(Math.ceil(artistSnapshot.size / 10));
      this.setCurrentPage(1);
      artistSnapshot.forEach((res: DocumentData) => artistTank.push(res.data()));
      this.setAllArtists(artistTank);
    },
  }),
});
