'use client';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Product } from '@/types';

export const senderItem = [
  {
    title: 'free',
    icon: 'solar:box-linear',
    type: 'Доставка Почтой'
  },
  {
    title: 'from 5.0000',
    icon: 'clarity:truck-solid',
    type: 'Пункты выдачи'
  }
];

interface ToCartCardProps {
  data: Product; // Make sure it matches the type of your data
}

const toCartCard: React.FC<ToCartCardProps> = ({ data }) => {
  const postWishlist = async (productId: string | undefined) => {
    try {
      if (!productId) {
        console.error('Invalid productId:', productId);
      }

      const response = await fetch(`http://localhost:3000/api/wishlist`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
      } else {
        console.error(`Failed to add to wishlist. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in postWishlist:', error);
    }
  };

  return (
    <section className="w-[25%] flex flex-col justify-start gap-2  item-center">
      <div className="rounded-xl bg-[#f2f2f2] p-4 text-[#000000]">
        <div className="flex flex-col justify-center text-[#000000] gap-4">
          <div className="flex justify-between gap-10 items-center">
            <h3 className="text-[#E34234] text-lg">Rp 11111</h3>
            <Icon
              icon="material-symbols-light:favorite"
              width={30}
              color="#222222a3"
            />
          </div>
          <div className="flex justify-start items-center gap-4">
            <p className="text-xs text-[#222222] line-through">Rp 24.000,00</p>
            <p className="text-sm text-[#fe2722]">-54% still 3 days</p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-xs p-1 rounded-md bg-[#E34234] text-[#ffe600]">
              SALE
            </p>
            <p className="text-xs p-1 rounded-md bg-[#cccccc] text-[#fff]">
              Have cuppons
            </p>
          </div>
          <div className="flex justify-center w-full gap-2 font-semibold">
            <button
              className="bg-[#bef550] w-[50%] text-sm text-[#000] rounded-lg py-3"
              onClick={() => {
                postWishlist(data?._id.toString());
              }}
            >
              Keranjang
            </button>
            <button className="bg-[#ffe45b] w-[50%] text-sm text-[#000] rounded-lg py-3">
              Beli langsung
            </button>
          </div>
          <p className="text-center text-xs text-[#222222a3]">
            В наличии 499 штук
          </p>
        </div>
      </div>
      <div className="rounded-xl bg-[#f2f2f2] p-4 text-[#222222a3]">
        <div className="flex flex-col justify-center  gap-5">
          <div className="flex px-1 py-1 border gap-2 items-center bg-[#fff] w-28 rounded-lg">
            <Icon icon="ph:truck-thin" color="#00ab11" width={25} />
            <p className="text-sm">to Jakarta</p>
          </div>
          {senderItem?.map((e, i) => {
            return (
              <div className="flex justify-start gap-2" key={i}>
                <Icon icon={e?.icon} width={20} />
                <span className="flex flex-col">
                  <p className="text-sm">25 oct - {e?.title}</p>
                  <p className="text-xs font-light">{e?.type}</p>
                </span>
              </div>
            );
          })}
          <div className="border-b"></div>
          <div className="flex gap-2 items-center">
            <Icon icon="ant-design:safety-outlined" width={15} />
            <p className="text-xs w-[85%]">
              We'll refund your money if you don't receive your order 90 days
              after shipment.
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-[#f2f2f2] p-4 text-[#000000]">
        <div className="flex flex-col justify-center text-[#000000] gap-5">
          <div className="flex gap-2 items-center">
            <Icon icon="jam:store" width={40} />
            <p className="text-xs w-[85%]">Berno shop</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default toCartCard;
