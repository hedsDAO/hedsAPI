import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { formatWallet, handleCopy } from '@/utils';
import { Button, Fade, Flex, Skeleton, Text } from '@chakra-ui/react';
import { IconCheck } from '@tabler/icons';
import * as gaEvents from '@/events';

const WalletButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const isLoading = useSelector((state: RootState) => state.loading.models.userModel);
  return (
    <Button
      onClick={() => {
        handleCopy(setIsCopied, wallet);
        gaEvents.clickCopyWalletAddress();
      }}
      leftIcon={<i className="fa-solid fa-copy text-xs"></i>}
      fontWeight={'light'}
      bg="gray.100"
      border={'1px'}
      borderColor="gray.800"
      rounded="sm"
      size="xs"
      width={{ base: '24ch', lg: '24ch' }}
      fontFamily={'Space Mono'}
    >
      {isCopied ? (
        <Fade in={isCopied}>
          <Flex gap={1.5} alignItems={'center'}>
            <Text size="xs">copied</Text>
            <IconCheck height="10" width="10" />
          </Flex>
        </Fade>
      ) : (
        <Text>{formatWallet(wallet)}</Text>
      )}
    </Button>
  );
};

export default WalletButton;
