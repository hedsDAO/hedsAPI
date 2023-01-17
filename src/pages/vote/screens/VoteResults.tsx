import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Utils
import { Dispatch, RootState, store } from '@/store';
import { formatWallet, isEmpty } from '@/utils';

// Components
import { Avatar, Badge, Box, Container, Divider, Flex, Heading, HStack, Spinner, Square, Stack, Text, useBoolean } from '@chakra-ui/react';
import { VoteChoices } from '../components/VoteChoices';
import { VoteDistribution } from '../components/VoteDistribution';
import { VoteAudioTrack } from '@/common/media';

// Models
import WaveformPlayer from '@/modules/audio/screens/local/WaveformPlayer/WaveformPlayer';

export const VoteResults = () => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean(false);
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const currentTrack = useSelector(store.select.voteModel.selectCurrentTrack);
  const isLoadingProposal = useSelector((state: RootState) => state.loading.effects.voteModel.getProposal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (space && tape && id && allTapes?.[tape]?.[id]?.proposalId && !isLoadingProposal) {
      const currentTape = allTapes[tape][id];
      dispatch.voteModel.getProposal(currentTape?.proposalId);
    }
  }, [space, tape, id, allTapes]);

  return (
    <Box minH="100vh">
      {!isEmpty(allTapes) && (
        <Container justifyContent={'center'} py={{ base: '2', md: '8' }}>
          <HStack gap={2}>
            <Divider borderColor="gray.700" w="full" />
            {allTapes?.[tape]?.[id]?.name && (
              <Flex gap={3} alignItems={'baseline'}>
                <Text fontFamily={"'Space Mono', monospace"} fontSize="lg" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
                  {allTapes?.[tape]?.[id]?.name}
                </Text>
              </Flex>
            )}

            <Divider borderColor="gray.700" w="full" />
          </HStack>
        </Container>
      )}
      <Box as="section" py={{ base: '4', md: '5' }}>
        <Container maxW="3xl">
          <Box
            bg={'blackAlpha.100'}
            _hover={{ bg: 'white', borderColor: 'gray.800' }}
            border={'1px'}
            borderColor={'gray.600'}
            rounded="sm"
            boxShadow={'sm'}
            borderRadius="lg"
            p={{ base: '2', md: '4' }}
          >
            <Stack p={2} spacing="5">
              <Stack spacing="1">
                <Text fontSize="lg" fontWeight="medium">
                  Details
                </Text>
                <Text fontSize="xs" color="muted">
                  {proposal?.description}
                </Text>
              </Stack>
              <Box bg="white" border="1px" borderColor="gray.800" borderWidth={'1px'} p={{ base: '2', md: '4' }} borderRadius="lg">
                <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5">
                  <HStack spacing="3">
                    <Square borderRadius="lg">
                      <Avatar src={allTapes?.[tape]?.[id]?.image} />
                    </Square>
                    <Box fontSize="sm">
                      <Text color="empahsized" fontWeight="medium">
                        {proposal?.author && formatWallet(proposal?.author)}
                      </Text>
                      <Badge colorScheme={'red'}>{proposal?.state}</Badge>
                    </Box>
                  </HStack>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      {currentTrack?.media?.length && !isLoadingProposal ? (
        <Container mb={5} py={5} w="full" maxW="6xl">
          <Heading
            px={{ base: 0, lg: 2 }}
            className="animate__animated animate__fadeIn"
            fontWeight={'semibold'}
            letterSpacing={'widest'}
            size={['xs', 'sm']}
            color={'gray.900'}
          >
            NOW PLAYING
          </Heading>
          <Divider my={3} borderColor="transparent" w="full" />
          <VoteAudioTrack choice={currentTrack} />
          <Divider my={5} borderColor="transparent" w="full" />
          <WaveformPlayer audio={currentTrack?.media} />
        </Container>
      ) : (
        <></>
      )}
      <Container pt={5} maxW="7xl">
        <Heading
          px={{ base: 0, lg: 2 }}
          className="animate__animated animate__fadeIn"
          fontWeight={'semibold'}
          letterSpacing={'widest'}
          size={['xs', 'sm']}
          color={'gray.900'}
        >
          SUBMISSIONS
        </Heading>
      </Container>
      {proposal?.signature ? (
        <>
          <VoteChoices />
          <Divider py={10} borderColor="gray.300" w="8xl" mx="auto" />
        </>
      ) : (
        <Flex minH="50vh" pt="5" justifyContent={'center'} align="center">
          <Spinner size={'lg'} />
        </Flex>
      )}
      {proposal?.votes && (
        <Container pt={5} maxW="7xl">
          <Heading
            px={{ base: 0, lg: 2 }}
            className="animate__animated animate__fadeIn"
            fontWeight={'semibold'}
            letterSpacing={'widest'}
            size={['xs', 'sm']}
            color={'gray.900'}
          >
            RESULTS
          </Heading>
          <VoteDistribution />
        </Container>
      )}
    </Box>
  );
};
