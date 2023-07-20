import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useSigner } from 'wagmi';

// Components
import { Box, Heading, Flex, Stack, Text, Tooltip, Button, Avatar, IconButton, Center, Badge } from '@chakra-ui/react';

// Models
import { Choice } from '@/pages/vote/models/voteModel';
import { HeartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { calculateUserVotingPower } from 'hedsvote';

// Constants
import { HEDS_POWER } from '@/pages/vote/models/constants';

export const CastVoteContainer = () => {
  const dispatch = useDispatch<Dispatch>();
  const { data: signer } = useSigner();
  const userLikes = useSelector(store.select.voteModel.selectUserLikes);
  const choices = useSelector(store.select.voteModel.selectChoices);
  const connectedUserWallet = useSelector(store.select.authModel.selectWallet);
  const formattedVoteObject = useSelector(store.select.voteModel.selectUserLikes);
  const hasUserVoted = useSelector(store.select.voteModel.selectHasUserVoted(connectedUserWallet));
  const votes = useSelector(store.select.voteModel.selectVotes);
  const proposal = useSelector(store.select.voteModel.selectCurrentVote);
  const vp = useSelector(store.select.voteModel.selectUserVotingPower);
  const proposalId = useSelector(store.select.tapeModel.selectTapeProposalId);
  const isHedsTAPE13 = proposal?.title === 'hedsTAPE 13';

  const castVote = async () => {
    const voteChoices = Object.entries(formattedVoteObject).map(([key, value]) => ({ choiceId: Number(key), amount: value, proposalId: proposal.ipfs_hash }));
console.log(proposal.ipfs_hash)
    const voteObject = {
      proposalId: proposal.ipfs_hash,
      signature: '',
      vp,
      voter: connectedUserWallet,
      voteChoices,
    };
    console.log(voteChoices)

    dispatch.voteModel.castVote({ vote: voteObject, signer });
  };

  useEffect(() => {
    if (proposal?.strategies) {
      calculateUserVotingPower(connectedUserWallet, proposal?.strategies).then((vP) => {
        dispatch.voteModel.setVp(vP);
        return;
      });
    }
  }, [proposal.strategies, connectedUserWallet]);

  useEffect(() => {
    if (hasUserVoted && connectedUserWallet) {
      const userVote = votes.find((vote) => vote.voter === connectedUserWallet);
      if (userVote) {
        const formattedChoicesTank: { [key: string]: number } = {};
        for (const choice of userVote.voteChoices) {
          const { voteId } = choice;
          const newKey = `${+voteId - 1}`;
          formattedChoicesTank[newKey] = userVote.voteChoices[voteId].amount;
        }
        dispatch.voteModel.setUserLikesById(formattedChoicesTank);
      }
    }
    if (!connectedUserWallet) {
      dispatch.voteModel.setUserLikesById({});
    }
  }, [hasUserVoted, connectedUserWallet]);

  const disableVoteButton = () => {
    const previousVote = votes.find((vote) => vote.voter === connectedUserWallet);

    if (previousVote) {
      const formattedChoicesTank: { [key: string]: number } = {};
      for (const choice of previousVote.voteChoices) {
        const { voteId } = choice;
        const newKey = `${+voteId - 1}`;
        formattedChoicesTank[newKey] = previousVote.voteChoices[voteId].amount;
      }
      return JSON.stringify(formattedChoicesTank) === JSON.stringify(userLikes);
    } else return false;
  };

  return (
    <>
      {isHedsTAPE13 && votes?.length ? (
        <></>
      ) : (
        <>
          {userLikes && Object.values(userLikes)?.length ? (
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
                    <Button colorScheme={'green'} onClick={() => castVote()} size="xs" variant={'solid'} isDisabled={disableVoteButton()}>
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
          ) : (
            <Stack>
              <Flex direction={'column'} mt={{ base: 5, lg: 8 }} py={{ base: 0, lg: 1 }} alignItems={'start'} justifyContent={'space-between'}>
                <Heading className="animate__animated animate__fadeIn" fontWeight="medium" letterSpacing="widest" size={['xs', 'sm']} color={'gray.900'}>
                  VOTE
                </Heading>
                <Box px={3} py={2} mt={2} border="1px" borderColor="gray.400" borderRadius="md" bgColor="gray.50">
                  {!connectedUserWallet ? (
                    <Text fontSize="xs" fontFamily={'"Space Mono", monospace'}>
                      Connect your wallet to vote on the tape.
                    </Text>
                  ) : vp > 0 ? (
                    <Text fontSize="xs" fontFamily={'"Space Mono", monospace'}>
                      Favorite your choices by clicking the heart icon. Once you have selected your choices, click the cast vote button to submit your vote.
                    </Text>
                  ) : (
                    <Text fontSize="xs" fontFamily={'"Space Mono", monospace'}>
                      You have no HEDS power for this cycle. To participate in the future, collect hedsTAPE 11 on 2/24/23.
                    </Text>
                  )}
                </Box>
              </Flex>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

const VoterCard = ({ choice, userLikes }: { choice: Choice; userLikes: { [key: string]: number } }) => {
  const dispatch = useDispatch<Dispatch>();
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
            <IconButton
              aria-label="decrement"
              size="sm"
              fontSize="md"
              bg="transparent !important"
              onClick={() => dispatch.voteModel.decreaseChoiceWeightFromLikes(choice)}
            >
              <Center _hover={{ transform: 'scale(1.2)' }} h="100%" w="100%">
                <MinusIcon height="12" width="12" />
              </Center>
            </IconButton>
            <Center>
              <Text fontSize="xs" as="span" fontWeight="medium">
                {userLikes[choice.id]}
              </Text>
            </Center>
            <IconButton
              aria-label="increment"
              size="sm"
              fontSize="md"
              bg="transparent !important"
              onClick={() => {
                dispatch.voteModel.increaseChoiceWeightFromLikes(choice);
              }}
            >
              <Center _hover={{ transform: 'scale(1.2)' }} h="100%" w="100%">
                <PlusIcon height="12" width="12" />
              </Center>
            </IconButton>
          </Flex>
          <IconButton
            onClick={() => {
              if (userLikes?.[choice.id] >= 0) dispatch.voteModel.deleteChoiceFromLikes(choice);
              else dispatch.voteModel.addChoiceToLikes(choice);
            }}
            bg="transparent !important"
            size="xs"
            aria-label="like"
            _hover={{ bg: 'gray.200' }}
            ml={1}
          >
            <Center _hover={{ transform: 'scale(1.1)' }} h="100%" w="100%">
              <HeartIcon height="16" width="16" fill="red" />
            </Center>
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};
