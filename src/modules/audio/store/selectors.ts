import { TrackMetadata } from '@/models/common';
import { RootState } from '@/store';

export const selectActiveTrack = (state: RootState) => state.audioModel?.activeTrack;
export const selectQueue = (state: RootState) => state.audioModel?.queue;
export const selectIsLoading= (state: RootState) => state.audioModel?.isLoading;
export const selectIsShowingPlayer = (state: RootState) => state.audioModel?.isShowingPlayer;
export const selectIsShowingQueue = (state: RootState) => state.audioModel?.isShowingQueue;
export const selectIsQueueEmpty = (state: RootState) => state.audioModel?.queue?.length ? false : true;
export const selectAudioVolume = (state: RootState) => state.audioModel?.volume;
export const selectIsTrackPlaying = (state: RootState) => state.audioModel?.isPlaying;
export const selectTimerSeconds = (state: RootState) => state.audioModel?.timerSeconds;
export const selectCountPlayThreshold = (state: RootState) => state.audioModel?.countPlayThreshold;
export const selectActiveTrackStats = (state: RootState) => state.audioModel?.activeTrack?.stats;