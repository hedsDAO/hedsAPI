import { Fragment } from 'react';
import { LabelBadge } from '@/common/badges';
import { Button, Divider, Flex } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { erc721ABI, useContractRead } from 'wagmi';
import { MINTED_LABEL, PRICE_LABEL, PRICE_VALUE, TOKEN_LABEL, TOKEN_VALUE } from '../../models/constants';
import { store } from '@/store';

const MintDetails = () => {
  const contract = useSelector(store.select.tapesModel.selectCurrentTapeContract);
  const { data, isLoading, refetch, isRefetching } = useContractRead({
    address: contract as `0x${string}`,
    abi: erc721ABI,
    functionName: 'totalSupply',
  });
  return (
    <Fragment>
      <Flex justifyContent={'center'} mt={2} gap={2} direction={'row'} alignItems={'center'}>
        <LabelBadge label={PRICE_LABEL} text={PRICE_VALUE} textColor={'green.600'} />
        <LabelBadge label={TOKEN_LABEL} text={TOKEN_VALUE} textColor={'orange.600'} />
        <LabelBadge label={MINTED_LABEL} text={isRefetching ? '...' : data?._isBigNumber ? data?.toNumber().toString() : '0'} textColor={'blue.600'} />
        <Button
          leftIcon={<IconRefresh height="12" width="12" />}
          disabled={isRefetching || isLoading}
          variant={'link'}
          size="xs"
          p={1}
          isLoading={isRefetching || isLoading}
          onClick={() => refetch()}
        ></Button>
      </Flex>
      <Divider my={4} />
    </Fragment>
  );
};

export default MintDetails;