import { TapeData } from '@/models/common';
import { Grid, useBoolean, Flex, Heading, GridItem, Skeleton, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import * as gaEvents from '@/events';

export const LandingAllVotes = ({ allHedsTapes }: { allHedsTapes: { [tapeId: string]: TapeData } }) => {
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
                  onClick={() => gaEvents.clickVoteCardFromVoteLanding(tape.name)}
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
                        className="group-hover:saturate-[50%] ease-in-out transition-all object-cover aspect-square rounded-sm object-center shadow-sm"
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
