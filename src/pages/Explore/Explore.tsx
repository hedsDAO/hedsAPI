import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../App';
import { useSignMessage } from 'wagmi';

export const Explore = ({ wallet }: { wallet?: string }) => {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'heds heds heds',
  });
  console.log(data);
  return (
    <>
      {' '}
      <div className='mx-auto max-w-7xl text-center'>
        <button className="bg-black text-sm rounded-full text-white px-3 py-1" disabled={isLoading} onClick={() => signMessage()}>
          Sign message
        </button>
        {isSuccess && <div>Signature: {data}</div>}
        {isError && <div>Error signing message</div>}
      </div>
    </>
  );
};
