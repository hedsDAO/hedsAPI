import { User } from '@/models/common';
import { formatTime } from '@/utils';
import { Stack, Skeleton, Heading, Divider } from '@chakra-ui/react';

const Submissions = ({ loading, userData }: { loading: boolean; userData: User }) => {
  if (userData?.submissions?.heds?.hedstape && !loading)
    return (
      <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
        <Heading fontSize={'3xl'}>Submissions</Heading>
        <Divider mt={2} />
        <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
          <Stack spacing="1">
            {Object.entries(userData?.submissions?.heds?.hedstape).map(([id, submission], i) => (
              <li className="text-sm text-gray-600 rounded-md" key={i}>
                <a href="#" className="block hover:bg-gray-50 px-2 py-2 rounded-md">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-light">HT{id}</span>
                    <div className="min-w-0 flex-1 sm:flex text-neutral-800">{submission.track}</div>
                    <div className="flex-shrink-0 sm:mt-0 sm:ml-5">
                      <span className="mr-2 sm:mr-4">{formatTime(submission.duration)}</span>
                      <i className="fa-solid fa-play"></i>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </Stack>
        </ul>
      </Skeleton>
    );
};

export default Submissions;
