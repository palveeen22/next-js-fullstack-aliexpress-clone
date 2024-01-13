import React from 'react';
import { Icon } from '@iconify/react';

const WishlistCard = () => {
  return (
    <section className="flex flex-col">
      <div className="w-full px-4 py-2 flex justify-start gap-4 overflow-y-auto">
        <img
          src="https://ae04.alicdn.com/kf/S8a94b6fa7e87427c9f5a7008ece1175ap.jpg_640x640.jpg"
          className="w-32 h-32 rounded-3xl object-cover"
        />
        <div className="w-full items-center">
          <p className="text-sm text-[#595959]">
            Мужская бандана для защиты от солнца
          </p>
          <div className="flex items-center">
            <Icon icon="jam:store" color="#000" width={20} />
            <p className="text-xs text-[#A6A6A6]">FIZIZDH Store</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[#000000]">Rp 22.000.000</p>
            <Icon
              icon="iconamoon:trash-light"
              color="#000"
              width={30}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistCard;
