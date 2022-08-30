import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <button
      onClick={() => connect()}
      type="button"
      className="inline-flex items-center rounded-sm border border-transparent bg-neutral-900 px-3 py-2 text-sm tracking-widest leading-4 text-gray-100 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {'login'}
    </button>
  );
};
