import WaveformPlayer from '@/modules/audio/screens/local/WaveformPlayer/WaveformPlayer';
import { store } from '@/store';
import { Heading, Image, Skeleton, SkeletonText, Spinner, Text, useBoolean, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const PreviouslySubmitted = () => {
  const [space, tape, id] = useSelector(store.select.tapesModel.selectSpaceTapeId);
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const currentTapeName = useSelector(store.select.tapesModel.selectCurrentTapeName);
  const previousSubmission = useSelector(store.select.userModel.selectConnectedUserSubmissionsBySpaceTapeId([space, tape, id]));
  const generatedSubmission = useSelector(store.select.submitModel.selectGeneratedSubmission);
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);

  return (
    <VStack minH="xs" p={2} h="full" w="full" justifyContent={'center'} alignItems="center">
      {!isLoading ? (
        <VStack>
          <VStack mb={5}>
            <Heading>Success</Heading>
            <Text textAlign={'center'} fontSize="sm">
              Your track has been submitted for {currentTapeName}.
            </Text>
          </VStack>
          <Skeleton rounded="lg" h="256px" w="256px" isLoaded={hasImageLoaded}>
            <Image shadow="md" rounded="lg" onLoad={setHasImageLoaded.on} src={generatedSubmission?.subImage || previousSubmission?.subImage} />
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
            {generatedSubmission?.subId || previousSubmission?.subId}
          </SkeletonText>
          {hasImageLoaded && !isLoading && (
            <Text color="red.500" mt={4} fontFamily={'"Space Mono", monospace'} className="animate__animated animate__fadeInUp animate__slow" fontSize="2xs">
              keep this a secret - do not share until voting ends
            </Text>
          )}
        </VStack>
      ) : (
        <Spinner size="md" />
      )}
      {!isLoading && (
        <VStack pt={5}>
          <WaveformPlayer audio={generatedSubmission?.audio || previousSubmission?.audio} />
        </VStack>
      )}
    </VStack>
  );
};

export default PreviouslySubmitted;
