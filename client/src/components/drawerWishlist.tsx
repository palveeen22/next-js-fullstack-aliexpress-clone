'use client';
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Icon } from '@iconify/react';
import WishlistCard from '@/components/wishlistCard';

interface DrawerProps {
  open: boolean;
  onOk: () => void;
  onClose: () => void;
}

const drawerWishlist: React.FC<DrawerProps> = ({ open, onOk, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showDrawer = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="flex flex-col items-center text-center bg-[#E52F20] p-2 rounded-lg cursor-pointer"
        onClick={showDrawer}
      >
        <Icon icon="mingcute:shopping-cart-1-fill" color="#ffffff" width={25} />
        <p className="text-xs text-[#ffffff]">wishlist</p>
      </div>
      <Drawer
        placement="right"
        onClose={handleCancel}
        open={isOpen}
        width={500}
      >
        <div className="flex flex-col p-4 items-center min-h-screen justify-center gap-4">
          {/* <img src="https://yastatic.net/s3/lavka-web/public/assets/images/emptyCart@2x.png" /> */}
          <Icon icon="solar:cart-large-4-outline" color="#000" width={200} />
          <p className="text-[#A6A6A6] text-xl font-semibold text-center">
            Oh, it's empty!
          </p>
        </div>
        <WishlistCard />
      </Drawer>
    </>
  );
};

export default drawerWishlist;

{
  /* <p className="text-[#A6A6A6] text-xl font-semibold text-center">
            Your cart is empty, open the catalog and choose the best from
            millions of products with free shipping
          </p> */
}
