const Footer = () => {
  return (
    <footer className="max-w-md mx-auto py-5 rounded-lg md:py-5 dark:bg-gray-800 mt-10">
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-7 w-full px-6 lg:px-0">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-serif px-2">
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
