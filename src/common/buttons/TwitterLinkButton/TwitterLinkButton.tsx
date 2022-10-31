import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatTwitterUrl } from '@/utils';
import { Link, Skeleton, Flex, Button } from '@chakra-ui/react';
import { selectUserTwitterHandle } from '@/pages/user/store/selectors';
import { Fragment } from 'react';

const TwitterLinkButton = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const twitterHandle = useSelector(selectUserTwitterHandle);
  return (
    <Fragment>
      {twitterHandle?.length ? (
        <Flex alignItems={'center'} data-testid="user-copy-container">
          <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={2}>
            <Button
              as={Link}
              href={formatTwitterUrl(twitterHandle)}
              size="xs"
              bg={'twitter.100'}
              style={{ textDecoration: 'none' }}
              className="mx-0 decoration-transparent"
              aria-label="edit profile"
              target="_blank"
              leftIcon={<i className="fa-brands fa-twitter text-[0.75rem]" />}
            >
              @{twitterHandle}
            </Button>
          </Skeleton>
        </Flex>
      ) : null}
    </Fragment>
  );
};

export default TwitterLinkButton;
