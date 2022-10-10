import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { FormControl, FormHelperText, FormLabel, Textarea } from '@chakra-ui/react';

const DescriptionForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const { profileChanges, descCharacters } = useSelector((state: RootState) => state.settingsModel);
  return (
    <FormControl>
      <FormLabel whiteSpace={'nowrap'}>Description</FormLabel>
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
      {descCharacters ? <FormHelperText> {130 - descCharacters} remaining.</FormHelperText> : <></>}
    </FormControl>
  );
};

export default DescriptionForm;
