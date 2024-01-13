'use client';
import React, { Fragment, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ProductCard from '@/app/product/page';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { MyResponse } from '@/app/api/product/route';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import ToCartCard from './components/toCartCard';
import { Product } from '@/types';
import { ObjectId } from 'mongodb';

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

const getProductById = async (slug: string): Promise<MyResponse<Product>> => {
  const response = await fetch(`http://localhost:3000/api/product/${slug}`);

  const responseJson = await response.json();

  return responseJson;
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const productDetail = await getProductById(params.slug);
  const data = productDetail.data as Product;

  return (
    <section className="flex flex-col paddingX paddingYShorter2">
      <section className="w-full flex justify-between gap-8  bg-[#ffffff]">
        <div className="overflow-y-auto w-[75%] flex flex-col justify-start gap-2">
          <div className="flex justify-center gap-4 paddingXShorter">
            <div className="w-64 h-64 flex flex-col gap-2">
              {data?.images?.map((e: string, i: number) => {
                return (
                  <img src={e} className="rounded-lg object-cover" key={i} />
                );
              })}
            </div>
            <Fragment>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {data?.images?.map((el: string, i: number) => (
                  <SwiperSlide key={i}>
                    <img src={el} className="object-cover rounded-lg" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Fragment>
            <div className="w-[30%] flex flex-col gap-4 text-[#000000]">
              <p className="font-semibold text-sm text-start">{data?.name}</p>
              <div className="flex flex-col justify-start gap-2">
                <div className="flex justify-start gap-4">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      // changeRating={ratingChanged}
                      defaultValue={2.5}
                      precision={4.2}
                    />
                  </Stack>
                  <p className="text-[#000000] text-base">{data?.rate}</p>
                </div>

                <p className="text-[#000000] text-sm">2.900 Ulasan</p>
                <p className="text-[#000000] text-sm">130 Terbeli</p>
              </div>
              <div className="flex  flex-col justify-start gap-2">
                <p className="text-sm">Description :</p>
                <p className="text-sm text-justify text-[#a6a6a6]">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToCartCard data={data} />
      </section>
      <ProductCard />
    </section>
  );
};

export default ProductPage;
