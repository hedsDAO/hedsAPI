import { store } from '@/store';
import { Avatar, Box, Divider, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { QuadraticVote, SingleChoiceVote } from 'hedsvote';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export function percentageOfTotal(i: any, values: any, total: any) {
  const reducedTotal: any = total.reduce((a: any, b: any) => a + b, 0);
  const percent = (values[i] / reducedTotal) * 100;
  return isNaN(percent) ? 0 : percent;
}
export function quadraticMath(i: any, choice: any, vp: any) {
  return Math.sqrt((percentageOfTotal(i + 1, choice, Object.values(choice)) / 100) * vp);
}

const VoteDistribution = () => {
  const [voteData, setVoteData] = useState<any>();
  const connectedWallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const voteResults = useSelector(store.select.voteModel.selectQuadraticVoteScores);
  const votes = useSelector(store.select.voteModel.selectQuadraticVotes);
  const choices = useSelector(store.select.voteModel.selectProposalChoices);

  function round(num: number, decimalPlaces = 0): number {
    if (num < 0) return -round(-num, decimalPlaces);
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p).toPrecision(15);
    return Math.round(+n) / p;
  }
  const resultsByPercentage = (results: Array<number>) => {
    const totalVoteBalance = results.reduce((a: number, b: number) => a + b);
    return results.map((votes: number) => {
      return (votes / totalVoteBalance) * 100;
    });
  };

  const resultsByUserBalance = () => {
    const results = choices
      // @ts-ignore
      .map((choice: any, i: number) =>
        votes.map((vote: any) => vote?.voter?.toLowerCase() === connectedWallet && quadraticMath(i, vote.choice, vote.vp)).reduce((a: any, b: any) => a + b, 0),
      )
      .map((sqrt: number) => sqrt * sqrt);
    return results;
  };

  return (
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
                borderColor="gray.500"
                justifyContent={'space-between'}
                w="full"
                minW="full"
                gap={2}
                alignItems="center"
                key={choice.name}
              >
                <HStack w={{ base: '50%', lg: '40%' }}>
                  <Avatar size="xs" src={choice.image} />
                  <Text textColor={'gray.800'} fontSize={'xs'}>
                    {choice.name}
                  </Text>
                </HStack>
                <Flex alignItems={'center'} gap={2} pr={2} w={{ base: '50%', lg: '60%' }}>
                  <Flex alignItems={'center'} w={{ base: '60%', lg: '80%' }}>
                    {+round(resultsByPercentage(voteResults)[choice.id], 2) > 1 ? (
                      <Fragment>
                        <Box w={`${round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="blue.800" h="2" roundedLeft="full" />
                        <Box w={`${100 - round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="gray.300" h="2" roundedRight="full" />
                      </Fragment>
                    ) : (
                      <Box w={`${100 - round(resultsByPercentage(voteResults)[choice.id], 2)}%`} bg="gray.300" h="2" rounded="full" />
                    )}
                  </Flex>
                  <Text textAlign={'right'} w={{ base: '40%', lg: '20%' }} textColor={'gray.500'} fontSize={'xs'}>
                    {round(resultsByPercentage(voteResults)[choice.id], 2)}%{' '}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
    </Stack>
  );
};

export default VoteDistribution;
