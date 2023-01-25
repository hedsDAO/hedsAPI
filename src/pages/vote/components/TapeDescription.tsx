import { Avatar, Box, Badge, Container, HStack, Stack, Square, Text } from '@chakra-ui/react';
import { Proposal } from 'hedsvote';
import { formatWallet } from '@/utils';

interface OwnProps {
  proposal: Proposal;
  tapeImage: string;
}

export const TapeDescription = ({ proposal, tapeImage }: OwnProps) => {
  return (
    <Box as="section" py={{ base: '4', md: '5' }}>
      <Container maxW="3xl">
        <Box
          bg={'blackAlpha.100'}
          _hover={{ bg: 'white', borderColor: 'gray.800' }}
          border={'1px'}
          borderColor={'gray.600'}
          rounded="sm"
          boxShadow={'sm'}
          borderRadius="lg"
          p={{ base: '2', md: '4' }}
        >
          <Stack p={2} spacing="5">
            <Stack spacing="1">
              <Text fontSize="lg" fontWeight="medium">
                Details
              </Text>
              <Text fontSize="xs" color="muted">
                {proposal?.description}
              </Text>
            </Stack>
            <Box bg="white" border="1px" borderColor="gray.800" borderWidth={'1px'} p={{ base: '2', md: '4' }} borderRadius="lg">
              <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5">
                <HStack spacing="3">
                  <Square borderRadius="lg">
                    <Avatar src={tapeImage} />
                  </Square>
                  <Box fontSize="sm">
                    <Text color="emphasized" fontWeight="medium">
                      {proposal?.author && formatWallet(proposal?.author)}
                    </Text>
                    <Badge colorScheme={'red'}>{proposal?.state}</Badge>
                  </Box>
                </HStack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
