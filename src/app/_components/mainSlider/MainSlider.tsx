"use client"
import React from 'react'
import img1 from "./../../../../public/images/blog-img-1.jpeg"
import img2 from "./../../../../public/images/blog-img-2.jpeg"
import img3 from "./../../../../public/images/grocery-banner.png"
import img4 from "./../../../../public/images/grocery-banner-2.jpeg"
import img5 from "./../../../../public/images/banner-4.jpeg"
import img6 from "./../../../../public/images/slider-image-1.jpeg"
import img7 from "./../../../../public/images/slider-image-2.jpeg"
import img8 from "./../../../../public/images/slider-image-3.jpeg"
import img9 from "./../../../../public/images/slider-2.jpeg"
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'


export default function MainSlider() {
  return (
   <div className="mainSlider  mx-auto bg-red-300 flex rounded-md overflow-hidden">
<div className="w-3/4">
<Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
      }}
    >
      <SwiperSlide><Image src={img1} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img2} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img3} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img4} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img5} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img6} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img7} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img8} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img3} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img4} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
      <SwiperSlide><Image src={img9} alt="slider-image-1" className='w-full object-cover h-[400px]'></Image>
</SwiperSlide>
    
    </Swiper>
</div>

<div className="w-1/4">
<Image src={img7} alt="slider-image-1" className='w-full object-cover h-[200px]'></Image>
<Image src={img8} alt="slider-image-1" className='w-full object-cover h-[200px]'></Image>

</div>
   </div>
  )
}
