import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const ImageContainer = styled.div`
  width: ${props => props.$width ? props.$width : "100%"};
  height: ${props => props.$height ? props.$height : "auto"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 100%;
    height: 100%;
    display: block;
  }

  @keyframes blinker {
    50% {
      box-shadow: 0 0 15px ${props => props.theme.primary_color ? props.theme.primary_color : "#fff"};
    }
  }
`;

function Image({ width, height, skeletonWidth, skeletonHeight, square, circle, imageWidth, imageHeight, ...props }) {
  const [loading, setLoading] = useState(true);
  const imageRef = useRef();
  const imageContainerRef = useRef();
  const observerRef = useRef();
  const [imageSrc, setImageSrc] = useState("")

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Image is now in view, start loading
          setImageSrc(props.src);
          observerRef.current.disconnect(); // Disconnect observer after load
        }
      });
    }, {
      rootMargin: '50px', // Load slightly before the image comes into view
    });

    if (imageContainerRef.current) {
      observerRef.current.observe(imageContainerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [props.src]);

  useEffect(() => {
    if (imageSrc) {
      if (imageRef.current.complete) {
        setLoading(false);
      } else {
        imageRef.current.onload = () => {
          setLoading(false);
        };
      }
    }
  }, [imageSrc]);
  const skeletonProps = {
    ...(circle !== null && circle !== undefined) && { circle },
    ...(skeletonHeight !== null && skeletonHeight !== undefined) && { height: skeletonHeight },
    ...(skeletonWidth !== null && skeletonWidth !== undefined) && { width: skeletonWidth }
  };
  return (
    <ImageContainer $width={width} $height={height} $imageWidth={imageWidth} $imageHeight={imageHeight} ref={imageContainerRef}>
      {(loading && !square) && <Skeleton {...skeletonProps} />}
      {(loading && square) && <div style={{ width: '100%', position: 'absolute', paddingTop: '100%' }}><Skeleton style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} /></div>}
      {imageSrc && <img ref={imageRef}
        style={{ display: loading ? "none" : "block", }}
        {...props}
      />}
    </ImageContainer>
  );
}

export default Image;
