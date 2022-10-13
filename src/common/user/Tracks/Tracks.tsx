import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Heading, Skeleton } from '@chakra-ui/react';
import { TapeData } from '@/models/common';

const FeaturedSubmissions = ({ loading, userTracks }: { loading: boolean; userTracks: { [key: string]: TapeData } }) => {
  return (
    <Fragment>
      {userTracks && (
        <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
          <Heading fontSize={'3xl'}>Featured On</Heading>
          <Divider />
          <div className="flex flex-row gap-4 flex-wrap py-3">
            {Object.entries(userTracks).map(([id, tape]) => {
              return (
                <Link to={tape?.route} key={id + tape?.contract}>
                  <img
                    className="object-cover lg:min-h-[4rem] lg:max-h-[4rem] lg:min-w-[4rem] lg:max-w-[4rem] aspect-square rounded-lg object-center hover:opacity-75"
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
