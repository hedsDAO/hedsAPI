import { User } from '@/models/common';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { formatTwitterUrl } from '@/utils';
import { Link, Box, Skeleton, Button, Stack } from '@chakra-ui/react';
import { IconBrandTwitter } from '@tabler/icons';
import { Modals } from '@/modals/modalModel';

const TwitterLinkButton = ({ loading, profileData }: { loading: boolean; profileData: User }) => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Box py="1">
      <Skeleton rounded="md" height="10px" fadeDuration={2} isLoaded={!loading}>
        {profileData?.twitterHandle ? (
          <Link py={2} fontSize={'sm'} data-testid="user-twitter" href={formatTwitterUrl(profileData.twitterHandle)} isExternal>
            <i className="fa-brands fa-twitter mr-2 text-[0.75rem]"></i>@{profileData.twitterHandle}
          </Link>
        ) : (
          <Stack py={2} direction="row" spacing={4}>
            <Button
              onClick={() => {
                dispatch.modalModel.setModal(Modals.TWITTER_MODAL);
                dispatch.modalModel.setModalOpen(true);
              }}
              size="xs"
              leftIcon={<IconBrandTwitter height={16} width={16} />}
              colorScheme="blue"
              variant="solid"
            >
              Verify
            </Button>
          </Stack>
        )}
      </Skeleton>
    </Box>
  );
};

export default TwitterLinkButton;
