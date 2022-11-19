import { Fragment, useEffect, useRef } from 'react';
import { Dispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import GlobalAudio from '../../screens/global/GlobalAudio/GlobalAudio';

const AudioWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();
  const audioData = useSelector((state: RootState) => state.audioModel);
  const wavesurfer = useRef<WaveSurfer | null>(); // source for mobile/desktop audio controls.

  useEffect(() => {
    dispatch.audioModel.setIsShowingQueue(false);
  }, []);
  return (
    <Fragment>
      {children}
      {audioData?.isShowingPlayer ? (
        <div className="bottom-0 fixed z-50 w-screen">
          <GlobalAudio wavesurfer={wavesurfer} />
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default AudioWrapper;
