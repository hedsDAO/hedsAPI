import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';

export const Tapes = () => {
  const [currentTape, setCurrentTape] = useState<string>('hedstape');
  const dispatch = useDispatch<Dispatch>();
  const tapesData = useSelector((state: RootState) => state.tapesModel);
  const artistsData = useSelector((state: RootState) => state.artistModel);

  useEffect(() => {
    dispatch.artistModel.getAllArtists();
    dispatch.tapesModel.getSpacesData(currentTape);
  }, []);
  console.log(Object.values(tapesData));
  return (
    <>
      <div className="bg-white my-10 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-4 mb-4">
          <div className="flex flex-1 justify-between px-1">
            <h2 className="text-center font-thin uppercase tracking-widest text-gray-200 bg-neutral-950 px-5 py-1 rounded-full shadow-sm">
              Tapes
            </h2>
          </div>
          <div className="my-8 grid gri-rows-2 grid-cols-2 gap-y-4 gap-x-3 xl:grid-cols-5 xl:gap-x-4">
            {Object.values(tapesData)?.map((tape) => (
              <div className="group bg-gray-100 relative rounded-lg p-2 shadow-md border border-gray-200 col-span-1">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 transition-all lg:aspect-square shadow-sm hover:shadow-md">
                  <img
                    src={tape?.image}
                    alt={tape?.image}
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
                    <h3 className="text-sm text-gray-900 font-medium tracking-widest py-2 px-3 w-full mt-2">
                      <Link to={tape.route}>
                        {tape.name}
                        <span aria-hidden="true" className="absolute inset-0 truncate" />
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
