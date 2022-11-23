import { createModel } from '@rematch/core';
import type { RootModel } from '../../../models';
import { UserListeningHistory, TrackMetadata, TrackStats } from '../../../models/common';
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore, updateDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { DateTime } from 'luxon';

export interface AudioState {
  queue?: TrackMetadata[];
  history?: UserListeningHistory[];
  activeTrack?: TrackMetadata;
  currentTapeId?: any;
  currentTape?: string;
  isPlaying: boolean;
  isLoading: boolean;
  isShowingQueue: boolean;
  volume: number;
  isSample?: boolean;
  currentTime?: [string, number];
  countPlayThreshold: number;
  timerSeconds: number;
  duration?: number;
  isShowingPlayer: boolean;
}

const updateUserListeningHistory = (listeningHistory: UserListeningHistory[], lastListened: number, track: TrackMetadata): UserListeningHistory[] => {
  listeningHistory.unshift({ lastListened, track });
  return [...listeningHistory];
};

export const audioModel = createModel<RootModel>()({
  state: {
    isPlaying: false,
    isLoading: false,
    isShowingQueue: false,
    isShowingPlayer: false,
    volume: 100,
    timerSeconds: 0,
    countPlayThreshold: 0,
    queue: [],
    history: [],
  } as AudioState,
  selectors: (slice, createSelector, hasProps) => ({
    selectIsLoading() {
      return slice((audioModel) => audioModel.isLoading);
    },
    selectIsShowingPlayer() {
      return slice((audioModel) => audioModel.isShowingPlayer);
    },
    selectIsTrackPlaying() {
      return slice((audioModel) => audioModel.isPlaying);
    },
    selectActiveTrack() {
      return slice((audioModel) => audioModel.activeTrack);
    },
    selectActiveTrackAudio() {
      return createSelector(this.selectActiveTrack, (activeTrack: TrackMetadata) => activeTrack.audio);
    },
    selectActiveTrackStats() {
      return createSelector(this.selectActiveTrack, (activeTrack: TrackMetadata) => activeTrack.stats);
    },
    selectListeningHistory() {
      return slice((audioModel) => audioModel.history);
    },
    selectIsShowingQueue() {
      return slice((audioModel) => audioModel.isShowingQueue);
    },
    selectQueue() {
      return slice((audioModel) => audioModel.queue);
    },
    selectIsQueueEmpty() {
      return createSelector(this.selectQueue, (queue: TrackMetadata[]) => (queue.length ? false : true));
    },
    selectAudioVolume() {
      return slice((audioModel) => audioModel.volume);
    },
    selectTimerSeconds() {
      return slice((audioModel) => audioModel.timerSeconds);
    },
    selectCountPlayThreshold() {
      return slice((audioModel) => audioModel.countPlayThreshold);
    },
  }),
  reducers: {
    pushTrackToQueue: (state, track: TrackMetadata) => ({ ...state, queue: [...state.queue, track] }),
    pushTapeToQueue: (state, tape: TrackMetadata[]) => ({ ...state, queue: [...state.queue, ...tape] }),
    shiftQueue: (state) => {
      const newQueue = [...state.queue];
      newQueue.shift();
      return { ...state, queue: newQueue };
    },
    skipToNextTrack: (state) => {
      const newQueue = [...state.queue];
      const newActiveTrack = newQueue.shift();
      if (newQueue?.length === 0) return { ...state, activeTrack: newActiveTrack, queue: newQueue, isShowingQueue: false };
      else return { ...state, activeTrack: newActiveTrack, queue: newQueue };
    },
    skipToPreviousTrack: (state) => {
      const newQueue = [...state.queue];
      const newActiveTrack = newQueue.shift();
      return { ...state, activeTrack: newActiveTrack, queue: newQueue };
    },
    resetTrack: (state) => {
      const newQueue = [...state.queue];
      const newActiveTrack = newQueue.shift();
      return { ...state, activeTrack: newActiveTrack, queue: newQueue };
    },
    removeTrackFromQueue: (state, track: TrackMetadata) => {
      const newQueue = [...state.queue];
      const trackToRemove = state.queue.indexOf(track);
      if (trackToRemove) newQueue.splice(trackToRemove, 1);
      return { ...state, queue: newQueue };
    },
    clearQueue: (state, track: TrackMetadata) => ({ ...state, queue: [] }),
    setListeningHistory: (state, trackListenedTo: UserListeningHistory) => {
      const newHistory = state.history ? [...state.history] : [];
      if (history.length === 5) {
        newHistory.shift();
        newHistory.push(trackListenedTo);
      } else {
        newHistory.push(trackListenedTo);
      }
      return { ...state, history: newHistory };
    },
    setActiveTrack: (state, activeTrack) => ({ ...state, activeTrack }),
    setIsShowingPlayer: (state, isShowingPlayer) => ({ ...state, isShowingPlayer }),
    setIsShowingQueue: (state, isShowingQueue: boolean) => ({ ...state, isShowingQueue }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setCurrentTime: (state, currentTime: [string, number]) => ({ ...state, currentTime }),
    setTimerSeconds: (state, timerSeconds: number) => ({ ...state, timerSeconds }),
    setCountPlayThreshold: (state, duration: number) => ({ ...state, countPlayThreshold: Math.ceil(duration / 4) }),
    setDuration: (state, duration: number) => ({ ...state, duration }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    clearAudioState: (state) => {
      const newState: AudioState = {
        isPlaying: false,
        isLoading: false,
        isShowingQueue: false,
        isShowingPlayer: false,
        volume: 100,
        timerSeconds: 0,
        countPlayThreshold: 0,
        history: [],
        queue: [],
      };
      return newState;
    },
  },
  effects: (dispatch) => ({
    async updateTrackMetadataStats({ track, walletId, newStats }: { track: TrackMetadata; walletId: string; newStats: TrackStats }) {
      //TODO: Make this check in the component
      if (track.stats === newStats) return 'Stats are identical, an update will not be performed';
      const db = getFirestore();
      const userRef = doc(db, 'users', walletId);
      const userSnap = await (await getDoc(userRef)).data();
      const tapeNumber = parseInt(track.tape.slice(-2));

      if (userSnap) {
        const updatedUserData = {
          ...userSnap,
          submissions: {
            heds: {
              hedstape: {
                [tapeNumber]: {
                  stats: newStats,
                },
              },
            },
          },
        };

        try {
          // console.log(updatedUserData);
          // await updateDoc(userRef, updatedUserData);
          // await dispatch.userModel.getUserData(walletId);
        } catch (e) {
          return {
            erorr: e,
            message: e.message,
            memo: 'Call to update user failed',
          };
        }
      }
    },
    async updaterUserListeningHistory({ track, walletId }: { track: TrackMetadata; walletId: string }) {
      const db = getFirestore();
      // console.log(walletId);
      const userRef = doc(db, 'users', '0x6402fe3af805fcee00e9b4b635e689dc0d1fffbf');
      const userSnap = await (await getDoc(userRef)).data();
      // console.log(userSnap);

      if (userSnap) {
        const lastListened = DateTime.now().setZone(process.env.GLOBAL_TIMEZONE).toMillis();
        const newHistory: UserListeningHistory[] = userSnap.history
          ? updateUserListeningHistory(userSnap.history, lastListened, track)
          : [{ lastListened, track }];
        const updatedUserData = { history: newHistory };

        try {
          // console.log(updatedUserData);
          // await updateDoc(userRef, updatedUserData);
          dispatch.audioModel.setListeningHistory({ lastListened, track });
        } catch (e) {
          return {
            erorr: e,
            message: e.message,
            memo: 'Call to update user failed',
          };
        }
      }
    },
  }),
});
