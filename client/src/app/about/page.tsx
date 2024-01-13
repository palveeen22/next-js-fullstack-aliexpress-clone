'use client';
import Navbar from '@/components/navbar';
import React, { Fragment } from 'react';

const page = () => {
  return (
    <Fragment>
      <Navbar />
      <section className="min-h-screen paddingX">
        <img src="https://st.aliexpress.ru/blog-storage/tild6636-3134-4564-a462-323635346631__64_shablon_2.jpg" />
      </section>
    </Fragment>
  );
};

export default page;
