import { Link } from 'react-router-dom';
import { Heading, Skeleton } from '@chakra-ui/react';
import { TapeData } from '@models/common';

interface OwnProps {
  loading: boolean;
  featuredTracks: { [key: string]: TapeData };
}

const FeaturedSubmissions = ({ loading, featuredTracks }: OwnProps) => {
  return (
    <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
      <Heading fontSize={'3xl'}>Featured On</Heading>
      <div className="flex flex-row gap-4 flex-wrap px-3 py-3">
        {!loading &&
          Object.entries(featuredTracks).map(([id, track]) => {
            if (track) {
              return (
                <Link to={track?.route}>
                  <img
                    className="object-cover lg:min-h-[12rem] lg:max-h-[12rem] lg:min-w-[12rem] lg:max-w-[12rem] aspect-square rounded-lg object-center hover:opacity-75"
                    key={id}
                    src={track.image}
                  />
                </Link>
              );
            }
          })}
      </div>
    </Skeleton>
  );
};

export default FeaturedSubmissions;
