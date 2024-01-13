'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IconProductSatu, IconProductDua } from '@/app/product/IconProduct';
import { formatCurrency } from '../utils';
import { ProductModelProps } from '@/types';
import Link from 'next/link';

// Define the functional component
const ProductPage: React.FC = () => {
  const fetchProducts = async () => {
    const response = await fetch(`http://localhost:3000/api/product`);
    const responseJson = await response.json();
    console.log(responseJson);
    setProducts(responseJson.data);
  };
  // State variables
  const [products, setProducts] = useState<ProductModelProps[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/product?search=${search}&page=${page}`,
        {
          method: 'GET'
        }
      );
      const responseJson = await response.json();
      setProducts(responseJson.data);
    };
    const debouncedFetchProducts = debounce(fetchProducts, 300);
    debouncedFetchProducts();
    fetchProducts();
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/product?search=${search}&page=${page}`,
        {
          method: 'GET'
        }
      );
      const responseJson = await response.json();
      setProducts(responseJson.data);
    };
    fetchProducts();
  }, [page]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };
  return (
    <section className="paddingX">
      {/* Search input and button */}
      <div className="my-6 flex w-[30%] gap-2 border rounded-lg border-[#fe2722] ml-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Find product here..."
          className="w-full bg-[#ffffff] rounded-lg px-2 py-4 h-full text-[#000000] focus:border-[#E52F20]"
        />
      </div>

      {/* Product with Infinite Scroll */}
      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={true}
        loader={<></>}
      >
        <div className="grid grid-cols-5 gap-4">
          {products?.map((product: ProductModelProps) => (
            <div className="relative flex flex-col gap-2" key={product?._id}>
              {/* Product details */}
              <Link href={`/product/${product?.slug}`}>
                <p className="absolute top-2 left-2 bg-[#000000] text-[#ffffff] rounded-full px-2 py-1 italic">
                  {product?.status}
                </p>
                <img
                  src={product?.thumbnail}
                  className="h-72 w-72 rounded-3xl object-cover"
                />
                <p className="text-sm">{product?.name}</p>
                <div className="flex justify-start gap-2">
                  <div className="flex justify-between text-[#000000] item-center">
                    <IconProductSatu />
                    <p className="text-[#000000] text-sm">{product?.rate}</p>
                  </div>
                  <p className="text-[#000000] text-sm">1222 bought</p>
                </div>
                <p className="text-[#fe2722] text-xl font-bold">
                  {formatCurrency(product?.price)}
                </p>
                <div className="flex justify-start gap-2 items-center">
                  <IconProductDua />
                  <p className="text-[#00ab11] text-sm">Up to 30 days</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default ProductPage;
