import { RootState } from '@/store';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Mint, Submit, Vote } from '@/pages/listen/screens/hedstape/components';

const Timeline = () => {
  const { currentTape } = useSelector((state: RootState) => state.tapesModel);
  return (
    <Fragment>
      {currentTape && (
        <div className="py-6">
          <div className="mx-auto max-w-xl lg:max-w-6xl px-3 lg:px-1">
            <dl className="space-y-10 lg:grid lg:grid-cols-3 lg:gap-20 lg:space-y-0">
              <Submit />
              <Vote />
              <Mint />
            </dl>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Timeline;
