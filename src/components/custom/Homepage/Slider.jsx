"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { getStrapiURL } from "@/lib/utils";

const Slider = ({ response }) => {
  const sliderImages = response?.data?.slides || [];
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSwiperKey((prevKey) => prevKey + 1); // Force Swiper to reinitialize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden  bg-gray-100">
      <div className="my-[60px] md:my-[80px] lg:my-[100px] mx-auto max-w-[540px] md:max-w-[1680px]">
        <div className="mb-6 md:mb-10">
          <div className="heading w-full ">
            <p className=" text-customGray font-primary text-center text-[27px] sm:text-[32px] md:text-[37px] lg:text-[42px] xl:text-[46px]">
              <i>The</i> JEWELLERY EDITS
            </p>
          </div>
        </div>

        {/* Large Screens */}
        <div className=" hidden md:flex h-auto justify-center items-center relative">
          <Swiper
            key={swiperKey}
            modules={[Autoplay, Navigation]}
            autoplay
            loop={true}
            slidesPerView={3}
            centeredSlides={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="w-full max-w-[90%]"
          >
            {sliderImages.map((img, index) => (
              <SwiperSlide key={img.id}>
                {({ isActive }) => (
                  <div
                    className={`relative transition-transform duration-700 ${
                      isActive ? "z-10" : "z-0"
                    }`}
                    style={{
                      transform: isActive ? "scale(1)" : "scale(0.9)",
                    }}
                  >
                    <a
                      href={img.Url || "#"} // Use the URL property from the data
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={`${getStrapiURL()}${img.image.url}`}
                        alt={img.title || "Slide Image"}
                        width={400}
                        height={600}
                        className="object-cover"
                      />
                      <div className="mt-4 text-start">
                        <h3 className="font-secondary font-semibold text-base">
                          {img.title}
                        </h3>
                        <p className="font-secondary text-sm">
                          {img.description}
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom navigation buttons */}
          <div className="swiper-button-prev absolute left-[-50px] text-black cursor-pointer"></div>
          <div className="swiper-button-next absolute right-[-50px] text-black cursor-pointer"></div>
        </div>

        {/* Small Screens */}
        <div className=" block md:hidden h-auto w-full relative">
          <Swiper
            key={swiperKey}
            modules={[Autoplay, Navigation]}
            autoplay
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            navigation
            className="w-full max-w-[90%] "
          >
            {sliderImages.map((img) => (
              <SwiperSlide key={img.id}>
                <div className="flex flex-col items-center">
                  <a
                    href={img.Url || "#"} // Use the URL property from the data
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`${getStrapiURL()}${img.image.url}`}
                      alt={img.title || "Slide Image"}
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                    <div className="mt-4 text-center">
                      <div className="font-secondary font-semibold text-base">
                        {img.title}
                      </div>
                      <p className="font-secondary text-sm">
                        {img.description}
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* link */}
        <div className="mt-8 flex justify-center items-center text-center text-white">
          <a
            href="#"
            className="bg-black uppercase px-10 py-4 font-secondary text-sm"
          >
            shop our collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
