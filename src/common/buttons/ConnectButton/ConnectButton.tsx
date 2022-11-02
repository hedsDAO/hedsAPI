import { ConnectKitButton } from 'connectkit';
import { useNavigate } from 'react-router-dom';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { classNames } from '@/utils';

const ConnectButton = () => {
  const navigate = useNavigate();
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <div className="flex items-center gap-x-1">
            <button
              onClick={isConnected ? () => navigate('/profile') : () => show()}
              type="button"
              className={`
                ${isConnected ? 'bg-black' : 'gradient'}
                inline-flex items-center rounded-full border border-transparent px-6 py-1.5 font-semibold text-sm tracking-widest leading-4 text-gray-100 shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2
              `}
            >
              {isConnected ? ensName || address.slice(0, 5) + '...' : isConnecting ? <i className="fas fa-circle-notch fa-spin"></i> : 'connect'}
            </button>
            {isConnected && (
              <button onClick={() => show()} className="px-3 py-1.5 bg-neutral-950 rounded-full">
                <EllipsisHorizontalIcon className="h-5 w-5 text-gray-300" />
              </button>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
