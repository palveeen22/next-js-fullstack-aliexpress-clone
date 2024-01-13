import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const cookiesStore = cookies();

  const token = cookiesStore.get('token');

  if (!token || token.value.length <= 0) {
    redirect('/login');
  }

  return <Fragment>{children}</Fragment>;
};

export default Protected;
