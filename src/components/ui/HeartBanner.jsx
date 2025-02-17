import React from "react";
import Link from "next/link";
import ReadMoreButton from "./ui/readmorebutton";
import { getStrapiURL } from "@/lib/utils";

const HeartBanner = () => {
  return (
    
    // <style jsx>{`
    //     @media (min-width: 991px) {
    //       .custom-flex {
    //         display: flex;
    //         flex-direction: row;
    //       }
    //     }
    //     @media (max-width: 990px) {
    //       .custom-flex {
    //         display: flex;
    //         flex-direction: column;
    //       }
    //     }
    //   `}</style>

      <div className="relative bg-white my-[30px] flex flex-col md:flex-row ">

        {/* Content Container */}
        <div className="content-data w-full max-w-[1700px] z-10 space-y-4 px-4 order-1 md:relative md:z-10">
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
        <div className="w-full order-2 md:absolute md:top-0 md:right-0 md:bottom-0 md:left-0">
          <Link href="/our-collections" className="z-0 w-full flex justify-end">
            <picture>
              <source
                type="image/webp"
                srcSet={`${getStrapiURL()}${productData.data.image[0].url}`}
                media="(max-width: 479px)"
              />
              <source
                type="image/webp"
                srcSet={`${getStrapiURL()}${productData.data.image[1].url}`}
                media="(max-width: 991px)"
              />
              <source
                srcSet={`${getStrapiURL()}${productData.data.image[0].url}`}
                media="(max-width: 479px)"
              />
              <source
                srcSet={`${getStrapiURL()}${productData.data.image[1].url}`}
                media="(max-width: 991px)"
              />
              <source
                type="image/webp"
                srcSet={`${getStrapiURL()}${productData.data.image[2].url}`}
              />
              <img
                src={`${getStrapiURL()}${productData.data.image[2].url}`}
                alt="Kumari All Collection Banner"
                className="object-cover w-[1200px] h-auto"
              />
            </picture>
          </Link>
        </div>
      </div>
  );
};

export default HeartBanner;
