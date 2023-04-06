import { User as UserMetadata } from '@/models/common';
import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import { formatWallet } from '@/utils';

const User = ({ user, size }: { user: UserMetadata; size?: 'sm' | 'lg' }) => {
  return (
    <>
      {size === 'lg' || !size ? (
        <Flex mt={'0 !important'}>
          <Box bg="">
            <Flex>
              <Avatar size="md" border={'solid 1px'} src={user.profile_picture} />
              <Stack justifyContent={'center'} pl={4}>
                <Flex alignItems={'center'} fontSize="2xs" gap={2}>
                  <Box fontFamily={'inter'} letterSpacing={'widest'} fontSize={'sm'} mt={'0 !important'}>
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
        <Stack w="full" pt={2} alignItems={'center'}>
          <Avatar border="solid 1px" borderColor="heds.100 !important" size="xl" src={user.profile_picture} />
          <Text opacity={'70%'} fontFamily="karla" fontSize={{ base: '2xs', lg: 'xs' }} letterSpacing={'wide'} color={'white'}>
            {user.display_name}
          </Text>
          <Text mt={'0 !important'} fontFamily="karla" fontSize="2xs" letterSpacing={'wide'} color={'white'}>
            {formatWallet(user.wallet)}
          </Text>
        </Stack>
      )}
    </>
  );
};

export default User;
