import { User as UserMetadata } from '@/models/common';
import { Avatar, Box, Flex, Stack } from '@chakra-ui/react';
import { formatWallet } from '@/utils';

const User = ({ user, size }: { user: UserMetadata; size?: 'sm' | 'lg' }) => {
  return (
    <>
      {size === 'lg' || !size ? (
        <Flex>
          <Box bg="" py={2}>
            <Flex>
              <Avatar size='md' border={'solid 1px'} src={user.profile_picture} />
              <Stack justifyContent={'center'} pl={4}>
                <Flex alignItems={'center'} fontSize="2xs" gap={2}>
                <Box fontFamily={'mono'} letterSpacing={'widest'} fontSize={'sm'} mt={'0 !important'}>
                  {user.display_name}
                </Box>
                <i className="fa-regular fa-arrow-up-right-from-square"></i>
                </Flex>
                <Box color="blackAlpha.400" fontFamily={'mono'} letterSpacing={'widest'} fontSize={'2xs'} mt={'0 !important'}>
                  {formatWallet(user.wallet)}
                </Box>
              </Stack>
            </Flex>
          </Box>
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
