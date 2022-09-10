import React, { Fragment, useEffect } from 'react';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArtistSort } from '../../../src/models/artistModel';
import PaginationBar from '@components/Artists/PaginationBar';
import TapeIcons from '@components/Artists/TapeIcons';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

export const Artists = () => {
  const dispatch = useDispatch<Dispatch>();
  const { allArtists, currentPage, currentSort } = useSelector((state: RootState) => state.artistModel);
  return (
    <>
      <div className="bg-white my-10 pb-20">
        {allArtists && (
          <Fragment>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-4 mb-4">
              <div className="flex flex-1 justify-between px-1">
                <span className="flex items-center text-center uppercase tracking-widest text-gray-200 bg-neutral-950 px-5 py-1 rounded-full shadow-sm gap-x-2">
                  <i className="fa-sharp fa-solid fa-user text-sm"></i> Artists
                </span>
                <button
                  onClick={
                    currentSort === ArtistSort.ALPHA_ASC
                      ? () => dispatch.artistModel.setArtistSort(ArtistSort.ALPHA_DESC)
                      : () => dispatch.artistModel.setArtistSort(ArtistSort.ALPHA_ASC)
                  }
                  className="px-2 bg-neutral-950 rounded-full shadow-sm"
                >
                  <AdjustmentsHorizontalIcon
                    className={
                      currentSort === ArtistSort.ALPHA_ASC
                        ? 'rotate-180 h-5 w-5 text-gray-200 transition-all'
                        : 'h-5 w-5 text-gray-200 transition-all'
                    }
                  />
                </button>
              </div>
              <div className="my-8 grid grid-rows-2 grid-cols-2 gap-y-4 gap-x-3 xl:grid-cols-5 xl:gap-x-4">
                {allArtists.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10).map((artist) => (
                  <div
                    key={artist?.wallet}
                    className="group bg-gray-100 relative rounded-lg p-2 shadow-md border border-neutral-300 col-span-1"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-80 transition-all lg:aspect-square shadow-sm hover:shadow-md">
                      {artist.samples && (
                        <span className="absolute top-4 left-4 lg:top-3.5 lg:left-3.5 flex items-center rounded-full lg:-space-x-1 text-xs bg-gray-100 text-neutral-600 border border-gray-100 px-2 py-0.5 tracking-tight shadow-md font-semibold">
                          <i className="fa-sharp fa-solid fa-waveform-lines mr-1"></i> curator
                        </span>
                      )}
                      <img
                        src={artist?.profilePicture}
                        alt={artist?.displayName}
                        className="h-full w-full object-cover aspect-square object-center lg:h-full lg:w-full rounded-lg shadow-md"
                      />
                      {<TapeIcons user={artist} />}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex justify-start">
                        <h3 className="text-sm text-gray-800 tracking-widest py-1.5 px-3 w-full mt-2 bg-white rounded-lg shadow-sm border border-gray-300">
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
            <PaginationBar />
          </Fragment>
        )}
      </div>
    </>
  );
};
