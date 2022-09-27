import React, { Fragment } from 'react';
import { User } from '@/models/common';
import { formatTwitterUrl } from '@/utils';
import { Link, Box, Skeleton } from '@chakra-ui/react';

const TwitterLinkButton = ({ loading, profileData }: { loading: boolean; profileData: User }) => {
  return (
    <Box py="1">
      <Skeleton rounded="md" height="10px" fadeDuration={2} isLoaded={!loading}>
        <Link fontSize={'sm'} data-testid="user-twitter" href={formatTwitterUrl(profileData.twitterHandle)} isExternal>
          <i className="fa-brands fa-twitter mr-2 text-[0.75rem]"></i>@{profileData.twitterHandle}
        </Link>
      </Skeleton>
    </Box>
  );
};

export default TwitterLinkButton;
