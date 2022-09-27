import React, { Fragment } from 'react';
import { User } from '@/models/common';
import { formatTwitterUrl } from '@/utils';
import { Link } from '@chakra-ui/react';

export const TwitterLinkButton = ({ userData }: { userData: User }) => {
  return (
    <Fragment>
      {userData?.twitterHandle && (
        <Link fontSize={'sm'} data-testid="user-twitter-link" href={formatTwitterUrl(userData.twitterHandle)} isExternal>
          <i className="fa-brands fa-twitter mr-2 text-[0.75rem]"></i>@{userData.twitterHandle}
        </Link>
      )}
    </Fragment>
  );
};
