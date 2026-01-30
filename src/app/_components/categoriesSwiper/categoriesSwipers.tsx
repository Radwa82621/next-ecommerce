"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Category } from '@/types';

export default function CategoriesSwipers({categories}: {categories: Category[]}) {
  return (

      <>
      <h2 className='mt-8 capitalize text-xl font-bold '>our featured categories </h2>
        <Swiper 
        className=" mt-5 mb-12 container mx-auto rounded-md overflow-hidden"
          spaceBetween={10}
          slidesPerView={5}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
        >
          {categories.map((cat: Category) => (
            <SwiperSlide key={cat._id} >
              <Image
                src={cat.image}
                alt={cat.name || "category-image"}
                width={100}
                height={100}
                className="w-full object-cover h-[250px] rounded-md"
              />
    
              <h3 className='text-center mt-3 text-lg'>{cat.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
  )
}
