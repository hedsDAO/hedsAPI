import { ConnectKitButton } from 'connectkit';
import LoadingIcon from '../Icons/LoadingIcon';
import React from 'react';

export const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <button
            onClick={() => show()}
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-neutral-900 px-6 py-1.5 text-sm tracking-widest font-thin leading-4 text-gray-100 shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
          >
            {isConnected ? ensName || address.slice(0, 5) + '...' : isConnecting ? <LoadingIcon /> : 'connect'}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
