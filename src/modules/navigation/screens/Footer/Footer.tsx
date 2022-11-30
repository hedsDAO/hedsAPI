import { store } from '@/store';
import { useSelector } from 'react-redux';

const Footer = () => {
  const isShowingPlayer = useSelector(store.select.audioModel.selectIsShowingPlayer);
  return (
    <footer className={`max-w-md mx-auto py-5 rounded-lg md:py-5 mt-10 ${isShowingPlayer && 'mb-[6rem]'}`}>
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-7 w-full px-6 lg:px-0">
        <span className="text-sm text-gray-500 sm:text-center font-serif px-2">
          2022{' '}
          <a href="https://heds.app/" className="hover:underline">
            heds
          </a>{' '}
          v3
        </span>
      </div>
    </footer>
  );
};

export default Footer;
