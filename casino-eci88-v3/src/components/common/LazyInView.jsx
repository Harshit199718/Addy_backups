import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react'

const LazyInView = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Load content before it comes into view, adjust as needed
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : <Icon icon="eos-icons:three-dots-loading" width="1.2em" height="1.2em"  />}
    </div>
  );
};

export default LazyInView;
