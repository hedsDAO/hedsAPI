import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalContainerProps {
  isOpen: boolean;
  setModalOpen: Function;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  focus?: '25' | '50' | '75' | '100';
}

const ModalContainer = ({ isOpen, setModalOpen, size, focus, children }: ModalContainerProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setModalOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 bg-black ${
              focus === '25'
                ? 'bg-opacity-25'
                : focus === '50'
                ? 'bg-opacity-50'
                : focus === '75'
                ? 'bg-opacity-75'
                : focus === '100'
                ? 'bg-opacity-100'
                : 'bg-opacity-75'
            }`}
          />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${
                  size === 'xs'
                    ? 'max-w-xs'
                    : size === 'sm'
                    ? 'max-w-sm'
                    : size === 'md'
                    ? 'max-w-md'
                    : size === 'lg'
                    ? 'max-w-lg'
                    : size === 'xl'
                    ? 'max-w-xl'
                    : 'max-w-xl'
                } transform overflow-hidden rounded-2xl bg-gray-100 px-7 py-5 text-left align-middle shadow-xl transition-all`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalContainer;
