import { TrackMetadata, User, UserRoles } from '@/models/common';
import { selectUserSamples } from '@/pages/user/store/selectors';
import { Dispatch, RootState } from '@/store';
import { formatTime, isEmpty } from '@/utils';
import { Heading, Stack, Skeleton, Divider, Image } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Samples = () => {
  const dispatch = useDispatch<Dispatch>();
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const samples = useSelector(selectUserSamples);
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setActiveTrack(submission);
  };
  if (!isEmpty(samples) && !loading)
    return (
      <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
        <Heading fontSize={'3xl'}>Samples</Heading>
        <Divider mt={2} />
        <ul data-testid="user-samples" role="list" className="divide-y divide-gray-200 py-3">
          <Stack spacing="1">
            {Object.values(samples).map((sample, i) => (
              <li className="text-sm text-gray-600 rounded-md" key={i}>
                <button onClick={() => handlePlay(sample)} className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-2 rounded-md">
                  <Image className="" borderRadius="full" boxSize="25px" src={sample.cover} alt={sample.tape} />
                  <span className="text-xs font-light">{sample.tape}</span>
                  <div className="min-w-0 flex-1 sm:flex" />
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
