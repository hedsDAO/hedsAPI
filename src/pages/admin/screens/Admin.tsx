import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Center, Box, Divider, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Constants
import { adminWallets } from '@/pages/admin/model/constants';

export const Admin = () => {
  const adminWallet = useSelector(store.select.authModel.selectWallet);

  return (
    <Box pt={12} px={5} maxW="3xl" mx="auto" height="fit-content">
      {adminWallets.includes(adminWallet) ? (
        <>
          <Text fontFamily="mono" color="white" fontSize="3xl" fontWeight="bold">
            Admin Dashboard
          </Text>
          <Divider />
          <Center pt={12}>
            <Flex gap={12}>
              <Box as={Link} to={'/new-tape'} boxSize="2xs" borderWidth="1px" borderStyle="dashed" borderColor="heds.200">
                <Text
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  color="heds.200"
                  fontSize="2xl"
                  fontFamily="mono"
                  _hover={{ bg: 'heds.bg2' }}
                >
                  Create Tape
                </Text>
              </Box>
              <Box as={Link} to={'/new-proposal'} boxSize="2xs" borderWidth="1px" borderStyle="dashed" borderColor="heds.200">
                <Text
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  color="heds.200"
                  fontSize="2xl"
                  fontFamily="mono"
                  _hover={{ bg: 'heds.bg2' }}
                >
                  Create Proposal
                </Text>
              </Box>
            </Flex>
          </Center>
        </>
      ) : (
        <Center pt={12}>
          <Text fontFamily="mono" color="white" fontSize="3xl" fontWeight="bold">
            You are not an admin
          </Text>
        </Center>
      )}
    </Box>
  );
};
