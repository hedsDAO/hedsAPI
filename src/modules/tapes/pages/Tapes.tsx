import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/store';
import { AspectRatio, Image } from '@chakra-ui/react';

export const Tapes = () => {
  const { allTapes } = useSelector((state: RootState) => state.tapesModel);
  return (
    <>
      <div className="bg-white my-10 pb-20 grid grid-cols-6 max-w-7xl mx-auto">
        {allTapes &&
          Object.values(allTapes)?.map((tape, index) => {
            return (
              <div key={tape.contract + index} className="group bg-gray-100 relative rounded-lg p-2 shadow-md border border-gray-200 col-span-1">
                <AspectRatio maxW="12rem" ratio={4 / 3}>
                  <Image src={tape.image} alt={tape.name} objectFit="cover" />
                </AspectRatio>
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
    </>
  );
};
