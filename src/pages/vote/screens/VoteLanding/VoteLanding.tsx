import { useEffect } from 'react';
import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Divider, Grid, HStack, Stack, Text } from '@chakra-ui/react';
import { isEmpty } from '@/utils';
import { VoteCard } from '@/common/media';
import ImageWithOverlay from '../../components/ImageWithOverlay/ImageWithOverlay';

const VoteLanding = () => {
  const dispatch = useDispatch<Dispatch>();
  const allHedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const latestHedsTape = useSelector(store.select.tapesModel.selectLatestHedsTape);

  useEffect(() => {
    dispatch.voteModel.getAllProposals();
  }, []);
  console.log(!isEmpty(allHedsTapes) && Object.values(allHedsTapes));
  return (
    <Container minW="full">
      <Box>
        <Container py={{ base: '2', md: '8' }}>
          <HStack>
            <Divider borderColor="gray.700" w="full" />
            <Text fontSize="lg" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
              LATEST VOTES
            </Text>
            <Divider borderColor="gray.700" w="full" />
          </HStack>
        </Container>
      </Box>
      <Box px={4} mx="auto">
        <Stack alignItems={'start'}>
          <Box maxW="7xl" mx="auto" px={{ base: '4', md: '8', lg: '12' }} py={{ base: '6', md: '8', lg: '12' }}>
            <Stack height={{ md: '640px' }} direction={{ base: 'column', md: 'row' }} spacing={{ base: '6', md: '10' }} align="stretch">
              <ImageWithOverlay
                flex="1"
                spacing={'4'}
                objectPosition="top center"
                title={latestHedsTape?.name}
                url={latestHedsTape?.route}
                src={latestHedsTape?.image}
                alt={latestHedsTape?.name}
              />
              <Stack display={{ base: 'none', lg: 'flex' }} spacing={{ base: '6', md: '10' }} maxW={{ md: '400px' }}>
                <ImageWithOverlay
                  spacing="4"
                  title={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 1]?.name : ''}
                  src={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 1]?.image : ''}
                  url={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 1]?.route : ''}
                  alt={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 1]?.name : ''}
                />
                <ImageWithOverlay
                  spacing="4"
                  title={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 2]?.name : ''}
                  src={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 2]?.image : ''}
                  url={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 1]?.route : ''}
                  alt={latestHedsTape?.id ? allHedsTapes[+latestHedsTape.id - 2]?.name : ''}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box mb={5}>
        <Container py={{ base: '4', md: '8' }}>
          <HStack>
            <Divider borderColor="gray.700" w="full" />
            <Text fontSize="md" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
              ALL VOTES
            </Text>
            <Divider borderColor="gray.700" w="full" />
          </HStack>
        </Container>
      </Box>
      <Grid mx="auto" maxW="7xl" templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap={2}>
        {!isEmpty(allHedsTapes) &&
          Object.values(allHedsTapes).map((tape, i) => {
            return <VoteCard key={tape.contract + tape.name} tape={tape} />;
          })}
      </Grid>
    </Container>
  );
};

export default VoteLanding;
