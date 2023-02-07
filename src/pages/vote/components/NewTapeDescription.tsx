import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { store, RootState } from '@/store';
import { DateTime } from 'luxon';

// Components
import { Badge, Box, Button, Divider, Flex, HStack, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ClosedDateBox, OpenDateBox, UpcomingDateBox } from '@/common/timeline';

// Models
import { Proposal, ProposalState } from 'hedsvote';

// Constants
import { OLD_TAPES, HOW_VOTING_WORKS, ABOUT_VOTING, ABOUT_VOTING_HT6, ABOUT_VOTING_OLD_TAPES } from '@pages/vote/store/constants';

export const NewTapeDescription = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const { space, tape, id } = useParams();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  const proposal = useSelector(store.select.voteModel.selectProposal);

  const handleProposalState = (state: ProposalState) => {
    if (state === ProposalState.OPEN)
      return (
        <Badge borderRadius="md" colorScheme={'green'}>
          OPEN
        </Badge>
      );
    if (state === ProposalState.CLOSED)
      return (
        <Badge borderRadius="md" colorScheme={'red'}>
          CLOSED
        </Badge>
      );
    return (
      <Badge borderRadius="md" colorScheme={'yellow'}>
        PENDING
      </Badge>
    );
  };

  return (
    <Stack>
      <Stack direction="row">
        <Skeleton rounded="2xl" isLoaded={hasImageLoaded}>
          <Image borderRadius="full" boxSize="4rem" src={currentTape?.image} alt="Tape Image" onLoad={setHasImageLoaded.on} />
        </Skeleton>
        <Stack spacing="-0.5rem" pl="2px">
          <Text fontSize="1.5rem" fontFamily="monospace" pt="8px">
            {currentTape?.name}
          </Text>
          <Button
            bg="none"
            size="xs"
            fontFamily="monospace"
            fontWeight="light"
            px="0"
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
      <Text fontSize="xs">{ABOUT_VOTING}</Text>
      <Box>{handleProposalState(proposal?.state)}</Box>
    </Stack>
  );
};
