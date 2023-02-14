import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { store } from '@/store';

// Components
import { Badge, Box, Button, Flex, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons';

// Models
import { ProposalState } from 'hedsvote';

// Constants
import { OLD_TAPES, ABOUT_VOTING, ABOUT_VOTING_HT6, ABOUT_VOTING_OLD_TAPES } from '@pages/vote/store/constants';
import { OpenDateBox } from '@/common/timeline';

export const NewTapeDescription = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const { space, tape, id } = useParams();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  const timeline = allTapes?.[tape]?.[id]?.timeline;

  const isOldTape = OLD_TAPES.includes(id);
  const isHedsTAPE06 = id === '6';

  const handleProposalState = (state: ProposalState) => {
    if (state === ProposalState.OPEN) return <OpenDateBox end={timeline?.vote?.end} />;
    if (state === ProposalState.CLOSED)
      return (
        <Badge px={2} py={1} borderRadius="sm" colorScheme={'red'}>
          CLOSED
        </Badge>
      );
    return (
      <Badge px={2} py={1} borderRadius="sm" colorScheme={'yellow'}>
        PENDING
      </Badge>
    );
  };

  return (
    <Stack>
      <Stack direction="row">
        <Skeleton rounded="2xl" isLoaded={hasImageLoaded}>
          <Image borderRadius="full" boxSize="4rem" shadow="sm" src={currentTape?.image} alt="Tape Image" onLoad={setHasImageLoaded.on} />
        </Skeleton>
        <Stack justifyContent={'center'} spacing="-0.25rem" pl="2px">
          <Text fontSize="1.5rem" fontFamily={"'Space Mono', monospace"}>
            {currentTape?.name}
          </Text>
          <Button
            bg="none"
            size="xs"
            fontFamily={"'Space Mono', monospace"}
            fontWeight="light"
            px="0.5"
            w="fit-content"
            justifyContent="flex-start"
            rightIcon={<ExternalLinkIcon />}
            _hover={{ textDecoration: 'underline' }}
            as={Link}
            to={`/listen/${space}/${tape}/${id}`}
          >
            view tape
          </Button>
        </Stack>
      </Stack>
      <Text fontSize="sm" fontWeight="semibold" pt={5}>
        Description
      </Text>
      <Text fontSize="xs"> {isOldTape ? ABOUT_VOTING_OLD_TAPES : isHedsTAPE06 ? ABOUT_VOTING_HT6 : ABOUT_VOTING}</Text>
      {proposal?.state === ProposalState.OPEN ? (
        <Flex mt={4} p={2} border={'1px'} borderColor={'gray.300'} rounded="sm" gap={2} alignItems={'center'} bg="gray.100">
          <InfoIcon height="3.5" width="3.5" />
          <Text letterSpacing={'wide'} fontSize="2xs">
            Results will be public after the voting period ends.
          </Text>
        </Flex>
      ) : (
        <Text></Text>
      )}
      <Box pt={2}>{handleProposalState(proposal?.state)}</Box>
    </Stack>
  );
};
