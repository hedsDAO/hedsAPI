import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { formatTwitterUrl } from '@/utils';
import { Link, Skeleton, Flex, Button } from '@chakra-ui/react';
import { Fragment } from 'react';

const TwitterLinkButton = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const twitterHandle = useSelector(store.select.userModel.selectConnectedUserTwitterHandle);
  return (
    <Fragment>
      {twitterHandle?.length ? (
        <Flex alignItems={'center'} data-testid="user-copy-container">
          <Skeleton w="full" h="fit-content" rounded="lg" isLoaded={!loading} fadeDuration={2}>
            <Button
              as={Link}
              href={formatTwitterUrl(twitterHandle)}
              size="xs"
              bg={'blue.50'}
              borderColor={'blue.200'}
              style={{ textDecoration: 'none' }}
              className="mx-0 decoration-transparent border"
              aria-label="edit profile"
              target="_blank"
              leftIcon={<i className="fa-brands fa-twitter" />}
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
