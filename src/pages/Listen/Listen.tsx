import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';

export const Listen = () => {
  const { tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const { allTapes } = useSelector((state: RootState) => state.tapesModel);
  useEffect(() => {
    if (!allTapes?.[tape]?.[id]) dispatch.tapesModel.getAllTapes();
    else console.log(allTapes?.[tape]?.[id]);
  }, []);
  
  return (
    <>
      <div className="bg-white my-10 pb-20">
        {allTapes?.[tape]?.[id] && (
          <div className="md:max-w-7xl mx-auto w-full">
            <img
              src={allTapes?.[tape]?.[id].image}
              className="object-cover w-full h-full lg:min-h-[18rem] lg:max-h-[18rem] lg:min-w-[18rem] lg:max-w-[18rem] aspect-square rounded-lg object-center"
            />
            <h1 className="font-semibold text-lg tracking-tight text-neutral-700 mt-2">{allTapes?.[tape]?.[id].name}</h1>
            <h1 className="font-semibold text-lg tracking-tight text-neutral-700 mt-2">{allTapes?.[tape]?.[id].contract.slice(0,5) + "..."}</h1>
            <h1 className="font-semibold text-sm tracking-tight text-neutral-700 mt-2">{allTapes?.[tape]?.[id].description}</h1>
          </div>
        )}
      </div>
    </>
  );
};
