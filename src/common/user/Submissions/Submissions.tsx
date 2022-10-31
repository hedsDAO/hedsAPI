import { TrackMetadata } from '@/models/common';
import { Dispatch, RootState } from '@/store';
import { formatTime } from '@/utils';
import { Stack, Skeleton, Heading, Divider, Image, IconButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserSubmissions } from '@/pages/user/store/selectors';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';

const Submissions = () => {
  const dispatch = useDispatch<Dispatch>();
  const { pathname } = useLocation();
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const userSubmissions = useSelector(selectUserSubmissions);
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.setCurrentTrack(submission);
  };
  return (
    <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
      <Heading fontSize={'3xl'}>Submissions</Heading>
      <Divider mt={2} />
      <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
        <Stack spacing="1">
          {Object.values(userSubmissions)
            .filter((submission) => (pathname === '/profile' ? submission : submission?.public))
            .map((submission, i) => (
              <li className="text-sm text-gray-600 rounded-md" key={i}>
                <div className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-2 rounded-md">
                  {pathname === '/profile' && (
                    <Fragment>
                      {submission.public ? (
                        <IconButton
                          bg="green.200"
                          size="xs"
                          aria-label="public"
                          icon={<i className="fa-solid fa-eye"></i>}
                          onClick={() => dispatch.profileModel.updateSubmissionVisibility([submission, userData])}
                          className="flex-shrink-0 mr-2"
                        />
                      ) : (
                        <IconButton
                          bg="red.200"
                          size="xs"
                          aria-label="private"
                          icon={<i className="fa-solid fa-eye"></i>}
                          onClick={() => dispatch.profileModel.updateSubmissionVisibility([submission, userData])}
                          className="flex-shrink-0 mr-2"
                        />
                      )}
                    </Fragment>
                  )}
                  <Image className="grayscale" borderRadius="full" boxSize="25px" src={submission.cover} alt={submission.tape} />
                  <span className="text-xs sm:inline hidden font-light">{submission.tape}</span>
                  <div className="min-w-0 flex-1 sm:flex sm:text-base text-xs text-neutral-800">{submission.track}</div>
                  <span className="mr-2 sm:mr-4">{formatTime(submission.duration)}</span>
                  <IconButton
                    bg="blue.200"
                    size="xs"
                    aria-label="play"
                    icon={<i className="fa-solid fa-play"></i>}
                    onClick={() => handlePlay(submission)}
                    className="flex-shrink-0"
                  />
                  <IconButton
                    bg="red.200"
                    size="xs"
                    aria-label="add to queue"
                    icon={<i className="fa-solid fa-layer-plus"></i>}
                    onClick={() => handlePlay(submission)}
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

export default Submissions;
