import React, { createContext, useContext, useReducer } from 'react';
import { Howl } from 'howler';

interface AudioControllerState {
  howlerInstance: Howl | null;
}

const initialState: AudioControllerState = {
  howlerInstance: null,
};

// Context State to handle Howl instance globally.

const AudioControllerContext = createContext<[AudioControllerState, React.Dispatch<any>]>([initialState, () => {}]);

export const useAudioController = () => {
  const contextValue = useContext(AudioControllerContext);
  if (!contextValue) {
    throw new Error('useAudioController must be used within an AudioControllerProvider');
  }
  const [state, dispatch] = contextValue;
  return { state, setState: (newState: Partial<AudioControllerState>) => dispatch(newState) };
};

export const useHowlerInstance = () => {
  const { state } = useAudioController();
  return state.howlerInstance;
};

export const AudioControllerProvider = ({ children }: { children: React.ReactNode }) => {
  const reducer = (state: AudioControllerState, newState: Partial<AudioControllerState>) => ({
    ...state,
    ...newState,
  });

  const contextValue = useReducer(reducer, initialState);

  return <AudioControllerContext.Provider value={contextValue}>{children}</AudioControllerContext.Provider>;
};
