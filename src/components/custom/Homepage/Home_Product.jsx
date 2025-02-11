"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaChevronRight } from "react-icons/fa";
import qs from "qs";
import useFetch from "@/hooks/useFetch";
import ProductCard from "../ProductCard";

const Home_Product = () => {
  // Build query string to fetch only home products
  const productsEndpoint = qs.stringify(
    {
      filters: { type: "home" },

      populate: {
        imageVariants: { populate: { image: { fields: ["url"] } } },
        filter_values: { fields: ["value"] },
      },
    },
    { encodeValuesOnly: true }
  );

  // Fetch products from API
  const {
    data: products,
    loading,
    error,
  } = useFetch(`/api/products?${productsEndpoint}`);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 pb-12 pt-20">
      <div className="heading w-full leading-none mb-12">
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
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 flex justify-center items-center text-center text-black">
        <a href="#" className="font-secondary text-sm flex items-center gap-1">
          Explore More
          <FaChevronRight className="text-xs" />
        </a>
      </div>
    </div>
  );
};

export default Home_Product;
