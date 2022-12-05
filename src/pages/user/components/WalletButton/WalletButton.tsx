import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { formatWallet, handleCopy } from '@/utils';
import { Button, Fade, Flex, Skeleton, Text } from '@chakra-ui/react';
import { IconCheck } from '@tabler/icons';

const WalletButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const isLoading = useSelector((state: RootState) => state.loading.models.userModel);
  return (
    // <Skeleton isLoaded={!isLoading} width="10ch" rounded="md">
      <Button
        onClick={() => handleCopy(setIsCopied, wallet)}
        leftIcon={<i className="fa-solid fa-copy text-xs"></i>}
        variant="outline"
        fontWeight={'light'}
        size="xs"
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
    // </Skeleton>
  );
};

export default WalletButton;
