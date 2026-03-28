"use client";

import React, { useEffect, useRef, useState } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdBannerTypes) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [isAdPushed, setIsAdPushed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (adRef.current && !isAdPushed) {
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push({});
          setIsAdPushed(true);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }, 800); // delay biar layout siap

    return () => clearTimeout(timer);
  }, [isAdPushed]);

  return (
    <div className="w-full min-h-25">
      {/* Fallback */}
      {!isAdPushed && (
        <div className="w-full h-25 bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-sm text-gray-500">
          Advertisement
        </div>
      )}

      {/* AdSense */}
      <ins
        ref={adRef}
        key={dataAdSlot}
        className="adsbygoogle w-full"
        style={{
          display: "block",
          minHeight: "100px",
        }}
        data-ad-client="ca-pub-7302668061459256"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdBanner;
