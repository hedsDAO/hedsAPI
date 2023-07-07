import { Center, Box, Divider, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
    <Box pt={12} px={5} maxW="3xl" mx="auto" height="fit-content">
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
    </Box>
  );
};
