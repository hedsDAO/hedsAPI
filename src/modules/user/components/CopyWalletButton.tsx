import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { formatWallet, handleCopy } from '@/utils';

const CopyWalletButton = ({ wallet }: { wallet: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div data-testid="user-copy-container" className="inline-flex">
      <button
        data-testid="user-wallet"
        onClick={() => handleCopy(setIsCopied, wallet)}
        className="inline-flex items-center text-xs self-start tracking-tight text-black py-0.5 rounded-lg"
      >
        <i className="fa-solid fa-copy mr-2 text-[0.75rem]"></i>
        {wallet && formatWallet(wallet)}
      </button>
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
    </div>
  );
};

export default CopyWalletButton;
