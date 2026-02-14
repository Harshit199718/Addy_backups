import React from 'react';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { SliderContainer } from './Slider.styled';
import Skeleton from 'react-loading-skeleton';
import Image from '../../components/common/Image';
import { selectConfigData } from '../../api/generalApi';

const Slider = ({slides, isLoading}) => {
  const options = {
    type         : 'loop',
    gap          : '1rem',
    autoplay     : true,
    pauseOnHover : true,
    resetProgress: false,
    height       : 'auto',
    arrows: false,
    pagination: false, 
    flickPower: 2500
  };

  const { progress_bar } = useSelector(selectConfigData);
  if (isLoading) {
    return (
      <>
        <Skeleton height={184} />
        <Skeleton height={2} />
      </>
    )
  }
  return (
    <SliderContainer className="splide_wrapper" $progress_bar={progress_bar}>
      {slides?.length > 0 && (
      <Splide
        options={{ ...options, start: false }}
        aria-labelledby="autoplay-example-heading"
        hasTrack={ false }
      > 
        <div className="splide_image">
          <SplideTrack>
            {slides?.map((slide, idx) => (
              <SplideSlide key={ slide.id }>
                <Image src={slide.image} alt="" height="100%" skeletonHeight="100%" />
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>

        <div className="splide__progress" >
          <div className="splide__progress__bar" />
        </div>
      </Splide>
      )}
    </SliderContainer>
  );
};


export default Slider;