import { useSelector } from 'react-redux';
import { store } from '@/store';

// Components
import { Box, Heading, Flex, Stack, Text, Tooltip, Button, Avatar, IconButton, Center, Badge } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { HEDS_POWER } from '@/pages/vote/models/constants';
import { Choice } from '@/pages/vote/models/voteModel';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

export const TrialVote = () => {
  const userLikes = useSelector(store.select.voteModel.selectUserLikes);
  const choices = useSelector(store.select.voteModel.selectChoices);

  const connectedUserWallet = 'asdasd';
  const vp = 123;

  if (!choices) return null;

  return (
    <Stack>
      <Flex mt={{ base: 5, lg: 8 }} py={{ base: 0, lg: 1 }} alignItems={'end'} justifyContent={'space-between'}>
        <Heading className="animate__animated animate__fadeIn" fontWeight="medium" letterSpacing="widest" size={['xs', 'sm']} color={'gray.900'}>
          VOTE
        </Heading>
        {connectedUserWallet ? (
          <Flex gap={2} alignItems={'center'}>
            <Tooltip placement={'auto'} whiteSpace={'pre-line'} label={HEDS_POWER}>
              <Badge variant={'outline'}>{`${vp} HED`}</Badge>
            </Tooltip>
            <Badge variant={'outline'} colorScheme={'purple'}>
              {choices.filter((choice) => choice.id in userLikes).length} LIKES
            </Badge>
            <Button colorScheme={'green'} size="xs" variant={'solid'}>
              Cast Vote
            </Button>
          </Flex>
        ) : (
          <Tooltip label={'connect your wallet to vote'}>
            <InfoOutlineIcon style={{ marginRight: '1px' }} color="gray.800" />
          </Tooltip>
        )}
      </Flex>
      <Box border="1px" borderRadius="md" p={1} color="gray.700" maxH="300px" overflowY="scroll">
        <Stack spacing={1}>
          {connectedUserWallet &&
            vp &&
            vp > 0 &&
            choices
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((choice) => {
                if (choice.id in userLikes) return <VoterCard choice={choice} userLikes={userLikes} key={choice.id} />;
              })}
        </Stack>
      </Box>
    </Stack>
  );
};

const VoterCard = ({ choice, userLikes }: { choice: Choice; userLikes: { [key: string]: number } }) => {
  console.log(userLikes);
  console.log(choice);
  return (
    <Box border="1px" borderColor="gray.700" borderRadius="md" px={1} bgColor="gray.50">
      <Flex justifyContent="space-between" px={1} py={2}>
        <Flex gap={2} alignItems={'center'}>
          <Avatar borderRadius={'sm'} src={choice.image} size="xs" />
          <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide">
            {choice.name}
          </Text>
        </Flex>
        <Flex gap={2} alignItems="center">
          <Flex justifyContent="space-between">
            <IconButton aria-label="decrement" size="sm" fontSize="md" bg="transparent !important">
              <Center _hover={{ transform: 'scale(1.2)' }} h="100%" w="100%">
                <MinusIcon height="12" width="12" />
              </Center>
            </IconButton>
            <Center>
              <Text fontSize="xs" as="span" fontWeight="medium">
                {userLikes[choice.id]}
              </Text>
            </Center>
            <IconButton aria-label="increment" size="sm" fontSize="md" bg="transparent !important">
              <Center _hover={{ transform: 'scale(1.2)' }} h="100%" w="100%">
                <PlusIcon height="12" width="12" />
              </Center>
            </IconButton>
          </Flex>
          <IconButton bg="transparent !important" size="xs" aria-label="like" _hover={{ bg: 'gray.200' }} ml={1}>
            <Center _hover={{ transform: 'scale(1.1)' }} h="100%" w="100%">
              {userLikes?.[choice.id] >= 0 ? <FilledHeartIcon height="16" width="16" /> : <HeartIcon height="16" width="16" />}
            </Center>
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
  // return <div>hello</div>;
};
