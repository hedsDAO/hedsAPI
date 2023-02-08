// Components
import { Avatar, Box, Heading, Grid, GridItem, HStack, Image, Stack, Text, IconButton } from '@chakra-ui/react';
import { IconX, IconPlus, IconMinus } from '@tabler/icons';

export const VoteResults = () => {
  return (
    <>
      <Heading
        px={{ base: 0, lg: 2 }}
        className="animate__animated animate__fadeIn"
        fontWeight="light"
        letterSpacing="widest"
        size={['xs', 'sm']}
        color={'gray.900'}
      >
        RESULTS
      </Heading>
      <Box border="1px">
        <Stack></Stack>
      </Box>
    </>
  );
};

const SelectedVoteSubmission = () => {};
