"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getStrapiURL } from "@/lib/utils";
import { FaChevronRight } from "react-icons/fa";

const Home_Product = ({ response }) => {
  const products = response?.data?.home_product || [];

  return (
    <div className="max-w-7xl mx-auto px-2 py-12">
      <div className="heading w-full leading-none mb-8">
        <p className="text-customGray font-primary text-center text-[27px] sm:text-[32px] md:text-[37px] lg:text-[42px] xl:text-[46px]">
          <i>Shop</i>
          <br /> BESTSELLER
        </p>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop
        breakpoints={{
          640: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {/* Container with background color */}
            <div className="bg-gray-50 p-4 text-center">
              <a
                href={product.Url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Image Section */}
                <div className="w-full overflow-hidden">
                  <Image
                    src={`${getStrapiURL()}${product.image.url}`}
                    alt={product.name}
                    width={200}
                    height={200}
                    quality={100}
                    unoptimized={true}
                    className="m-auto h-auto w-full"
                  />
                </div>

                {/* Text Section */}
                <h3 className="text-base text-gray-500 mt-4 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-gray-800 mt-2 mb-6">{product.price}</p>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-8 flex justify-center items-center text-center text-black">
        <a href="#" className="font-secondary text-sm flex items-center gap-1 ">
          Explore More
          <FaChevronRight className="text-xs " />
        </a>
      </div>
    </div>
  );
};

export default Home_Product;
