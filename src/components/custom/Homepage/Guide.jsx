"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { getStrapiURL } from "@/lib/utils";

const Guide = ({ response }) => {
  const guides = response?.data?.guide || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? guides.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === guides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative max-w-[540px] px-[30px] mx-auto text-customGray p-4 mt-12 rounded-lg">
      {/* Wrapper for Image and Buttons */}
      <div className="relative w-full flex items-center justify-center">
        {/* Left Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-[-40px] md:left-[-80px] top-1/2 transform -translate-y-1/2 text-black p-2"
        >
          <SlArrowLeft size={40} />
        </button>

        {/* Image */}
        <Image
          src={`${getStrapiURL()}${guides[currentIndex]?.image?.url}`}
          alt={guides[currentIndex]?.title || "Guide Image"}
          width={600}
          height={400}
          className="w-full h-full"
        />

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-[-40px] md:right-[-80px] top-1/2 transform -translate-y-1/2 text-black p-2"
        >
          <SlArrowRight size={40} />
        </button>
      </div>

      {/* Title and Description */}
      <div className="mt-4 text-left font-secondary">
        <h2 className="text-sm md:text-base lg:text-lg ">
          {guides[currentIndex]?.title || "No Title"}
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-bold mt-1">
          {guides[currentIndex]?.description || ""}
        </p>
      </div>
      <div className="mt-12 flex justify-center items-center text-center text-white">
        <a
          href="#"
          className="bg-black  uppercase px-10 py-4 font-secondary text-sm"
        >
          gift for loved ones
        </a>
      </div>
    </div>
  );
};

export default Guide;
