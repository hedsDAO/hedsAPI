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
  const tapeId: string = useSelector(store.select.tapesModel.selectCurrentTapeId);
  const premintStatus: boolean = useSelector(store.select.tapesModel.selectCurrentTapePreMintStatus);
  const { data, isLoading, refetch, isRefetching } = useContractRead({
    address: contract as `0x${string}`,
    abi: erc721ABI,
    functionName: 'totalSupply',
  });
  return (
    <Fragment>
      <Flex justifyContent={'center'} mt={2} gap={2} direction={'row'} alignItems={'center'}>
        <PreMintPrice tapeId={tapeId} premintStatus={premintStatus} />
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

const PreMintPrice = ({ tapeId, premintStatus }: { tapeId: string; premintStatus: boolean }) => {
  const isSecretGarden = tapeId === 'secretgarden';

  return <LabelBadge label={PRICE_LABEL} text={isSecretGarden ? (premintStatus ? '0.03' : '0.05') : premintStatus ? '0.02' : '0.03'} textColor={'green.600'} />;
};

export default MintDetails;
