import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { formatWallet, handleCopy } from '@/utils';
import { Flex, Skeleton, Text } from '@chakra-ui/react';

const CopyWalletButton = ({ loading, wallet }: { loading: boolean; wallet: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Flex data-testid="user-copy-container">
      <Skeleton rounded="md" height="10px" fadeDuration={2} isLoaded={!loading}>
        <Text as="button" onClick={() => handleCopy(setIsCopied, wallet)} data-testid="user-wallet" fontSize={'sm'}>
          <i className="fa-solid fa-copy mr-2 text-[0.75rem]" />
          {formatWallet(wallet || '0x0000')}
        </Text>
      </Skeleton>
      <Transition
        show={isCopied}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="text-[0.75rem] font-bold mt-auto px-2.5 py-0.5 text-white bg-gray-200 w-24 rounded-lg"
        as="div"
      >
        copied
      </Transition>
    </Flex>
  );
};

export default CopyWalletButton;
