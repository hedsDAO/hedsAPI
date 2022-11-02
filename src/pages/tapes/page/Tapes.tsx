import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Heading, Image, AspectRatio, Skeleton } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';

export const Tapes = () => {
  const navigate = useNavigate();
  const { hedsTapes } = useSelector((state: RootState) => state.tapesModel);
  const loading = useSelector((state: RootState) => state.loading.models.tapesModel);
  return (
    <div className="">
      <div className="mx-auto w-full px-10">
        <Heading
          className="animate__animated animate__fadeInUp"
          fontWeight={'bold'}
          size={['2xl', '4xl']}
          color={'black'}
          mt={{ base: 5, lg: 10 }}
          mb={3}
          p={1}
        >
          Releases
        </Heading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {hedsTapes && (
            <Fragment>
              {Object.values(hedsTapes)
                ?.reverse()
                ?.map((tape, index) => {
                  return (
                    <div
                      role="button"
                      onClick={() => navigate(tape.route, { replace: true })}
                      key={tape.contract + index}
                      className="group bg-gray-50 relative border border-gray-200 col-span-1 rounded-sm bs-preset-1"
                    >
                      <Skeleton h="fit-content" fadeDuration={2} className="col-span-1" isLoaded={!loading}>
                        <AspectRatio ratio={1}>
                          <Image
                            w="full"
                            src={tape.image}
                            alt={tape.name}
                            objectFit="cover"
                            roundedTop={'sm'}
                            className="group-hover:saturate-0 group-hover:rounded-sm ease-in-out transition-all duration-300 px-4 py-4"
                          />
                        </AspectRatio>
                      </Skeleton>
                      <div className="flex flex-col justify-center px-4 py-5 group-hover:bg-gray-500/20 duration-500">
                        <div className="flex flex-col justify-center">
                          <h3 className="text-2xl text-gray-700 font-bold tracking-widest w-full text-right">
                            {tape.name.split(' ')[0]}
                            <span className="text-red-500 font-light ml-2">{tape.name.split(' ')[1]}</span>
                            <span aria-hidden="true" className="absolute inset-0 truncate" />
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
