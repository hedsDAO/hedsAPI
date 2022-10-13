import { User } from '@/models/common';
import { formatTwitterUrl } from '@/utils';
import { Link, Box, Skeleton, Flex, Button } from '@chakra-ui/react';

const TwitterLinkButton = ({ loading, userData }: { loading: boolean; userData: User }) => {
  return (
    <Flex alignItems={'center'} data-testid="user-copy-container">
      <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={2}>
        <Button
          as={Link}
          href={formatTwitterUrl(userData.twitterHandle)}
          size="xs"
          style={{ textDecoration: 'none' }}
          className="mx-0 decoration-transparent"
          aria-label="edit profile"
          target="_blank"
          leftIcon={<i className="fa-brands fa-twitter text-[0.75rem]" />}
        >
          @{userData.twitterHandle}
        </Button>
      </Skeleton>
    </Flex>
  );
};

export default TwitterLinkButton;
