import { Fragment } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { DesktopAudio, MobileAudio } from '@/modules/audio/pages';
import { Transition } from '@headlessui/react';

const AudioWrapper = ({ children }: { children: JSX.Element }) => {
  const audioData = useSelector((state: RootState) => state.audioModel);
  return (
    <Fragment>
      {children}
      {Boolean(audioData?.queue?.length) && (
        <div className="bottom-0 fixed z-50 w-screen">
          <DesktopAudio />
          <MobileAudio />
        </div>
      )}
    </Fragment>
  );
};

export default AudioWrapper;
