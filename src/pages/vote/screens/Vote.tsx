import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Component
import { Box, Divider, Flex, Skeleton, Progress, Stack, Text, Image } from '@chakra-ui/react';
import { Header } from '@/pages/song/components/Header/Header';
import { Waveform } from '@pages/song/components/Waveform/Waveform';

import * as styles from '@pages/vote/screens/styles';

// Utils
import { Dispatch, store } from '@/store';

export const Vote = () => {
  const { ipfs } = useParams<{ ipfs: string }>();
  const dispatch = useDispatch<Dispatch>();
  const song = useSelector(store.select.songModel.selectSong);
  const choices = useSelector(store.select.voteModel.selectChoices);

  useEffect(() => {
    dispatch.voteModel.getProposalById(ipfs);
  }, [ipfs]);

  return (
    <Box>
      <Header />
      {song && <Waveform />}
      <Divider {...styles.$dividerStyles} />
      <Flex>
        {choices.map((choice) => {
          return (
            <Box key={choice.media} border="1px" borderRadius="md" borderColor="gray.500" bg="purple.100" _hover={{ cursor: 'pointer' }}>
              <Stack flexDirection="row">
                <Box p={2}>
                  <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
                </Box>
                <Flex w="full" direction="column" pl={1} pr={2}>
                  <Text mt={'-1px !important'} fontSize="xs">
                    {choice.name}
                  </Text>
                  {/* <Flex mt={-0.5} minW="full" justifyContent={'space-between'}>
                    <Text fontSize="2xs" textColor={'gray.700'}>
                      {showArtist ? choice.artist : ''}
                    </Text>
                    <Text mt={1} fontSize="2xs" textColor={'gray.800'}>
                      {+choice.score.toFixed(2)}%
                    </Text>
                  </Flex> */}
                  <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
                </Flex>
              </Stack>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
