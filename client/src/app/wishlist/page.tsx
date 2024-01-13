'use client';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Icon } from '@iconify/react';
import React, { Fragment, useEffect, useState } from 'react';
import { GetWishModel, ProductWishlist } from '@/types';

const Page = () => {
  const [wishlists, setWishlists] = useState<GetWishModel[]>([]);

  const fetchWishlist = async () => {
    const response = await fetch('http://localhost:3000/api/wishlist');
    const responseJson = await response.json();
    setWishlists(responseJson.data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlist = async (id: string | undefined) => {
    await fetch(`http://localhost:3000/api/wishlist`, {
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json' //ini kigta kasih tau bahwa data yang kita kirim itu bentuk nya
      }
    });

    let response = await fetch(`http://localhost:3000/api/wishlist`, {
      cache: 'no-store'
    });

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error('an error while fetching data');
    }

    const data = resJson.data;

    // console.log(data);
    const newData = data.map((el: any) => {
      return {
        id: el._id,
        products: el.Products
      };
    });
    setWishlists(newData);
  };

  return (
    <>
      {/* Navbar component */}
      <Navbar />
      {wishlists.length > 0 ? (
        // Display wishlist items
        <section className="paddingX">
          {wishlists.map((e, i) => {
            return (
              <div
                className="w-[40%] px-4 py-2 flex justify-start gap-4 overflow-y-auto"
                key={i}
              >
                <img
                  src={e?.Product?.thumbnail}
                  className="w-32 h-32 rounded-3xl object-cover"
                />
                <div className="w-full items-center">
                  <p className="text-sm text-[#595959]">{e?.Product?.name}</p>
                  <div className="flex items-center">
                    <Icon icon="jam:store" color="#000" width={20} />
                    <p className="text-xs text-[#A6A6A6]">{e?.Product?.shop}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-[#000000]">
                      {e?.Product?.price}
                    </p>
                    <Icon
                      icon="iconamoon:trash-light"
                      color="#000"
                      width={30}
                      className="cursor-pointer"
                      onClick={() => removeWishlist(e?._id.toString())}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        // Display a message when wishlist is empty
        <div className="flex flex-col p-4 items-center min-h-screen justify-center gap-4">
          <Icon icon="solar:cart-large-4-outline" color="#000" width={200} />
          <p className="text-[#A6A6A6] text-xl font-semibold text-center">
            Oh, it's empty!
          </p>
        </div>
      )}
      {/* Footer component */}
      <Footer />
    </>
  );
};

export default Page;
