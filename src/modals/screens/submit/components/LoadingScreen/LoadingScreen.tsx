import { store } from '@/store';
import { SlideFade, Spinner, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import * as constants from '@/modals/screens/submit/models/constants';
import * as styles from '@/modals/screens/submit/components/LoadingScreen/styles';

export const LoadingScreen = () => {
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);
  return (
    <Stack {...styles.$loadingStackStyles}>
      <Spinner {...styles.$spinnerStyles} />
      <SlideFade {...styles.$slideFadeStyles(isLoading)}>
        <Text {...styles.$loadingTextStyles}>{constants.LOADING_SCREEN_TEXT}</Text>
      </SlideFade>
    </Stack>
  );
};
