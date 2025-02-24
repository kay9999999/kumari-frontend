import React from "react";
import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";

const Hero = async ({ response }) => {
  const mediaData = response?.data?.hero || [];

  // Get mobile and desktop media URLs
  const mobileMedia = mediaData[0]?.url
    ? `${getStrapiURL()}${mediaData[0].url}`
    : null;
  const desktopMedia = mediaData[1]?.url
    ? `${getStrapiURL()}${mediaData[1].url}`
    : null;

  if (!mobileMedia || !desktopMedia) {
    return <p>Media not found.</p>;
  }

  return (
    <div>
      {/* Mobile View */}
      <div className="block md:hidden relative pt-[10%]">
        <a href="#" className="flex h-full">
          {mobileMedia.endsWith(".mp4") ? (
            <video
              src={mobileMedia}
              autoPlay
              loop
              muted
              className=" w-full max-w-full h-auto"
              type="video/mp4"
            />
          ) : (
            <Image
              src={mobileMedia}
              alt="Hero Mobile"
              layout="responsive"
              width={1920}
              height={1080}
              priority
            />
          )}
        </a>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block relative pt-[5%]">
        <a href="#" className="flex h-full">
          {desktopMedia.endsWith(".mp4") ? (
            <video
              src={desktopMedia}
              autoPlay
              loop
              muted
              className=" w-full max-w-full h-auto"
              type="video/mp4"
            />
          ) : (
            <Image
              src={desktopMedia}
              alt="Hero Desktop"
              layout="responsive"
              width={1920}
              height={1080}
              priority
            />
          )}
        </a>
      </div>
    </div>
  );
};

export default Hero;
