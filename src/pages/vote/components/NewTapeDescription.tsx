import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { store } from '@/store';

import { Box, Button, Divider, Flex, HStack, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { OLD_TAPES, HOW_VOTING_WORKS, ABOUT_VOTING, ABOUT_VOTING_HT6, ABOUT_VOTING_OLD_TAPES } from '@pages/vote/store/constants';

export const NewTapeDescription = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const { space, tape, id } = useParams();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));

  return (
    <Stack>
      <Stack direction="row">
        <Skeleton rounded="2xl" isLoaded={hasImageLoaded}>
          <Image borderRadius="full" boxSize="4rem" src={currentTape?.image} alt="Tape Image" onLoad={setHasImageLoaded.on} />
        </Skeleton>
        <Stack spacing="-0.5rem" pl="2px">
          <Text fontSize="1.5rem" fontFamily="monospace" pt="8px" letterSpacing="widest">
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
    </Stack>
  );
};
