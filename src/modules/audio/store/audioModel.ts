import { createModel } from '@rematch/core';

import type { RootModel } from '../../../models';
import { TrackMetadata, TrackStats } from '../../../models/common';
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";

export interface AudioState {
  queue?: Array<TrackMetadata>;
  history?: Array<TrackMetadata>;
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
      return { ...state, activeTrack: newActiveTrack, queue: newQueue };
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
      if (trackToRemove) newQueue.splice(trackToRemove,1);
      return { ...state, queue: newQueue };
    },
    clearQueue: (state, track: TrackMetadata) => ({ ...state, queue: [] }),
    setActiveTrack: (state, activeTrack) => ({ ...state, activeTrack}),
    setIsShowingPlayer: (state, isShowingPlayer) => ({ ...state, isShowingPlayer }),
    setIsShowingQueue: (state, isShowingQueue: boolean) => ({ ...state, isShowingQueue }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setCurrentTime: (state, currentTime: [string, number]) => ({ ...state, currentTime }),
    setTimerSeconds: (state, timerSeconds: number) => ({ ...state, timerSeconds }),
    setCountPlayThreshold: (state, countPlayThreshold: number) => ({ ...state, countPlayThreshold }),
    setDuration: (state, duration: number) => ({ ...state, duration }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    clearAudioState: (state) => {
      const newState: AudioState = { isPlaying: false, isLoading: false, isShowingQueue: false, isShowingPlayer: false, volume: 100, timerSeconds: 0, countPlayThreshold: 0, queue: [] };
      return newState;
    },
  },
  effects: (dispatch) => ({
    async updateTrackMetadataStats({track, walletId, newStats}: {track: TrackMetadata, walletId: string, newStats: TrackStats}) {
      //TODO: Make this check in the component
      if (track.stats === newStats) return "Stats are identical, an update will not be performed";
      const db = getFirestore();
      const userRef = doc(db, "users", walletId);
      const userSnap = await (await getDoc(userRef)).data();
      const tapeNumber = parseInt(track.tape.slice(-2));

			if (userSnap.exists()) {
				const updatedUserData = { 
          ...userSnap,
          submissions: {
            heds: {
              hedstape: {
                [tapeNumber]: {
                  stats: newStats,
                }
              }
            }
          }
        };

        try {
          await updateDoc(userRef, updatedUserData);
          await dispatch.userModel.getUserData(walletId);
        } catch (e) {
          return {
            erorr: e,
            message: e.message,
            memo: "Call to update user failed",
          }
        }
			}
    },
    async updaterUserListeningHistory({track, walletId}: {track: TrackMetadata, walletId: string}) {
      const db = getFirestore();
      const userRef = doc(db, "users", walletId);
      const userSnap = await (await getDoc(userRef)).data();

      const newHistory = [...userSnap.history, track];

      if (userSnap.exists()) {
				const updatedUserData = { 
          ...userSnap,
          history: newHistory,
        };

        try {
          await updateDoc(userRef, updatedUserData);
          await dispatch.userModel.getUserData(walletId);
        } catch (e) {
          return {
            erorr: e,
            message: e.message,
            memo: "Call to update user failed",
          }
        }
			}
    }
  }),
});
