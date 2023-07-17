import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Stack, FormControl, FormLabel, FormHelperText, Input, InputGroup, InputLeftAddon, Text, Flex } from '@chakra-ui/react';
import * as constants from '@/modals/screens/settings/models/constants';
import * as styles from '@/modals/screens/settings/components/TwitterForm/styles';
/**
 * @component TwitterForm
 * @description Displays a form to update the user's twitter handle
 * @returns {JSX.Element} - Rendered TwitterForm component.
 */
export const TwitterForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const newTwitterHandle = useSelector(store.select.settingsModel.selectTwitterHandle);
  const twitterHandleError = useSelector(store.select.settingsModel.selectTwitterHandleError);
  const user = useSelector(store.select.authModel.selectUser);
  return (
    <Stack {...styles.$stackContainerStyles}>
      {newTwitterHandle?.length && user?.twitter_handle === newTwitterHandle ? (
        <Stack>
          <Text {...styles.$linkedAccountsTitleTextStyles}>{constants.TWITTER_LINKED_ACCOUNTS_TEXT}</Text>
          <Flex {...styles.$unlinkTextFlexStyles}>
            <Text
              as={'i'}
              {...styles.$unlinkButtonTextStyles}
              onClick={() => {
                dispatch.settingsModel.setTwitterHandle('');
              }}
            />
            <Text {...styles.$linkedAccountUrlTextStyles} as="a" href={`https://www.twitter.com/${newTwitterHandle}`}>{`@${newTwitterHandle}`}</Text>
          </Flex>
        </Stack>
      ) : (
        <FormControl {...styles.$formControlStyles}>
          <FormLabel {...styles.$formLabelStyles}>{constants.TWITTER_TITLE}</FormLabel>
          <FormHelperText {...styles.$formHelperTextStyles}>{constants.TWITTER_DESCRIPTION_TEXT}</FormHelperText>
          <InputGroup {...styles.$inputGroupStyles}>
            <InputLeftAddon {...styles.$inputLeftAddOnStyles} children="@" />
            <Input
              max={constants.TWITTER_HANDLE_CHAR_COUNT}
              value={newTwitterHandle || ''}
              {...styles.$inputStyles(twitterHandleError)}
              data-testid="twitter-input"
              onChange={(e) => {
                if (e.target.value.length >= constants.TWITTER_HANDLE_CHAR_COUNT) {
                  dispatch.settingsModel.setTwitterHandleError('Twitter handle must be between 4 than 15 characters');
                  setTimeout(() => dispatch.settingsModel.setTwitterHandleError(''), 3000);
                  return;
                } else if (!constants.regex.test(e.target.value)) {
                  dispatch.settingsModel.setTwitterHandleError('Twitter handle must only contain letters, numbers, and underscores');
                  setTimeout(() => dispatch.settingsModel.setTwitterHandleError(''), 3000);
                  return;
                } else {
                  dispatch.settingsModel.setTwitterHandle(e.target.value);
                }
              }}
            />
          </InputGroup>
          {twitterHandleError && <FormHelperText {...styles.$errorFormHelperTextStyles}>{twitterHandleError}</FormHelperText>}
        </FormControl>
      )}
    </Stack>
  );
};
