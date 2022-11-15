import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { formatWallet, handleCopy } from '@/utils';
import { Button, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserWallet } from '@/pages/user/store/selectors';
import { RootState } from '@/store';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

const CopyWalletButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const wallet = useSelector(selectUserWallet);
  return (
    <Flex alignItems={'center'} data-testid="user-copy-container">
      {!loading && (
        <SecondaryButton size="xs" onClick={() => handleCopy(setIsCopied, wallet)}>
          <i className="fa-solid fa-copy mr-1" />
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
        </SecondaryButton>
      )}
    </Flex>
  );
};

export default CopyWalletButton;
