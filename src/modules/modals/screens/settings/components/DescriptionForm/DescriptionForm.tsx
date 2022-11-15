import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { FormControl, FormHelperText, FormLabel, Text, Textarea } from '@chakra-ui/react';
import { CHARS_REMAINING, DESCRIPTION_FORM_DESCRIPTION, DESCRIPTION_FORM_TITLE } from '../../models/constants';

const DescriptionForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const { profileChanges, descCharacters } = useSelector((state: RootState) => state.settingsModel);
  return (
    <FormControl data-testid="description-form">
      <FormLabel mb={3} width={'nowrap'}>
        {DESCRIPTION_FORM_TITLE}
        <Text fontWeight="light" textColor={'gray.700'} fontSize={'xs'}>
          {DESCRIPTION_FORM_DESCRIPTION}
        </Text>
      </FormLabel>
      <Textarea
        onChange={(e) => {
          dispatch.settingsModel.setDescCharacters(e.target.value.trim()?.length);
          dispatch.settingsModel.setDescription(e.target.value.trim());
        }}
        fontSize={'sm'}
        maxLength={130}
        maxW={{ md: '3xl' }}
        rows={3}
        resize="none"
        defaultValue={profileChanges?.description}
      />
      {descCharacters ? (
        <FormHelperText>
          {130 - descCharacters} {CHARS_REMAINING}
        </FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export default DescriptionForm;
