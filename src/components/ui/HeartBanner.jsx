import React from "react";
import Link from "next/link";
import ReadMoreButton from "./ui/readmorebutton";


const HeartBanner = () => {
  return (
    
      <div className="relative bg-white pt-40 max-lg:pt-0 flex flex-col lg:flex-row ">

        {/* Content Container */}
       
        <div className=" w-full max-w-[1700px] z-10 space-y-4 px-4 order-1 lg:order-1 lg:absolute lg:z-10 lg:mt-0 lg:w-1/2 lg:pl-8 lg:top-0 xl:top-0 lg:left-0 lg:flex lg:flex-col lg:justify-start lg:items-start ">
          <Link
            href="/our-collections"
            className="hearts-content min-h-[50px]  xl:top-20 2xl:top-20 z-10 flex flex-col justify-start items-start py-[10px] px-5 relative no-underline lg:pt-0 xl:mt-60 " 
          >
            <h2 className="text-[38px] font-primary max-w-[340px] tracking-tight font-light leading-[1.2] mb-3 lg:mb-0 z-20">
              ALL MOODS <i>of</i> KUMARI
            </h2>
            <ReadMoreButton link="/our-collections" label="shop all collections" className="px-4 py-2 text-sm hover:scale-x-110 hover:translate-x-2" />
          </Link>
        </div>
        
        {/* Image Wrapper */}
        <div className="w-full order-2 lg:order-2 lg:w-full lg:relative lg:top-0 lg:bottom-0 lg:right-0 ">
          <Link href="/our-collections" className="z-0 w-full flex justify-end">
            <picture>
              <source
                srcSet="/images/product/Kumari_All_collection_banner_Mobile_1.jpg"
                media="(max-width: 479px)"
              />
              <source
                srcSet="/images/product/Kumari_All_collection_banner_Tablet.jpg"
                media="(max-width: 1024px)"
              />
              <img
                src="/images/product/Kumari_All_collection_banner_Desktop_1.jpg"
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
