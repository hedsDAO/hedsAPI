import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/App';

interface Earnings {
primary: {
  eth: number;
  usd: number;
};
secondary: {
  eth: number;
  usd: number;
};
}

interface Submissions {
total: number;
unique: number;
}

interface Tapes {
total: number;
unique: number;
}

interface Stats {
earnings: Earnings;
submissions: Submissions;
tapes: Tapes;
}

interface ExploreState {
stats: Stats;
}

export const exploreModel = createModel<RootModel>()({
state: {} as ExploreState,
reducers: {
  setExploreStats: (state, stats: Stats) => ({ ...state, stats }),
},
effects: () => ({
  async getExploreStats() {
    const docRef = doc(db, 'explore', 'stats');
    const docSnap = await getDoc(docRef);
    console.log();
    docSnap.exists() ? this.setExploreStats(docSnap.data()) : null;
  },
}),
});
