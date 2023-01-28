import Slider from 'react-slick';
import { Image, ChakraProps, SimpleGrid, Avatar, Spinner, Badge, Heading, Grid, GridItem } from '@chakra-ui/react';
import { Box, Flex, Text, Icon, Container, Stack, Skeleton, useBoolean, Button } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { IconArrowRight } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { isEmpty } from '@/utils';
import hedImage from '../../../public/heddot.png';
import { TapeData } from '@/models/common';
import { Proposal } from 'hedsvote';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VoteLandingMock = () => {
  const dispatch = useDispatch<Dispatch>();
  const allHedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const allProposals = useSelector(store.select.voteModel.selectAllProposals);
  var settings = { dots: true, autoplay: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };
  useEffect(() => {
    dispatch.voteModel.getAllProposals();
  }, []);
  return (
    <Fragment>
      <Box minH="75vh" minW="100vw">
        <Box maxW="7xl" mx="auto" pb={10}>
          {!isEmpty(allHedsTapes) && allProposals?.length ? (
            <Slider arrows={false} {...settings}>
              {Object.values(allHedsTapes)
                .slice(Object.values(allHedsTapes).length - 3, Object.values(allHedsTapes).length)
                .reverse()
                .map((tape) => {
                  const currentProposal = allProposals?.filter((proposal) => (proposal.ipfs.IpfsHash === tape.proposalId ? proposal : null));
                  if (currentProposal?.length) return <TapeVoteCover tape={tape} proposal={currentProposal[0]} />;
                })}
            </Slider>
          ) : (
            <Flex minH="50vh" alignItems={'center'} justifyContent="center">
              <Spinner h="12" w="12" size="md" />
            </Flex>
          )}
        </Box>
        <Image
          src={hedImage}
          opacity="50%"
          zIndex="10"
          top="24"
          left="72%"
          maxH="50rem"
          display={{ lg: 'block', base: 'none' }}
          position="absolute"
          objectFit="contain"
          style={{ filter: 'invert(0.75)' }}
        />
      </Box>
      <AllVotes allHedsTapes={allHedsTapes} />
    </Fragment>
  );
};
export default VoteLandingMock;

// ## TEMP - COMPONENTS

// ALL TAPE VOTES
const AllVotes = ({ allHedsTapes }: { allHedsTapes: { [tapeId: string]: TapeData } }) => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  return (
    <Box minW="100vw" minH="100vh">
      <Flex px={6} bg="whiteAlpha.100" pt={5} alignItems={'center'} justifyContent="space-between">
        <Heading
          px={{ base: 0, lg: 2 }}
          className="animate__animated animate__fadeIn"
          fontWeight={'semibold'}
          letterSpacing={'widest'}
          size={['sm', 'md']}
          color={'gray.900'}
        >
          ALL VOTES
        </Heading>
      </Flex>
      <Grid pt={6} px={5} templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }} gap={3}>
        {allHedsTapes &&
          Object.keys(allHedsTapes)?.length &&
          Object.values(allHedsTapes)
            ?.reverse()
            ?.map((tape, index) => {
              return (
                <GridItem
                  key={tape.contract + index}
                  as={Link}
                  className="group transition-all ease-in-out bs-preset-1"
                  to={`/vote/${tape.space}/${tape.tape}/${tape.id}`}
                  bg="blackAlpha.100"
                  _hover={{ bg: 'white', borderColor: 'gray.800' }}
                  border={'1px'}
                  borderColor={'gray.600'}
                  rounded="sm"
                  p={3}
                  colSpan={1}
                >
                  <Skeleton
                    startColor="gray.100"
                    endColor="gray.500"
                    w="full"
                    minH={!isImageLoaded ? { base: 'full', sm: '6rem', lg: '11rem', xl: '18.5rem', '2xl': '21rem' } : { base: 'full' }}
                    rounded="lg"
                    isLoaded={isImageLoaded}
                  >
                    <div className="relative mb-2">
                      <img
                        onLoad={setIsImageLoaded.on}
                        loading="eager"
                        src={tape?.image}
                        className="group-hover:saturate-[50%] ease-in-out transition-all object-cover aspect-square rounded-md object-center shadow-md outline-neutral-600 outline-1 outline"
                      />
                    </div>
                    <span className="mx-1 font-semibold text-xs font-serif tracking-wide group-hover:text-gray-900 text-gray-600">{tape.name}</span>
                  </Skeleton>
                </GridItem>
              );
            })}
      </Grid>
    </Box>
  );
};

// PROPOSALS CHOICE ICONS
const ProposalChoicesBox = ({ proposal }: { proposal: Proposal }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Stack gap={4}>
      <SimpleGrid
        minW={'20rem'}
        minH={'12.5rem'}
        border="1px"
        borderColor="gray.600"
        shadow="sm"
        rounded="xl"
        py={2}
        bg="gray.100"
        alignSelf={'end'}
        justifyItems={{ base: 'start', lg: 'center' }}
        gap={3}
        placeItems="center"
        columns={{ base: 5, md: 5, xl: 5 }}
      >
        {proposal?.choices?.slice(0, 20).map((choice) => (
          <Stack key={choice.name} gap={2}>
            <Skeleton rounded="lg" size="sm" isLoaded={hasImageLoaded}>
              <Avatar opacity={0.7} size="sm" onLoad={setHasImageLoaded.on} outline="solid" borderRadius="lg" w="full" objectFit={'cover'} src={choice.image} />
            </Skeleton>
          </Stack>
        ))}
      </SimpleGrid>
      <Flex pt={1.5} pos={'absolute'}>
        <Box shadow="sm" px={1.5} py={0.5} roundedRight="lg" border="1px" borderColor="gray.800" bg="white">
          <Text fontSize={'xs'} textAlign={'center'}>
            {proposal?.choices?.length} submissions
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
};

// TAPE VOTE HEADER + COVER
const TapeVoteCover = ({ tape, proposal }: { tape: TapeData; proposal: Proposal }) => {
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
          <ProposalChoicesBox proposal={proposal} />
        </Flex>
      </Container>
      <Flex mb={8} justifyContent={'center'} w="full" mx="auto">
        <Button
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
