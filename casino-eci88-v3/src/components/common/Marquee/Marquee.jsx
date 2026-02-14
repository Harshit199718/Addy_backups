import React, { Suspense, useEffect, useState } from "react";
// import { MarqueeContainer, MarqueeContent } from "./Marquee.styled";
import FastMarquee from "react-fast-marquee";
const MarqueeContainer = React.lazy(() => import('./Marquee.styled').then(module => ({ default: module.MarqueeContainer })));
const MarqueeContent = React.lazy(() => import('./Marquee.styled').then(module => ({ default: module.MarqueeContent })));
import Skeleton from "react-loading-skeleton";

function Marquee({ text }) {
  return (
    <Suspense fallback={<Skeleton height={30} />}>
      <MarqueeContainer>
        <MarqueeContent>
          <FastMarquee>
            {
              text && text?.map((t, i)=>(
                <div key={t?.id?t.id:i} id={t?.id?t.id:i} className="content">{t.text}</div>
              ))
            }
          </FastMarquee>
        </MarqueeContent>
      </MarqueeContainer>
    </Suspense>
  );
}

export default React.memo(Marquee);
