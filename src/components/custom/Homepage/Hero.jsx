import React from "react";
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
            <img
              src={mobileMedia}
              alt="Hero Mobile"
              className=" w-full max-w-full h-auto "
              loading="lazy"
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
            <img
              src={desktopMedia}
              alt="Hero Desktop"
              className=" w-full max-w-full h-auto"
              loading="lazy"
            />
          )}
        </a>
      </div>
    </div>
  );
};

export default Hero;
