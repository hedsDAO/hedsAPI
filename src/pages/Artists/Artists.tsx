import React, { useEffect } from 'react';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Artists = () => {
  const dispatch = useDispatch<Dispatch>();
  const artistData = useSelector((state: RootState) => state.artistModel);
  useEffect(() => {
    dispatch.artistModel.getAllArtists();
  }, []);

  return (
    <>
      {artistData?.allArtists && (
        <div className="bg-white px-10 my-5">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-medium tracking-widest text-gray-900">Artists</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {Object.values(artistData?.allArtists).map((artist) => (
                <div key={artist?.wallet} className="group relative border-2 border-neutral-700 rounded-lg p-2">
                  <div className="lg:min-h-[16rem] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-64">
                    <img
                      src={artist?.profilePicture}
                      alt={artist?.displayName}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className='flex flex-col justify-center'>
                      <h3 className="text-sm text-gray-800 font-semibold tracking-widest py-2 border-neutral-600 border rounded-lg px-3 w-full shadow-sm mt-2">
                        <Link to={artist.wallet}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {artist?.displayName}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-500 border-neutral-600 border rounded-lg p-2 truncate overflow-hidden text-ellipsis mt-1">{artist?.description || <br />}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
