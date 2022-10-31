import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { formatWallet, handleCopy } from '@/utils';
import { Button, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserWallet } from '@/pages/user/store/selectors';
import { RootState } from '@/store';

const CopyWalletButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const wallet = useSelector(selectUserWallet);

  return (
    <Flex alignItems={'center'} data-testid="user-copy-container">
      {!loading && (
        <Button
          onClick={() => handleCopy(setIsCopied, wallet)}
          size="xs"
          bg={'teal.100'}
          className="mx-0"
          aria-label="edit profile"
          leftIcon={<i className="fa-solid fa-copy" />}
        >
          {wallet?.length && formatWallet(wallet)}
        </Button>
      )}
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
