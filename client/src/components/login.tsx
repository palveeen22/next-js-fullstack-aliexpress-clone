'use server';
import { cookies } from 'next/headers';
import Link from 'next/link';
const login = () => {
  return (
    <>
      {!cookies().get('token') ? (
        <Link href={`/login`}>
          <div className="py-3 w-96 text-center rounded-full bg-[#E52F20] text-[#ffffff] cursor-pointer">
            <p>Login</p>
          </div>
        </Link>
      ) : (
        <Link href={`/login`}>
          <div className="py-3 w-96 text-center rounded-full bg-[#E52F20] text-[#ffffff] cursor-pointer">
            <p>Logout</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default login;
