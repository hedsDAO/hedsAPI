import { TrackMetadata, User, UserRoles } from '@/models/common';
import { Dispatch } from '@/store';
import { formatTime } from '@/utils';
import { Heading, Stack, Skeleton, Divider, Image } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

const Samples = ({ loading, userData }: { loading: boolean; userData: User }) => {
  const dispatch = useDispatch<Dispatch>();
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setCurrentTrack(submission);
  };
  if (userData?.samples?.heds?.hedstape && !loading)
    return (
      <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
        <Heading fontSize={'3xl'}>Samples</Heading>
        <Divider mt={2} />
        <ul data-testid="user-samples" role="list" className="divide-y divide-gray-200 py-3">
          <Stack spacing="1">
            {Object.values(userData?.samples?.heds?.hedstape).map((sample, i) => (
              <li className="text-sm text-gray-600 rounded-md" key={i}>
                <button onClick={() => handlePlay(sample)} className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-2 rounded-md">
                  <Image className="" borderRadius="full" boxSize="25px" src={sample.cover} alt={sample.tape} />
                  <span className="text-xs font-light">{sample.tape}</span>
                  <div className="min-w-0 flex-1 sm:flex"/>
                  <div className="flex-shrink-0 sm:mt-0 sm:ml-5">
                    <span className="mr-2 sm:mr-4">{formatTime(sample.duration)}</span>
                    <i className="fa-solid fa-play"></i>
                  </div>
                </button>
              </li>
            ))}
          </Stack>
        </ul>
      </Skeleton>
    );
};

export default Samples;
