import { User } from '@/models/common';
import { formatTime } from '@/utils';
import { Stack, Skeleton } from '@chakra-ui/react';

const UserSubmissions = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 px-3 py-3">
      <Stack spacing="2">
        <Skeleton rounded="md" fadeDuration={2} isLoaded={!loading}>
          {userData?.submissions?.heds?.hedstape &&
            Object.entries(userData.submissions.heds.hedstape).map(([id, submission], i) => (
              <li className="text-xs text-gray-600 py-2" key={i}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-thin">HT{id}</span>
                    <div className="min-w-0 flex-1 sm:flex">{submission.track}</div>
                    <div className="flex-shrink-0 sm:mt-0 sm:ml-5">
                      <span className="mr-2">{formatTime(submission.duration)}</span>
                      <i className="fa-solid fa-play"></i>
                    </div>
                  </div>
                </a>
              </li>
            ))}
        </Skeleton>
      </Stack>
    </ul>
  );
};

export default UserSubmissions;
