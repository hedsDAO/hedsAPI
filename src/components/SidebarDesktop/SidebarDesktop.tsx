import React from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpenIcon, CalendarIcon, GlobeAltIcon, MusicalNoteIcon, UsersIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../utils/classNames';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Explore', href: '/explore', icon: GlobeAltIcon, current: true },
  { name: 'Tapes', href: '/tapes', icon: MusicalNoteIcon, current: false },
  { name: 'Artists', href: '/artists', icon: UsersIcon, current: false },
  { name: 'Vote', href: '/vote', icon: CalendarIcon, current: false },
  // { name: 'Spaces', href: '/spaces', icon: InboxIcon, current: false },
  { name: 'About', href: '/about', icon: BookOpenIcon, current: false },
];

export const SidebarDesktop = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-52 md:flex-col shadow-sm">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-100">
          <div className="flex h-16 flex-shrink-0 justify-between items-center bg-gray-100 px-5 mb-1 border-b border-gray-400">
            <img
              className="h-8 w-auto invert"
              src="https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/public%2Fheddot.png?alt=media&token=a1e1d838-5332-4ab6-bb1e-159846efbfd4"
              alt="heds"
            />
            <h1 className="text-neutral-800 font-medium tracking-widest text-lg">heds</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-2 px-2 py-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    "/" + item.name.toLowerCase() === pathname
                      ? 'bg-neutral-700 text-white'
                      : 'bg-neutral-700 text-white hover:bg-gray-700 hover:text-white',
                    'group flex items-center justify-start px-4 py-3 text-xs font-normal font-regular tracking-widest rounded-sm shadow-sm transition-all',
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-gray-100' : 'text-gray-100 group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-4 w-4',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex justify-center gap-x-2 py-5">
              <span className='text-sm font-thin tracking-wide text-indigo-600'>discord</span>
               <span className='text-sm font-thin'>|</span>
              <span className='text-sm font-thin tracking-wide text-blue-600'>twitter</span>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
