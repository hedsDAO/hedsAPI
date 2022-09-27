import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton } from '@chakra-ui/react';
import { selectUserFeaturedSubmissions } from '@/modules/user/selectors';
import { TapeData } from '@models/common';

const FeaturedSubmissions = ({ loading }: { loading: boolean }) => {
  const featuredSubmissions: { [key: string]: TapeData } = useSelector(selectUserFeaturedSubmissions);

  console.log(loading);
  return (
    <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
      <div className="flex flex-row gap-4 flex-wrap px-3 py-3">
        {!loading &&
          Object.entries(featuredSubmissions).map(([id, track]) => {
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
