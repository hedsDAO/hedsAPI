import { TrackMetadata } from '@/models/common';
import { Dispatch, RootState } from '@/store';
import { formatTime, isEmpty } from '@/utils';
import { Stack, Skeleton, Heading, Divider, Image, IconButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserSubmissions } from '@/pages/user/store/selectors';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';

const Submissions = () => {
  const dispatch = useDispatch<Dispatch>();
  const { pathname } = useLocation();
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel).connectedUser;
  const userSubmissions = useSelector(selectUserSubmissions);
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.setActiveTrack(submission);
  };
  return (
    <Fragment>
      {!isEmpty(Object.values(userSubmissions).filter((submission) => (pathname === '/profile' ? submission : submission?.public))) && (
        <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
          <Heading fontSize={'3xl'}>Submissions</Heading>
          <Divider mt={2} />
          <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
            <Stack spacing="2">
              {Object.values(userSubmissions)
                .filter((submission) => (pathname === '/profile' ? submission : submission?.public))
                .map((submission, i) => (
                  <li
                    className={`text-sm text-gray-600 rounded-md ${submission?.public ? 'border-green-200/60' : 'border-red-200/60'} border shadow-sm`}
                    key={i}
                  >
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
                      <span className="text-xs sm:inline hidden font-light whitespace-nowrap">{submission.tape}</span>
                      <div className="min-w-0 flex-1 sm:flex text-xs text-neutral-800  whitespace-nowrap">{submission.track}</div>
                      {!submission?.public && pathname === '/profile' ? (
                        <span className="animate__animated animate__fadeInUp text-xs font-semibold text-red-500 ml-1 w-full text-center">private</span>
                      ) : pathname === '/profile' ? (
                        <span className="animate__animated animate__fadeOutDown text-xs font-semibold text-red-500 ml-1 w-full text-center">private</span>
                      ) : (
                        <></>
                      )}
                      <span className="mr-2 sm:mr-4 whitespace-nowrap">{formatTime(submission.duration)}</span>
                      <IconButton
                        bg="blue.200"
                        size="xs"
                        aria-label="play"
                        icon={<i className="fa-solid fa-play"></i>}
                        onClick={() => handlePlay(submission)}
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
      )}
    </Fragment>
  );
};

export default Submissions;
