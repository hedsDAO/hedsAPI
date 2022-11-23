import { Dispatch, store } from '@/store';
import { isEmpty } from '@/utils';
import { Switch } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AudioSwitch = () => {
  const dispatch = useDispatch<Dispatch>();
  const isShowingPlayer = useSelector(store.select.audioModel.selectIsShowingPlayer);
  const activeTrack = useSelector(store.select.audioModel.selectActiveTrack);

  return (
    <Fragment>
      {activeTrack?.audio?.length && (
        <Switch
          checked={isShowingPlayer}
          onChange={() => dispatch.audioModel.setIsShowingPlayer(!isShowingPlayer)}
          className={`${isShowingPlayer && !isEmpty(activeTrack) ? 'bg-blue-300' : 'bg-neutral-200'} relative inline-flex h-7 w-12 items-center rounded-sm`}
        >
          <span
            className={`${
              isShowingPlayer && !isEmpty(activeTrack) ? 'translate-x-6 bg-blue-100' : 'translate-x-1 bg-neutral-50'
            } flex items-center text-center justify-center h-5 w-5 transform rounded-sm transition`}
          >
            <i className="fa-solid fa-waveform text-xs my-auto" />
          </span>
        </Switch>
      )}
    </Fragment>
  );
};
