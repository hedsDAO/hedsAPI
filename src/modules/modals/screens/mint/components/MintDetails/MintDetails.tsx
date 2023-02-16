import { Fragment } from 'react';
import { LabelBadge } from '@/common/badges';
import { Button, Divider, Flex, Tooltip } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { erc721ABI, useContractRead } from 'wagmi';
import { ERC_TOKEN_DESCRIPTION, MINTED_LABEL, PRICE_LABEL, PRICE_VALUE } from '../../models/constants';
import { store } from '@/store';

const MintDetails = () => {
  const contract = useSelector(store.select.tapesModel.selectCurrentTapeContract);
  const tapeId = useSelector(store.select.tapesModel.selectCurrentTapeId);
  const premintStatus = useSelector(store.select.tapesModel.selectCurrentTapePreMintStatus);
  const { data, isLoading, refetch, isRefetching } = useContractRead({
    address: contract as `0x${string}`,
    abi: erc721ABI,
    functionName: 'totalSupply',
  });
  return (
    <Fragment>
      <Flex justifyContent={'center'} mt={2} gap={2} direction={'row'} alignItems={'center'}>
        {tapeId === 'secretgarden' ? (
          <LabelBadge label={PRICE_LABEL} text={'0.03'} textColor={'green.600'} />
        ) : tapeId === 'secretgarden' && !premintStatus ? (
          <LabelBadge label={PRICE_LABEL} text={'0.05'} textColor={'green.600'} />
        ) : (
          <Tooltip label={ERC_TOKEN_DESCRIPTION}>
            <LabelBadge label={PRICE_LABEL} text={PRICE_VALUE} textColor={'green.600'} />
          </Tooltip>
        )}
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

const PreMintPrice = ({ premintStatus }: { premintStatus: boolean }) => (
  <Tooltip label={ERC_TOKEN_DESCRIPTION}>
    <LabelBadge label={PRICE_LABEL} text={premintStatus ? '0.03' : '0.05'} textColor={'green.600'} />
  </Tooltip>
);

export default MintDetails;
