import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';

export const Tapes = () => {
  const { tapeTypes, allTapes } = useSelector((state: RootState) => state.tapesModel);
  return (
    <>
      <div className="bg-white my-10 pb-20">
        {tapeTypes &&
          allTapes &&
          tapeTypes.map((tapeType) => {
            return (
              <div key={tapeType} className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-4 mb-4">
                <div className="flex flex-1 justify-between px-1">
                  <h2 className="text-center uppercase tracking-widest text-gray-200 bg-neutral-950 px-5 py-1 rounded-full shadow-sm">
                    <i className="fa-sharp fa-solid fa-cassette-tape mr-1"></i> {tapeType}s
                  </h2>
                </div>
                <div className="my-8 grid grid-rows-2 grid-cols-2 gap-y-4 gap-x-3 xl:grid-cols-5 xl:gap-x-4">
                  {allTapes &&
                    Object.values(allTapes[tapeType])?.map((tape, index) => {
                      return (
                        <div
                          key={tape.contract + index}
                          className="group bg-gray-100 relative rounded-lg p-2 shadow-md border border-gray-200 col-span-1"
                        >
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 transition-all lg:aspect-square shadow-sm hover:shadow-md">
                            <img
                              src={tape?.image}
                              alt={tape?.image}
                              className="h-full w-full object-cover aspect-square object-center lg:h-full lg:w-full rounded-lg"
                            />
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
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
