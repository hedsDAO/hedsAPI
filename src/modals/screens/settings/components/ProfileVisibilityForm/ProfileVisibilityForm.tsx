import { Dispatch, RootState } from '@/store';
import { Badge, Flex, FormControl, FormLabel, Switch, Text, Tooltip } from '@chakra-ui/react';
import { IconInfoCircle } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

const ProfileVisibilityForm = () => {
  const dispatch = useDispatch<Dispatch>();
  const { profileChanges } = useSelector((state: RootState) => state.settingsModel);
  return (
    <FormControl id="profile-visibility">
      <FormLabel whiteSpace={'nowrap'}>Profile Visibility</FormLabel>
      <Flex gap={2} alignItems={'center'}>
        <Badge px={1.5} gap={1} rounded="full" alignItems={'center'} display={'flex'} colorScheme={profileChanges?.public ? 'green' : 'red'}>
          <Tooltip textAlign={'center'} label={'A public profile will display your anonymous submissions, curated tracks and votes.'} fontSize="sm">
            <span>
              <IconInfoCircle height={15} width={15} />
            </span>
          </Tooltip>
          <Text fontSize="sm" pr={0.5}>
            {profileChanges?.public ? 'public' : 'private'}
          </Text>
        </Badge>
        <Switch isChecked={profileChanges?.public} onChange={() => dispatch.settingsModel.setPublic(!profileChanges?.public)} />
      </Flex>
    </FormControl>
  );
};

export default ProfileVisibilityForm;
