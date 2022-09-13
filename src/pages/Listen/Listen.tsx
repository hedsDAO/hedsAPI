import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';
import { formatTime } from '../../../src/utils/formatTime';

export const Listen = () => {
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { allTapes, currentTracks } = useSelector((state: RootState) => state.tapesModel);
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    if (allTapes && artistMapping) dispatch.tapesModel.getCurrentTape([allTapes, artistMapping, space, tape, id]);
  }, [allTapes, space, tape, id]);
  return (
    <>
      <div className="bg-white my-10 pb-20">
        <div className="max-w-3xl mx-auto w-full flex gap-y-2 flex-col">
          {allTapes &&
            currentTracks &&
            currentTracks?.map((track) => {
              return (
                <div className="flex items-center justify-between border border-neutral-700 rounded-sm p-2 gap-x-4">
                  <div className="flex items-center gap-x-3">
                    <img className="w-8 h-8 rounded-sm" src={track.profilePicture} />
                    <span className="font-semibold tracking-tight text-sm text-neutral-800">{track.displayName}</span>
                  </div>
                  <div className="flex items-center px-2">
                    <audio className='h-8' controls src={track.audio} />{' '}
                  </div>
                  <div className="flex items-center px-2">
                    <span className="font-semibold tracking-tight text-sm text-neutral-800">
                      {formatTime(track.duration)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
