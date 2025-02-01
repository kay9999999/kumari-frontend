"use client";
import React, { useState, useEffect } from "react";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";

const Hero_mid = ({ response }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Safely access carousel images
  const images = [
    `${getStrapiURL()}${response?.data?.carousel?.img_1?.url || ""}`,
    `${getStrapiURL()}${response?.data?.carousel?.img_2?.url || ""}`,
    `${getStrapiURL()}${response?.data?.carousel?.img_3?.url || ""}`,
  ].filter(Boolean); // Remove invalid or empty URLs

  // Slide every 5 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [images]);

  return (
    <div className="outer w-full flex flex-col lg:flex-row">
      {/* Hero Section */}
      <div className="hero w-full lg:w-1/2 flex relative h-auto">
        {/* Background Image */}
        <a href="#">
          <Image
            src={`${getStrapiURL()}${response?.data?.hero_2?.url || ""}`}
            alt="Hero"
            width={850}
            height={400}
            quality={100}
            className="w-full h-full object-contain"
          />
        </a>

        {/* Visible Text and Link */}
        <div className="absolute bottom-[4%] left-[7%] text-white z-[2]">
          {/* Just Landed */}
          <div className=" text-3xl md:text-4xl lg:text-5xl font-primary leading-none">
            <span className="italic">Just</span>
            <br className="leading-none" />
            <span className="mt-0">Landed</span>
          </div>

          {/* Anchor Tag */}
          <a
            href="#"
            className="text-sm md:text-base lg:text-lg inline-block mt-6  font-secondary  "
          >
            SHOP NEW ARRIVALS
          </a>
        </div>
      </div>

      {/* Carousel + Background Section */}
      <div className="carousel-bg w-full lg:w-1/2 relative h-[65vh] xs:h-[90vh] sm:h-[110vh] md:h-[130vh]  lg:h-auto ">
        {/* Background */}
        <div className="absolute inset-0 ">
          <Image
            src={`${getStrapiURL()}${response?.data?.bg_mid?.url || ""}`}
            alt="Background"
            fill
            objectFit="cover"
            objectPosition="center"
            quality={90}
            className="z-[-1]"
          />
        </div>

        {/* Carousel */}
        <div className="carousel relative block w-full h-full items-center">
          <a href="#">
            <div className="  relative  max-w-[66%]  h-full  overflow-hidden flex flex-row ml-auto mr-auto">
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  objectFit="contain"
                  className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                    index === currentImageIndex
                      ? "opacity-100 visible animate-slide-in"
                      : "opacity-0 invisible animate-slide-out"
                  }`}
                />
              ))}
            </div>
          </a>
        </div>

        <div className="absolute bottom-[4%] left-[7%] text-white z-[2]">
          {/* Just Landed */}
          <div className=" text-3xl md:text-4xl lg:text-5xl font-primary leading-none">
            <span className="italic">Get it</span>
            <br className="leading-none" />
            <span className="mt-0">NOW</span>
          </div>

          {/* Anchor Tag */}
          <a
            href="#"
            className="text-sm md:text-base lg:text-lg inline-block mt-6  font-secondary  "
          >
            5 DAY DELIVERY IN MUMBAI
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero_mid;
