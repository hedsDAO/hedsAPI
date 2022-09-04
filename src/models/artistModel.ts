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
}

export const artistModel = createModel<RootModel>()({
  state: {} as ArtistState,
  reducers: {
    setUserData: (state, payload: ArtistState) => ({ ...state, ...payload }),
    setAllArtists: (state, allArtists: any) => ({ ...state, allArtists }),
    setTotalArtists: (state, totalArtists: number) => ({...state, totalArtists})
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
      const artistTank = {};
      const querySnapshot = await getDocs(collection(db, 'artists'));
      this.setTotalArtists(querySnapshot.size);
      const first = await query(collection(db, 'artists'), orderBy('displayName'), limit(10));
      const documentSnapshots = await getDocs(first);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log('last', lastVisible.data());
      documentSnapshots.forEach((res: DocumentData) => {
        // @ts-ignore
        artistTank[res.id] = res.data();
      });
      this.setAllArtists(artistTank);
    },
  }),
});
