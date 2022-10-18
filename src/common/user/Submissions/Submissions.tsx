import { TrackMetadata, User } from '@/models/common';
import { Dispatch } from '@/store';
import { formatTime } from '@/utils';
import { Stack, Skeleton, Heading, Divider, Image } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const Submissions = ({ loading, userData }: { loading: boolean; userData: User }) => {
  const dispatch = useDispatch<Dispatch>();
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.pushToQueue(submission)
  };
  if (userData?.submissions?.heds?.hedstape && !loading)
    return (
      <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
        <Heading fontSize={'3xl'}>Submissions</Heading>
        <Divider mt={2} />
        <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
          <Stack spacing="1">
            {Object.values(userData?.submissions?.heds?.hedstape).map((submission, i) => (
              <li className="text-sm text-gray-600 rounded-md" key={i}>
                <button onClick={() => handlePlay(submission)} className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-2 rounded-md">
                  <Image className="grayscale" borderRadius="full" boxSize="25px" src={submission.cover} alt={submission.tape} />
                  <span className="text-xs font-light">{submission.tape}</span>
                  <div className="min-w-0 flex-1 sm:flex text-neutral-800">{submission.track}</div>
                  <div className="flex-shrink-0 sm:mt-0 sm:ml-5">
                    <span className="mr-2 sm:mr-4">{formatTime(submission.duration)}</span>
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

export default Submissions;
