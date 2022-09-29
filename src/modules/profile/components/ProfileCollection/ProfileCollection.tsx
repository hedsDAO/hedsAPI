import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { User, UserCollection } from '@/modules/profile/models/common';
import useTapeOwnership from '@/hooks/useTapeOwnership';
import { Dispatch, store } from '@/store';
import { useDispatch } from 'react-redux';
import { isEmpty } from '@/utils';

const ProfileCollection = ({ profileData, loading }: { profileData: User; loading: boolean }) => {
  const dispatch = useDispatch<Dispatch>();
  const tapeDataForOwnership: UserCollection = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const { data, refetch, isRefetching } = useTapeOwnership(profileData?.wallet || '', !isEmpty(profileData?.collection) ? {} : tapeDataForOwnership);
  useEffect(() => {
    if ((data?.length, tapeDataForOwnership, profileData?.wallet)) {
      dispatch.profileModel.updateUserCollection([profileData.wallet, tapeDataForOwnership, data]);
    }
  }, [data, isRefetching]);

  return (
    <Button onClick={() => refetch()}>
      <IconRefresh height={8} width={8} />
    </Button>
  );
};

export default ProfileCollection;
