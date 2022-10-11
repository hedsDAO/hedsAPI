import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';
import { formatTime } from '@/utils';
import { TapeData, TrackArtistMetadata, TrackMetadata, User } from '@/models/common';

export const Listen = () => {
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { allTapes, currentTape } = useSelector((state: RootState) => state.tapesModel);
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (allTapes && artistMapping) dispatch.tapesModel.getCurrentTape([allTapes, artistMapping, space, tape, id]);
  }, [allTapes, id]);

  const handlePlay = (currentTrack: TrackArtistMetadata) => {
    const track: TrackMetadata = {
      track: currentTrack.track,
      audio: currentTrack.audio,
      duration: currentTrack.duration,
    };
    const tape: TapeData = allTapes[id];
    const artist: User = artistMapping[currentTrack.wallet];
    dispatch.audioModel.pushToQueue([track, tape, artist]);
  };

  return (
    <>
      <div className="bg-white my-10 pb-20">
        {allTapes && currentTape && (
          <div className="max-w-7xl mx-auto w-full flex gap-y-2 flex-col">
            <div className="flex flex-col items-start justify-between rounded-sm p-2 gap-x-4 mx-1">
              <div className="flex items-center gap-x-3">
                <img className="w-44 h-44 rounded-sm" src={currentTape.image} />
              </div>
              <div className="flex items-center justify-between rounded-sm py-2 gap-x-4">
                <div className="flex items-center gap-x-3">
                  <img className="w-8 h-8 rounded-sm" src={currentTape.curator.profilePicture} />
                  <span className="font-semibold tracking-tight text-sm text-neutral-800">{currentTape.curator.displayName}</span>
                </div>
                {currentTape.curator?.audio && (
                  <div className="flex items-center px-2">
                    <span className="font-semibold tracking-tight text-sm text-neutral-800">{formatTime(currentTape.curator.duration)}</span>
                  </div>
                )}
              </div>
              <span className="font-semibold tracking-tight text-sm text-neutral-800 mt-2">{currentTape.name}</span>
              <div className="flex items-center w-2/5 py-2">
                <p className="text-xs">{currentTape.description}</p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto w-full flex gap-y-2 flex-col">
              {currentTape.tracks &&
                currentTape.tracks?.map((track) => {
                  return (
                    <div onClick={() => handlePlay(track)} key={track.wallet} className="flex items-center justify-between rounded-sm p-2 gap-x-4">
                      <div className="flex items-center gap-x-3">
                        <img className="w-8 h-8 rounded-sm" src={track.profilePicture} />
                        <span className="font-semibold tracking-tight text-sm text-neutral-800">{track.displayName}</span>
                      </div>
                      <div className="flex items-center px-2">{/* <audio className="h-8" controls src={track.audio} />{' '} */}</div>
                      <div className="flex items-center px-2">
                        <span className="font-semibold tracking-tight text-sm text-neutral-800">{formatTime(track.duration)}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
