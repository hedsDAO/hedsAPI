import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

// Components
import { Box, Heading, Flex, Stack, Text, Tooltip, Button, Avatar, IconButton, Center, Badge, useDisclosure } from '@chakra-ui/react';
import { SuccessfulVoteDialog } from './SuccessfulVoteDialog';

// Models
import { Choice } from 'hedsvote';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { DateTime } from 'luxon';
import { useSignMessage } from 'wagmi';
import { useEffect, useRef } from 'react';
import { calculateUserVotingPower } from 'hedsvote';

// Constants
import { HEDS_POWER } from '../store/constants';

export const CastVoteContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch<Dispatch>();
  const userLikes = useSelector(store.select.voteModel.selectUserLikes);
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const connectedUserWallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const formattedVoteObject = useSelector(store.select.voteModel.selectVoteObject);
  const hasUserVoted = useSelector(store.select.voteModel.selectHasUserVoted(connectedUserWallet));
  const votes = useSelector(store.select.voteModel.selectQuadraticVotes);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const vp = useSelector(store.select.voteModel.selectUserVotingPower);
  const now = DateTime.now().toMillis();
  const { data, isSuccess, signMessage } = useSignMessage({
    message: JSON.stringify(formattedVoteObject),
  });

  useEffect(() => {
    if (isSuccess) {
      const voteObject = {
        proposalId: proposal.ipfs.IpfsHash,
        spaceId: proposal.space,
        updatedVote: hasUserVoted,
        vote: {
          choice: formattedVoteObject,
          created: now,
          signature: data,
          voter: connectedUserWallet,
          vp,
        },
      };

      if (!hasUserVoted) {
        dispatch.voteModel.castVote(voteObject);
        dispatch.userModel.addUserVote([voteObject, choices]);
        onOpen();
        return;
      } else {
        const previousVote = votes.find((vote) => vote.voter === connectedUserWallet);
        const updatedVote = { ...voteObject, previousVote };
        dispatch.voteModel.updateVote(updatedVote);
        dispatch.userModel.addUserVote([updatedVote, choices]);
        onOpen();
        return;
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (proposal?.strategies) {
      calculateUserVotingPower(connectedUserWallet.toLowerCase(), proposal?.strategies).then((vp) => {
        dispatch.voteModel.setVp(vp);
        return;
      });
    }
  }, [proposal.strategies, connectedUserWallet]);

  useEffect(() => {
    if (hasUserVoted && connectedUserWallet) {
      const userVote = votes.find((vote) => vote.voter === connectedUserWallet);
      if (userVote) {
        const formattedChoicesTank: { [key: string]: number } = {};
        for (const key in userVote.choice) {
          const newKey = `${+key - 1}`;
          formattedChoicesTank[newKey] = userVote.choice[key];
        }
        dispatch.voteModel.setUserLikesById(formattedChoicesTank);
      }
    }
    if (!connectedUserWallet) {
      dispatch.voteModel.setUserLikesById({});
    }
  }, [hasUserVoted, connectedUserWallet]);

  return (
    <>
      <SuccessfulVoteDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} cancelRef={cancelRef} />
      {userLikes && Object.values(userLikes)?.length ? (
        <Stack>
          <Flex mt={{ base: 5, lg: 8 }} py={{ base: 0, lg: 1 }} alignItems={'end'} justifyContent={'space-between'}>
            <Heading className="animate__animated animate__fadeIn" fontWeight="medium" letterSpacing="widest" size={['xs', 'sm']} color={'gray.900'}>
              VOTE
            </Heading>
            {connectedUserWallet ? (
              <Flex gap={2} alignItems={'center'}>
                <Tooltip placement={'auto'} whiteSpace={'pre-line'} label={HEDS_POWER}>
                  <Badge variant={'outline'}>
                    {vp} {'HED'}
                  </Badge>
                </Tooltip>
                <Button colorScheme={'green'} onClick={() => signMessage()} size="xs" variant={'outline'}>
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
              {userLikes?.[choice.id] >= 0 ? <FilledHeartIcon height="16" width="16" /> : <HeartIcon height="16" width="16" />}
            </Center>
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};
