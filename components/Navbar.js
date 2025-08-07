'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-gray-900 text-white flex justify-between px-4 items-center md:h-16 flex-col md:flex-row">
      <Link href={'/'}>
        <Image
          src="/logo.png"
          width={64}
          height={64}
          alt="MatchaCado's logo"
          className="cursor-pointer"
        />
      </Link>

      <div className="flex flex-col gap-6 md:flex-row">
        {session && (
          <>
            <div className="relative inline-block " ref={dropdownRef}>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-[#3B4013] mx-3 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              >
                Welcome {session.user.name || session.user.email}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`z-10 ${
                  isOpen ? '' : 'hidden'
                } absolute top-full right-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href={'/dashboard'}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.username}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Page
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {session && (
          <button
            onClick={() => signOut()}
            type="button"
            className="text-white cursor-pointer bg-[#3B4013] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={'/login'}>
            <button
              type="button"
              className="text-white cursor-pointer bg-[#3B4013] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
