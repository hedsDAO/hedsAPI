import { TrackMetadata, User, UserRoles } from '@/models/common';
import { selectUserSamples } from '@/pages/user/store/selectors';
import { Dispatch, RootState } from '@/store';
import { formatTime, isEmpty } from '@/utils';
import { Heading, Stack, Skeleton, Divider, Image, IconButton } from '@chakra-ui/react';
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
              <li key={sample.audio + sample.artist} className={`text-sm text-gray-600 rounded-md border-green-200/60 border shadow-sm`}>
                <div className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-2 rounded-md">
                  <Image borderRadius="full" boxSize="25px" src={sample.cover} alt={sample.tape} />
                  <span className="text-xs sm:inline hidden font-light whitespace-nowrap">{sample.tape}</span>
                  <span className="text-xs inline sm:hidden font-light whitespace-nowrap">{'HT' + sample.tape.split(' ')[1]}</span>
                  <div className="min-w-0 flex-1 sm:flex text-xs text-neutral-800  whitespace-nowrap uppercase">sample</div>
                  <span className="mr-2 sm:mr-4 whitespace-nowrap">{formatTime(sample.duration)}</span>
                  <IconButton
                    bg="blue.200"
                    size="xs"
                    aria-label="play"
                    icon={<i className="fa-solid fa-play"></i>}
                    onClick={() => handlePlay(sample)}
                    className="flex-shrink-0"
                  />
                  <IconButton
                    bg="green.200"
                    size="xs"
                    aria-label="add to queue"
                    icon={<i className="fa-solid fa-layer-plus"></i>}
                    // onClick={}
                    className="flex-shrink-0"
                  />
                </div>
              </li>
            ))}
          </Stack>
        </ul>
      </Skeleton>
    );
};

export default Samples;
