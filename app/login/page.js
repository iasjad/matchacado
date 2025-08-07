'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className="text-white py-14 container mx-auto">
      <div className="social-login-button flex justify-center items-center">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="relative container m-auto px-6">
            <div className="m-auto md:w-7/12">
              <div className="rounded-xl bg-white dark:bg-[#101828] shadow-xl">
                <div className="p-8">
                  <div className="space-y-4">
                    <img
                      src="/logo.png"
                      loading="lazy"
                      className="w-16"
                      alt="dribbble logo"
                    />
                    <h2 className="mb-8 text-2xl text-cyan-900 dark:text-white font-bold">
                      Log in to unlock the <br />
                      support of your fans.
                    </h2>
                  </div>
                  <div className="mt-10 grid space-y-4">
                    <button
                      onClick={() => signIn('google')}
                      className="cursor-pointer group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-[#69731D] focus:bg-[#2d301a] active:bg-blue-100"
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <img
                          src="https://www.svgrepo.com/show/475656/google-color.svg"
                          className="absolute left-0 w-5"
                          alt="google logo"
                        />
                        <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-[#69731D] sm:text-base">
                          Continue with Google
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => signIn('github')}
                      className=" cursor-pointer group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-[#69731D] focus:bg-[#2d301a] active:bg-[#69731D]"
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="absolute left-0 w-5 text-gray-700"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition dark:text-white duration-300 group-hover:text-[#69731D] sm:text-base">
                          Continue with Github
                        </span>
                      </div>
                    </button>
                  </div>
                  <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                    <p className="text-xs">
                      By proceeding, you agree to our{' '}
                      <Link href="/privacy-policy/" className="underline">
                        Terms of Use
                      </Link>{' '}
                      and confirm you have read our{' '}
                      <Link href="/privacy-policy/" className="underline">
                        Privacy and Cookie Statement
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
