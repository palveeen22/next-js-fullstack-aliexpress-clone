import ClientProtectCom from '@/components/ClientProtect';
import React from 'react';

export default function WishLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ClientProtectCom>{children}</ClientProtectCom>;
}
