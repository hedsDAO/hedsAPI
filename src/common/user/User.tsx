import { User as UserMetadata } from '@/models/common';
import { Avatar, Box, Flex, Stack } from '@chakra-ui/react';
import { formatWallet } from '@/utils';

const User = ({ user, size }: { user: UserMetadata; size?: 'sm' | 'lg' }) => {
  return (
    <>
      {size === 'lg' || !size ? (
        <Flex>
          <Avatar src={user.profile_picture} />
          <Stack justifyContent={'center'} pl={4}>
            <Box letterSpacing={'widest'} fontSize={'sm'} mt={'0 !important'}>
              {user.display_name}
            </Box>
            <Box letterSpacing={'widest'} fontSize={'sm'} color={'blackAlpha.700'} mt={'0 !important'}>
              {formatWallet(user.wallet)}
            </Box>
          </Stack>
        </Flex>
      ) : (
        <Box>
          <Avatar size="xl" src={user.profile_picture} />
          <Stack pt={2} alignItems={'center'}>
            <Box letterSpacing={'widest'} fontSize={'xs'} mt={'0 !important'}>
              {user.display_name}
            </Box>
            <Box letterSpacing={'widest'} fontSize={'xs'} color={'blackAlpha.700'} mt={'0 !important'}>
              {formatWallet(user.wallet)}
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default User;
