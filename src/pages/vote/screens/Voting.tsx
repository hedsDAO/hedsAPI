import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { VoteChoiceCard } from '@/common/media';
import { Choice } from 'hedsvote';
import { Avatar, Container, Flex, Grid, HStack, Text } from '@chakra-ui/react';
const Voting = () => {
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);

  return (
    <Flex>
      <Container mx="auto" maxW="7xl">
        <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap={3}>
          {choices &&
            choices?.map((choice: Choice) => {
              return <VoteChoiceCard onClick={() => dispatch.voteModel.setCurrentTrack(choice)} key={choice.name + choice.image} choice={choice} />;
            })}
        </Grid>
      </Container>

      {/* <Flex
        p={2}
        border="1px"
        rounded="sm"
        shadow="sm"
        borderColor="gray.500"
        justifyContent={'space-between'}
        w="full"
        minW="full"
        gap={2}
        alignItems="center"
        key={choice.name}
      >
        <HStack w={{ base: '50%', lg: '40%' }}>
          <Avatar size="xs" src={choice.image} />
          <Text textColor={'gray.800'} fontSize={'xs'}>
            {choice.name}
          </Text>
        </HStack>
        <Flex alignItems={'center'} gap={2} pr={2} w={{ base: '50%', lg: '60%' }}>
          <Flex alignItems={'center'} w={{ base: '60%', lg: '80%' }}>
            {+round(resultsByPercentage(voteResults)[choice.id], 2) > 1 ? (
              <Fragment>
                <Box w={`${round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="blue.800" h="2" roundedLeft="full" />
                <Box w={`${100 - round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="gray.300" h="2" roundedRight="full" />
              </Fragment>
            ) : (
              <Box w={`${100 - round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="gray.300" h="2" rounded="full" />
            )}
          </Flex>
          <Text textAlign={'right'} w={{ base: '40%', lg: '20%' }} textColor={'gray.500'} fontSize={'xs'}>
            {round(resultsByPercentage(voteResults)[choice.id], 2)}%{' '}
          </Text>
        </Flex>
      </Flex> */}
    </Flex>
  );
};

export default Voting;
