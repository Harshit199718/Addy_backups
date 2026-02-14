import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';
import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';

const SwiperContainer = styled.div`
  position: relative;

  .mySwiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide-image {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: cover;
  }

  .custom-swiper-button {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
  }

  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-next {
    right: 10px;
  }

  .swiper-button-prev:after, .swiper-rtl .swiper-button-next:after, .swiper-button-next:after, .swiper-rtl .swiper-button-prev:after {
    display: none;
  }

  .custom-arrow {
    color: white;
    font-size: 20px;
  }
`
const BannerSlider = ({banners}) => {

  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={30}
        slidesPerView={1.5} // Show part of the previous and next slides
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="mySwiper"
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
      >
        {banners?.map((banner, index) => (
          <SwiperSlide key={banner?.id}>
            <img src={banner?.image} alt={`Banner ${index + 1}`} className="swiper-slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev custom-swiper-button">
        <Icon icon="mdi:arrow-left" className="custom-arrow" />
      </div>
      <div className="swiper-button-next custom-swiper-button">
        <Icon icon="mdi:arrow-right" className="custom-arrow" />
      </div>
    </SwiperContainer>
  );
};

export default BannerSlider;
