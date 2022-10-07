import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Heading, Skeleton } from '@chakra-ui/react';
import { TapeData } from '@/models/common';

const FeaturedSubmissions = ({ loading, userTracks }: { loading: boolean; userTracks: { [key: string]: TapeData } }) => {
  return (
    <Fragment>
      {userTracks && (
        <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
          <Heading fontSize={'3xl'}>Featured On</Heading>
          <div className="flex flex-row gap-4 flex-wrap px-3 py-3">
            {Object.entries(userTracks).map(([id, tape]) => {
              return (
                <Link to={tape?.route} key={id + tape?.contract}>
                  <img
                    className="object-cover lg:min-h-[12rem] lg:max-h-[12rem] lg:min-w-[12rem] lg:max-w-[12rem] aspect-square rounded-lg object-center hover:opacity-75"
                    src={tape?.image}
                  />
                </Link>
              );
            })}
          </div>
        </Skeleton>
      )}
    </Fragment>
  );
};

export default FeaturedSubmissions;
