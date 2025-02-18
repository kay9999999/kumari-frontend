import React from "react";
import Link from "next/link";
import ReadMoreButton from "./ReadMoreButton";
import { getStrapiURL } from "@/lib/utils";

const HeartBanner = ({ productData }) => {
  return (
    <div className="relative my-10  flex flex-col lg:flex-row ">
      {/* Content Container */}
      <div className="w-full max-w-[1700px] z-10 px-4 sm:px-6 md:px-8 lg:absolute lg:z-10 lg:mt-0 lg:w-1/2 lg:pl-6 xl:pl-14 2xl:pl-40 lg:top-0 xl:top-0 lg:left-0 lg:flex lg:flex-row lg:justify-start lg:items-start p-4">
        <Link
          href="/our-collections"
          className="hearts-content min-h-[50px] xl:top-20 2xl:top-20 z-10 flex flex-col justify-start items-start  relative no-underline  xl:mt-60 lg:space-y-2 xl:space-y-4 "
        >
          <h2 className="font-primary text-[32px] md:text-[36px] lg:text-[40px] xl:text-[46px] 2xl:text-[54px] max-w-[340px] tracking-tight font-light leading-[1.2] mb-3 lg:mb-0 z-20">
            ALL MOODS <i>of</i> KUMARI
          </h2>
          <ReadMoreButton
            link="/our-collections"
            label="shop all collections"
            className="px-4 py-2 text-sm hover:scale-x-110 hover:translate-x-2"
          />
        </Link>
      </div>

      {/* Image Wrapper */}
      <div className=" w-full lg:w-full lg:relative lg:top-0 lg:bottom-0 lg:right-0 mt-6">
        <Link
          href="/our-collections"
          className="heart-img-wrapper z-0 w-full flex justify-end"
        >
          <picture>
            <source
              srcSet={`${getStrapiURL()}${productData.data.image[0].url}`}
              media="(max-width: 479px)"
            />
            <source
              srcSet={`${getStrapiURL()}${productData.data.image[1].url}`}
              media="(max-width: 1024px)"
            />
            <img
              src={`${getStrapiURL()}${productData.data.image[2].url}`}
              alt="Kumari All Collection Banner"
              className="object-cover w-[1200px] xl:w-[1300px] h-auto lg:mt-36 max-xl:mt-0"
            />
          </picture>
        </Link>
      </div>
    </div>
  );
};

export default HeartBanner;
