'use server';
import Navbar from '@/components/navbar';
import Product from '@/app/product/page';

import Footer from '@/components/footer';
import { formatCurrency } from './utils';
import { ProductModel } from '@/database/models/product';
import CarouselHome from '@/components/CarouselHome';
// import { Fragment } from 'react';

const getProducts = async () => {
  const response = await fetch('http://localhost:3000/api/product', {
    cache: 'no-store'
  });
  const responseJson: ProductModel[] = await response.json();

  if (!response.ok) {
    throw new Error('cannot load data...');
  }

  return responseJson;
};

const Home = () => {
  return (
    <section>
      <Navbar />
      <div className="">
        <div className="bg-[#ffffff] paddingYShorter3 min-h-screen">
          <CarouselHome />
          <div className="paddingX my-4  flex justify-between items-center">
            <div className="flex justify-start gap-4">
              <p className="text-[#000] underline cursor-pointer">Sale</p>
              <p className="text-[#a0a0ab] cursor-pointer">Top</p>
              <p className="text-[#a0a0ab] cursor-pointer">Recommend</p>
            </div>
            <p className="text-[#a0a0ab] cursor-pointer">Show All</p>
          </div>
          <Product />
        </div>
      </div>
      <Footer />
    </section>
  );
};
export default Home;
