const Footer = () => {
  return (
    <footer className="py-3 bg-[#f5f5f5] rounded-lg md:py-5 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl flex items-center justify-between w-full px-6 lg:px-0">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-serif px-2">
          2022{' '}
          <a href="https://heds.app/" className="hover:underline">
            heds
          </a>{' '}
          v3
        </span>
        <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 px-2">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 font-serif">
              About
            </a>
          </li>
          <li>
            <a href="/" className="hover:underline font-serif">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
