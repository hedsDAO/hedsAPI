import { useEffect, useState } from 'react';
import { Dispatch, store } from '@/store';
import { Heading, Image, Skeleton, SkeletonText, Spinner, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const PreviouslySubmitted = () => {
  const dispatch = useDispatch<Dispatch>();
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const currentTapeName = useSelector(store.select.tapesModel.selectCurrentTapeName);

  const skeletonTimer = () => {
    setTimeout(() => {
      dispatch.submitModel.setHasSubmitted(true);
      setHasImageLoaded(true);
    }, 2000);
  };

  const dataTimer = () => {
    setTimeout(() => {
      setHasDataLoaded(true);
    }, 2000);
  };
  useEffect(() => {
    dataTimer();
  }, []);

  return (
    <VStack minH="xs" p={2} h="full" w="full" justifyContent={'center'} alignItems="center">
      {hasDataLoaded ? (
        <VStack>
          <VStack mb={5}>
            <Heading>Track Submitted</Heading>
            <Text fontSize="sm">Your submission has been recieved for {currentTapeName}.</Text>
          </VStack>
          <Skeleton rounded="lg" h="256px" w="256px" isLoaded={hasImageLoaded}>
            <Image shadow="md" rounded="lg" onLoad={() => skeletonTimer()} src={'https://www.heds.cloud/ipfs/QmZMiAujk2CT1aAipED3UfKttwGw1ETW49XdVVAqefRjGf'} />
          </Skeleton>
          <SkeletonText
            fontSize="sm"
            fontFamily={'"Space Mono", monospace'}
            textAlign={'center'}
            isLoaded={hasImageLoaded}
            mt="5"
            noOfLines={1}
            spacing="4"
            skeletonHeight="5"
          >
            curiousRhino
          </SkeletonText>
          {hasImageLoaded && hasDataLoaded && (
            <Text color="red.400" mt={4} fontFamily={'"Space Mono", monospace'} className="animate__animated animate__fadeInUp animate__slow" fontSize="2xs">
              keep this a secret
            </Text>
          )}
        </VStack>
      ) : (
        <Spinner size="md" />
      )}
    </VStack>
  );
};

export default PreviouslySubmitted;
