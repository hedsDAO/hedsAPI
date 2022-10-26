import { Fragment, useRef } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { DesktopAudio, MobileAudio } from '@/modules/audio/screens';

const AudioWrapper = ({ children }: { children: JSX.Element }) => {
  const audioData = useSelector((state: RootState) => state.audioModel);
  const wavesurfer = useRef<WaveSurfer | null>(); // source for mobile/desktop audio controls.
  
  return (
    <Fragment>
      {children}
      {audioData?.isShowingPlayer ? (
        <div className="bottom-0 fixed z-50 w-screen">
          <DesktopAudio wavesurfer={wavesurfer} />
          <MobileAudio wavesurfer={wavesurfer} />
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default AudioWrapper;
