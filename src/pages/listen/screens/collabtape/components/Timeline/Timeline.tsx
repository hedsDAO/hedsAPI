import { Fragment } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import Mint from '../Mint/Mint';
import PreMint from '../PreMint/PreMint';

const Timeline = () => {
  const { currentCollabTape } = useSelector((state: RootState) => state.tapesModel);
  return (
    <Fragment>
      {currentCollabTape && (
        <div className="py-6">
          <div className="mx-auto max-w-xl lg:max-w-7xl px-10 lg:px-10">
            <dl className="space-y-10 lg:grid lg:grid-cols-2 lg:gap-20 lg:space-y-0">
              <PreMint />
              <Mint />
            </dl>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Timeline;
