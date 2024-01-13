import Navbar from '@/components/navbar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default layout;
