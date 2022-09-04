import React, { Fragment, useEffect } from 'react';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PaginationBar from '../../../src/components/Artists/PaginationBar';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

export const Artists = () => {
  const dispatch = useDispatch<Dispatch>();
  const artistData = useSelector((state: RootState) => state.artistModel);
  useEffect(() => {
    dispatch.artistModel.getAllArtists();
  }, []);

  return (
    <>
      <div className="bg-white px-10 my-10 pb-20">
        {artistData?.allArtists && (
          <Fragment>
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-4">
              <div className="flex flex-1 justify-between">
                <h2 className="text-center font-medium uppercase tracking-widest text-gray-200 bg-neutral-950 px-4 py-1 rounded-full">
                  Artists
                </h2>
                <button className="px-2 bg-neutral-950 rounded-full">
                  <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-200" />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-3 xl:grid-cols-5 xl:gap-x-4">
                {Object.values(artistData?.allArtists).map((artist) => (
                  <div key={artist?.wallet} className="group bg-black relative rounded-lg p-2">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-square">
                      <img
                        src={artist?.profilePicture}
                        alt={artist?.displayName}
                        className="h-full w-full object-cover aspect-square object-center lg:h-full lg:w-full rounded-lg shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm text-neutral-200 font-thin tracking-widest py-2 px-3 w-full mt-2">
                          <Link to={'/u/' + artist.wallet}>
                            <span aria-hidden="true" className="absolute inset-0 truncate" />
                            {artist?.displayName}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <PaginationBar total={artistData?.totalArtists} perPage={10} />
          </Fragment>
        )}
      </div>
    </>
  );
};
