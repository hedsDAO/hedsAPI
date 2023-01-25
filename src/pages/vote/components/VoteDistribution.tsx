import { store } from '@/store';
import { Avatar, Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Choice } from 'hedsvote';
// export function percentageOfTotal(i: any, values: any, total: any) {
//   const reducedTotal: any = total.reduce((a: any, b: any) => a + b, 0);
//   const percent = (values[i] / reducedTotal) * 100;
//   return isNaN(percent) ? 0 : percent;
// }
// export function quadraticMath(i: any, choice: any, vp: any) {
//   return Math.sqrt((percentageOfTotal(i + 1, choice, Object.values(choice)) / 100) * vp);
// }
interface OwnProps {
  handleScoreChange: (choice: Choice) => void;
}
export const VoteDistribution = ({ handleScoreChange }: OwnProps) => {
  const { tape, id } = useParams();
  const [selectedTracks, setSelectedTracks] = useState(new Set([]));
  const [voteData, setVoteData] = useState<any>();
  const connectedWallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const voteResults = useSelector(store.select.voteModel.selectQuadraticVoteScores);
  const votes = useSelector(store.select.voteModel.selectQuadraticVotes);
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  function round(num: number, decimalPlaces = 0): number {
    if (num < 0) return -round(-num, decimalPlaces);
    const p = Math.pow(10, decimalPlaces);
    const n = (num * p).toPrecision(15);
    return Math.round(+n) / p;
  }
  const resultsByPercentage = (results: Array<number>) => {
    const totalVoteBalance = results.reduce((a: number, b: number) => a + b);
    return results.map((votes: number) => {
      return (votes / totalVoteBalance) * 100;
    });
  };
  // const resultsByUserBalance = () => {
  //   const results = choices
  //     // @ts-ignore
  //     .map((choice: Choice, i: number) =>
  //       votes.map((vote: any) => vote?.voter?.toLowerCase() === connectedWallet && quadraticMath(i, vote.choice, vote.vp)).reduce((a: any, b: any) => a + b, 0),
  //     )
  //     .map((sqrt: number) => sqrt * sqrt);
  //   return results;
  // };
  useEffect(() => {
    if (currentTape) {
      setSelectedTracks(new Set(currentTape.tracks));
    }
  }, [tape, id]);

  return (
    <Box mx="auto">
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
      <Stack my={3}>
        {voteResults &&
          choices &&
          choices
            .sort((a, b) => +round(resultsByPercentage(voteResults)[b.id], 2) - +round(resultsByPercentage(voteResults)[a.id], 2))
            .map((choice, i) => {
              return (
                <Flex
                  p={2}
                  border="1px"
                  rounded="sm"
                  shadow="sm"
                  borderColor={selectedTracks.has(choice.walletId) ? 'purple.500' : 'gray.500'}
                  backgroundColor={selectedTracks.has(choice.walletId) ? 'purple.200' : 'white'}
                  justifyContent={'space-between'}
                  w="full"
                  minW="full"
                  gap={2}
                  alignItems="center"
                  key={choice.name}
                  borderRadius="lg"
                  onClick={() => handleScoreChange(choice)}
                  _hover={
                    selectedTracks.has(choice.walletId)
                      ? { borderColor: 'purple.800', bg: 'purple.100', cursor: 'pointer' }
                      : { borderColor: 'gray.400', bg: 'gray.50', cursor: 'pointer' }
                  }
                >
                  <HStack w={{ base: '50%', lg: '40%' }}>
                    <Avatar size="sm" src={choice.image} />
                    <Text textColor={selectedTracks.has(choice.walletId) ? 'black' : 'gray.800'} fontSize={'sm'}>
                      {choice.name}
                    </Text>
                  </HStack>
                  <Flex alignItems={'center'} gap={2} pr={2} w={{ base: '50%', lg: '60%' }}>
                    <Flex alignItems={'center'} w={{ base: '60%', lg: '80%' }}>
                      {+round(resultsByPercentage(voteResults)[choice.id], 2) > 1 ? (
                        <Fragment>
                          <Box w={`${round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="blue.800" h="2" roundedLeft="full" />
                          <Box w={`${100 - round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="gray.200" h="2" roundedRight="full" />
                        </Fragment>
                      ) : (
                        <Box w={`${100 - round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="gray.200" h="2" rounded="full" />
                      )}
                    </Flex>
                    <Text
                      textAlign={'right'}
                      w={{ base: '40%', lg: '20%' }}
                      textColor={selectedTracks.has(choice.walletId) ? 'black' : 'gray.800'}
                      fontSize={'sm'}
                    >
                      {round(resultsByPercentage(voteResults)[choice.id], 2)}%{' '}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
      </Stack>
    </Box>
  );
};
