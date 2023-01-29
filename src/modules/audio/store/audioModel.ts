import { createModel } from '@rematch/core';
import type { RootModel } from '../../../models';
import { UserListeningHistory, TrackMetadata, TrackStats, TrackType, UserRoles } from '@/models/common';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
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
  isClosingPlayer: boolean;
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
    isClosingPlayer: false,
    volume: 100,
    timerSeconds: 0,
    countPlayThreshold: 10,
    queue: [],
    history: [],
  } as AudioState,
  selectors: (slice, createSelector, hasProps) => ({
    selectIsLoading() {
      return slice((audioModel) => audioModel?.isLoading);
    },
    selectIsShowingPlayer() {
      return slice((audioModel) => audioModel?.isShowingPlayer);
    },
    selectIsClosingPlayer() {
      return slice((audioModel) => audioModel?.isClosingPlayer);
    },
    selectIsTrackPlaying() {
      return slice((audioModel) => audioModel?.isPlaying);
    },
    selectActiveTrack() {
      return slice((audioModel) => audioModel?.activeTrack);
    },
    selectActiveTrackAudio() {
      return createSelector(this.selectActiveTrack, (activeTrack: TrackMetadata) => activeTrack?.audio);
    },
    selectActiveTrackStats() {
      return createSelector(this.selectActiveTrack, (activeTrack: TrackMetadata) => activeTrack?.stats);
    },
    selectListeningHistory() {
      return slice((audioModel) => audioModel?.history);
    },
    selectIsShowingQueue() {
      return slice((audioModel) => audioModel?.isShowingQueue);
    },
    selectQueue() {
      return slice((audioModel) => audioModel?.queue);
    },
    selectIsQueueEmpty() {
      return createSelector(this.selectQueue, (queue: TrackMetadata[]) => (queue.length ? false : true));
    },
    selectAudioVolume() {
      return slice((audioModel) => audioModel?.volume);
    },
    selectTimerSeconds() {
      return slice((audioModel) => audioModel?.timerSeconds);
    },
    selectCountPlayThreshold() {
      return slice((audioModel) => audioModel?.countPlayThreshold);
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
    setIsClosingPlayer: (state, isClosingPlayer: boolean) => ({ ...state, isClosingPlayer: isClosingPlayer }),
    clearAudioState: (state) => {
      const newState: AudioState = {
        isPlaying: false,
        isLoading: false,
        isShowingQueue: false,
        isShowingPlayer: false,
        isClosingPlayer: false,
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
      console.log('here');
      const db = getFirestore();
      const userRef = doc(db, 'users', walletId);
      const userSnap = await (await getDoc(userRef)).data();
      const updatedUserData = { ...userSnap };
      const { space, tape, id, type } = track;
      if (userSnap) {
        if (type === TrackType.SUBMISSION) {
          updatedUserData.submissions[space][tape][id] = { ...track, stats: newStats };
        } else if (type === TrackType.TRACK) {
          updatedUserData.tracks[space][tape][id] = { ...track, stats: newStats };
        } else if (type === TrackType.COLLAB) {
          updatedUserData.tracks[space][tape][id] = { ...track, stats: newStats };
        } else if (type === TrackType.SAMPLE) {
          updatedUserData.samples[space][tape][id] = { ...track, stats: newStats };
        }
        console.log(updatedUserData, 'updated');
        try {
          const { role } = updatedUserData;
          if (role >= UserRoles.USER) await updateDoc(doc(db, 'users', walletId), { ...updatedUserData });
          if (role >= UserRoles.ARTIST) await updateDoc(doc(db, 'artists', walletId), { ...updatedUserData });
          if (role >= UserRoles.ARTIST) dispatch.artistModel.getAllArtists();
        } catch (e) {
          return { message: e.message, memo: 'Call to update user failed' };
        }
      }
    },
    async updaterUserListeningHistory({ track, walletId }: { track: TrackMetadata; walletId: string }) {
      const db = getFirestore();
      const userRef = doc(db, 'users', walletId.toLowerCase());
      const userSnap = await (await getDoc(userRef)).data();
      if (userSnap) {
        const lastListened = DateTime.now().setZone(process.env.GLOBAL_TIMEZONE).toMillis();
        const newHistory: UserListeningHistory[] = userSnap?.history
          ? updateUserListeningHistory(userSnap.history, lastListened, track)
          : [{ lastListened, track }];
        const updatedUserData = { history: newHistory };
        try {
          await updateDoc(userRef, updatedUserData);
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
    async updateIsClosingPlayer() {
      this.setIsClosingPlayer(true);
      setTimeout(() => {
        this.setIsShowingPlayer(false);
        this.setIsClosingPlayer(false);
      }, 1000);
    },
  }),
});
