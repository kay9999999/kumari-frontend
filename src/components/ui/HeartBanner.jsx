import React from "react";
import Link from "next/link";
import ReadMoreButton from "./ui/readmorebutton";
import { getStrapiURL } from "@/lib/utils";

const HeartBanner = () => {
  return (
    

      <div className="relative bg-white my-[20px] flex flex-col lg:flex-row ">

        {/* Content Container */}
        <div className="content-data w-full max-w-[1700px] z-10 space-y-4 px-4 order-1 lg:relative lg:z-10 mt-24">
          <Link
            href="/our-collections"
            className="min-h-[50px] md:min-h-[350px] z-10 flex flex-col justify-center items-start py-[60px] px-5 relative no-underline"
          >
            <h2 className="text-[40px] font-primary max-w-[340px] tracking-tight font-light leading-[1.2] mb-3">
              ALL MOODS <i>of</i> KUMARI
            </h2>
            <ReadMoreButton link="/our-collections" label="shop all collections" className="px-4 py-2 text-sm hover:scale-x-110 hover:translate-x-2" />
          </Link>
        </div>

        {/* Image Wrapper */}
        <div className="w-full order-2 lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-0 ">
          <Link href="/our-collections" className="z-0 w-full flex justify-end">
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
                className="object-cover w-[1200px] h-auto max-md:w-full"
              />
            </picture>
          </Link>
        </div>
      </div>
  );
};

export default HeartBanner;
