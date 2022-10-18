import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'src/store';
import { classNames } from '@/utils';

export const PaginationBar = () => {
  const dispatch = useDispatch<Dispatch>();
  const artistData = useSelector((state: RootState) => state.artistModel);
  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 lg:max-w-7xl lg:px-4 max-w-7xl mx-auto">
      <button
        onClick={() => dispatch.artistModel.setPreviousPage()}
        className="flex justify-start mr-auto px-3 py-1 bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all shadow-sm"
      >
        <ArrowLongLeftIcon className="h-6 w-6 text-gray-200" aria-hidden="true" />
      </button>
      <div className="hidden md:-mt-px md:flex gap-x-2">
        {[...Array((Math.ceil(artistData.totalArtists / 10) * 10) / 10)].map((index, i) => {
          return (
            <button
              key={'artists' + i}
              onClick={() => dispatch.artistModel.setCurrentPage(i + 1)}
              className={classNames(
                i + 1 === artistData.currentPage ? 'bg-neutral-950 shadow-sm' : 'text-neutral-800 hover:bg-neutral-950 hover:text-gray-200',
                'inline-flex items-center rounded-full px-3 py-1 font-medium text-gray-300 transition-all',
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => dispatch.artistModel.setNextPage()}
        className="flex justify-end ml-auto px-3 py-1 bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all shadow-sm"
      >
        <ArrowLongRightIcon className="h-6 w-6 text-gray-200" aria-hidden="true" />
      </button>
    </nav>
  );
};
