const Footer = () => {
  return (
    <footer className="p-3 bg-white rounded-lg md:flex items-center md:justify-between md:py-5 dark:bg-gray-800 mt-5 md:max-w-7xl mx-auto">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 font-serif px-2">
        2022{' '}
        <a href="https://heds.app/" className="hover:underline">
          heds
        </a>{' '}
        v3
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 px-2">
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
    </footer>
  );
};

export default Footer;