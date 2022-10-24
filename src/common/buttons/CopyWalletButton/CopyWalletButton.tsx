import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { formatWallet, handleCopy } from '@/utils';
import { Button, Flex, Skeleton, Text } from '@chakra-ui/react';

const CopyWalletButton = ({ loading, wallet }: { loading: boolean; wallet: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Flex alignItems={'center'} data-testid="user-copy-container">
      <Button
        onClick={() => handleCopy(setIsCopied, wallet)}
        size="xs"
        bg={"teal.100"}
        className="mx-0"
        aria-label="edit profile"
        leftIcon={<i className="fa-solid fa-copy" />}
      >
        {wallet?.length && formatWallet(wallet)}
      </Button>
      <Transition
        show={isCopied}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="ml-2 -mt-0.25 text-xs italic font-light text-gray-700 w-24 rounded-lg"
        as="div"
        children={'copied'}
      />
    </Flex>
  );
};

export default CopyWalletButton;
