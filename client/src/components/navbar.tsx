'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import ModalLogin from './modalLogin';
import Wishlist from './drawerWishlist';
import Link from 'next/link';

export const navItem = [
  {
    a: 'Заказ',
    icon: 'bxs:shopping-bags'
  },
  {
    a: 'Корзина',
    icon: 'icon-park-outline:shopping'
  },
  {
    a: 'Войти',
    icon: 'iconamoon:profile-light'
  }
];

const Navbar = () => {
  const placeholderText = [
    'Pajamas untuk semua keluarga..',
    'Makanan ringan menyambut tahun baru...',
    'Alat Cukur kumis'
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [changePlaceholder, setChangePlaceholder] = useState(
    placeholderText[0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setChangePlaceholder((prevPlaceholder) => {
        const currentIndex = placeholderText.indexOf(prevPlaceholder);
        const nextIndex = (currentIndex + 1) % placeholderText.length;
        return placeholderText[nextIndex];
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <nav className="paddingX bg-[#ffffff] py-2">
      <div className="bg-[#fe2722] px-4 py-3 rounded-lg">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <Icon icon="arcticons:aliexpress" width={40} color="#ffffff" />
            <Link href={`/`}>
              <p className="text-[#ffffff] text-xl font-light">Aliexpress</p>
              {/* <Icon icon="simple-icons:aliexpress" width={40} color="#ffffff" /> */}
            </Link>
          </div>
          {/* <InputSearchProduct /> */}
          <div className="w-[50%] flex justify-between">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={changePlaceholder}
                className="w-full bg-[#ffffff] rounded-lg px-2 py-4 h-full text-[#000000] focus:border-[#E52F20]"
              />
              {/* <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-3 bg-[#bef550] text-[#000000] text-sm rounded-full">
                Search
              </button> */}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <Link href={`/product`}>
              <span className="flex flex-col items-center text-center bg-[#E52F20] p-2 rounded-lg cursor-pointer">
                <Icon icon="f7:cube-box" color="#ffffff" width={25} />
                <span className="text-xs text-[#ffffff]">Products</span>
              </span>
            </Link>
            <Link href={`/about`}>
              <span className="flex flex-col items-center text-center bg-[#E52F20] p-2 rounded-lg cursor-pointer">
                <Icon
                  icon="material-symbols-light:contacts-product-outline"
                  color="#ffffff"
                  width={25}
                />
                <span className="text-xs text-[#ffffff]">About</span>
              </span>
            </Link>
            <Link href={`/wishlist`}>
              <span className="flex flex-col items-center text-center bg-[#E52F20] p-2 rounded-lg cursor-pointer">
                <Icon
                  icon="mingcute:shopping-cart-1-fill"
                  color="#ffffff"
                  width={25}
                />
                <p className="text-xs text-[#ffffff]">wishlist</p>
              </span>
            </Link>

            {/* <Wishlist
              open={isModalOpen}
              onOk={closeModal}
              onClose={closeModal}
            /> */}
            <ModalLogin
              open={isModalOpen}
              onOk={closeModal}
              onCancel={closeModal}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
