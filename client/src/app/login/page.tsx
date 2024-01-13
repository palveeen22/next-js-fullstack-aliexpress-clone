import React from 'react';
import Link from 'next/link';
import ErrorShower from '@/components/ErrorShower';
import { LoginProcess } from './action';
import IconLogin from './IconLogin';

const page = () => {
  return (
    <div className="flex justify-center  items-center min-h-screen bg-no-repeat bg-cover bg-center relative">
      <div className="absolute bg-gradient-to-b bg-[#fe2722] opacity-75 inset-0 z-0"></div>
      <form
        className="flex justify-center self-center z-10"
        action={LoginProcess}
      >
        <div className="p-12 bg-white mx-auto rounded-2xl w-100">
          <div className="flex justify-center mb-4">
            <Link href={`/`}>
              <span className="flex gap-4 items-center">
                <IconLogin />
                <p className="text-[#fe2722] text-xl font-light">Aliexpress</p>
              </span>
            </Link>
          </div>
          <ErrorShower />
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Email
              </label>
              <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                type="text"
                placeholder="mail@gmail.com"
                id="email"
                name="email"
              />
            </div>
            <div className="space-y-2">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input
                className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff335f]"
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-center text-[#000000]">
                Don't have an account yet?
              </p>
              <Link href={`/register`}>
                <p
                  rel="noopener noreferrer"
                  className="hover:underline text-[#fe2722] text-sm"
                >
                  Create an Account
                </p>
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-[#fe2722] hover:bg-[#d82724] text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="pt-5 text-center text-gray-400 text-xs">
            <p className="text-sm">Войти с помощью</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
