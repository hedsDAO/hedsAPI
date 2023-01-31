import { TapeData } from '@/models/common';
import { store } from '@/store';
import { useBoolean, Container, Flex, Badge, Stack, Skeleton, Button, Icon, Box, Text, Image } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { Proposal } from 'hedsvote';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LandingProposalChoices } from './LandingProposalChoices';
import * as gaEvents from '@/events';

export const LandingTapeCovers = ({ tape, proposal }: { tape: TapeData; proposal: Proposal }) => {
  const latestHedsTape = useSelector(store.select.tapesModel.selectLatestHedsTape);
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Box key={tape.etherscan} w="full">
      <Container px={{ base: 8, lg: 40 }} pb={{ base: 7, lg: 10 }} pt={{ base: 10, lg: 24 }} maxW="8xl">
        <Flex gap={2} alignItems="center" maxW="xl" mb={5} justifyContent={{ base: 'center', lg: 'start' }} mx="auto">
          <Text color={'black'} fontSize={{ base: 'lg', lg: 'xl' }} fontFamily={'"Space Mono", monospace'}>
            {tape.name}
          </Text>
          <Box>{tape?.name === latestHedsTape.name && <Badge variant={'outline'}>LATEST</Badge>}</Box>
        </Flex>
        <Flex
          gap={{ base: 6, lg: 4 }}
          w="full"
          alignItems={'center'}
          justifyContent={{ base: 'baseline', sm: 'center' }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Stack gap={2}>
            <Box>
              <Skeleton rounded="2xl" minW={'20rem'} h="12.5rem" isLoaded={hasImageLoaded}>
                <Image shadow="md" onLoad={setHasImageLoaded.on} outline="solid" rounded="2xl" h="12.5rem" w="full" objectFit={'cover'} src={tape.image} />
              </Skeleton>
            </Box>
          </Stack>
          <LandingProposalChoices proposal={proposal} />
        </Flex>
      </Container>
      <Flex mb={8} justifyContent={'center'} w="full" mx="auto">
        <Button
          onClick={() => gaEvents.clickViewVoteFromHeaderCarousel(tape.name)}
          alignSelf={'baseline'}
          as={Link}
          to={`/vote/${tape.space}/${tape.tape}/${tape.id}`}
          border="1px"
          borderColor="black"
          size="sm"
          rounded="full"
          bg="white"
          zIndex={'30'}
        >
          <Flex gap={2} alignItems={'center'}>
            <Text pl={2} fontWeight={'light'} fontSize="sm">
              view vote
            </Text>
            <Icon color="gray.500" h="4" w="4" as={IconArrowRight}></Icon>
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
};
