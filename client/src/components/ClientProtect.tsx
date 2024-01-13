import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ClientProtect = ({ children }: { children: React.ReactNode }) => {
  const cookiesStore = cookies();

  const token = cookiesStore.get('token');

  if (!token || token.value.length <= 0) {
    redirect('/login?error=Please login first');
  }

  return <>{children}</>;
};

export default ClientProtect;
