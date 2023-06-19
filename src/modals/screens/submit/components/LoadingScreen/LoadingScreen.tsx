import { store } from '@/store';
import { SlideFade, Spinner, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const LoadingScreen = () => {
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);
  console.log(isLoading, 'isLoading');
  return (
    <Stack alignItems={'center'} justifyContent="center" w="full" height="full" py={3}>
      <Spinner size="sm" />
      <SlideFade
        transition={{
          enter: { delay: 0.5, duration: 0.65 },
          exit: { duration: 0.3 },
        }}
        in={isLoading}
      >
        <Text color="white" opacity={'70%'} fontFamily={'space'} fontSize="2xs" mt={4}>
          this will take a few moments
        </Text>
      </SlideFade>
    </Stack>
  );
};
