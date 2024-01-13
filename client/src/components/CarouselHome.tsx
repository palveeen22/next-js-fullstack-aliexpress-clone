'use client';
import React from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import { Fragment, useEffect, useState } from 'react';

import { dataDummy, Images } from '../app/constants';

const CarouselHome = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the active slide index
      setActiveSlide((prevSlide) => (prevSlide + 1) % Images.length);
    }, 3000); // Change the interval as needed (in milliseconds)

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, [activeSlide]);

  return (
    <section className="paddingX">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) => {
          // Update the active slide index when the user manually changes the slide
          setActiveSlide(swiper.activeIndex);
        }}
        initialSlide={activeSlide}
      >
        {Images.map((e, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={e} alt={`Slide ${i + 1}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default CarouselHome;
