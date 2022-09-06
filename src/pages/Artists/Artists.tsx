import React, { Fragment, useEffect } from 'react';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArtistSort } from '../../../src/models/artistModel';
import PaginationBar from '../../../src/components/Artists/PaginationBar';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

export const Artists = () => {
  const dispatch = useDispatch<Dispatch>();
  const { allArtists, currentPage, currentSort } = useSelector((state: RootState) => state.artistModel);
  useEffect(() => {
    dispatch.artistModel.getAllArtists();
  }, []);
  return (
    <>
      <div className="bg-white my-10 pb-20">
        {allArtists && (
          <Fragment>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-4 mb-4">
              <div className="flex flex-1 justify-between">
                <h2 className="text-center font-thin uppercase tracking-widest text-gray-200 bg-neutral-950 px-5 py-1 rounded-full shadow-sm">
                  Artists
                </h2>
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
              <div className="my-8 grid gri-rows-2 grid-cols-2 gap-y-4 gap-x-3 xl:grid-cols-5 xl:gap-x-4">
                {allArtists.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10).map((artist) => (
                  <div
                    key={artist?.wallet}
                    className="group bg-gray-100 relative rounded-lg p-2 shadow-md border border-gray-200 col-span-1"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 transition-all lg:aspect-square shadow-sm hover:shadow-md border border-gray-200">
                      <img
                        src={artist?.profilePicture}
                        alt={artist?.displayName}
                        className="h-full w-full object-cover aspect-square object-center lg:h-full lg:w-full rounded-lg"
                      />
                      {/* <span className="absolute bottom-14 right-3 lg:bottom-10 lg:right-4 flex rounded-full gap-x-1">
                        <img
                        className='h-5 w-5 lg:h-6 lg:w-6 ring-[1px] ring-neutral-300 shadow-sm rounded-full'
                          src={
                            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/icons%2Fht1.jpg?alt=media&token=68fc06d9-4e4b-4fe0-994d-2bf061f57fd2'
                          }
                        />
                         <img
                        className='h-5 w-5 lg:h-6 lg:w-6 ring-[1px] ring-neutral-300 shadow-sm rounded-full'
                          src={
                            'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/icons%2Fht1.jpg?alt=media&token=68fc06d9-4e4b-4fe0-994d-2bf061f57fd2'
                          }
                        />
                      </span> */}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm text-gray-700 font-medium tracking-widest py-2 px-3 w-full mt-2">
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
