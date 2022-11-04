import { Fragment, useState } from 'react';
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
          bg={'gray.50'}
          borderColor={'gray.200'}
          className="mx-0 border"
          aria-label="edit profile"
          leftIcon={<i className="fa-solid fa-copy" />}
        >
          {isCopied ? (
            <Transition
              show={isCopied}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              as={Fragment}
              children={<span className="font-light italic text-xs text-center px-2">copied</span>}
            />
          ) : (
            <span className="animate__animated animate__fadeIn">{wallet?.length && formatWallet(wallet)}</span>
          )}
        </Button>
      )}
    </Flex>
  );
};

export default CopyWalletButton;
