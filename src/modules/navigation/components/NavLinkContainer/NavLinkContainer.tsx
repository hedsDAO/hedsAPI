const NavLinkContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className={`md:inline hidden sticky text-left px-4`}>
      <div className={`inline-flex text-sm items-center justify-start navbar-parent text-neutral-400 dark:text-neutral-300 font-semibold tracking-widest`}>
        {children}
      </div>
    </ul>
  );
};

export default NavLinkContainer;
