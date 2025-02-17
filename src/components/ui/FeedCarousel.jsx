"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import {
  Heart,
  MessageCircle,
  Instagram,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getStrapiURL } from "@/lib/utils";

const FeedCarousel = ({ cards = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!Array.isArray(cards) || cards.length === 0) {
    return <div>No cards</div>;
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        touchEventsTarget="container"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="relative group overflow-hidden bg-gray-50 transition-colors duration-300 hover:bg-gray-700">
              {/* Render the image if it exists */}
              {card.image && (
                <img
                  src={`${getStrapiURL()}${card.image.url}`}
                  alt="Feed"
                  className="w-full h-60 object-fit"
                />
              )}

              {/* Overlay that links to the card path */}
              {card.path && (
                <Link
                  href={card.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white">
                    <div className="flex flex-col items-center text-center">
                      <Instagram className="h-5 w-5 mb-2" />
                      <span className="text-md">Shop Insta</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Icons at the bottom */}
              {card.path && (
                <Link
                  href={card.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute text-white bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2">
                      <Heart className="h-6 w-6" />
                    </button>
                    <button className="p-2">
                      <MessageCircle className="h-6 w-6" />
                    </button>
                  </div>
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev-custom group absolute top-1/2 left-4 z-10 transform -translate-y-1/2 bg-gray-50 bg-opacity-30 rounded-full p-2 shadow-md hover:bg-gray-100 hover:bg-opacity-50"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-5 w-5 text-[#AAAAAA] group-hover:text-white" />
      </button>
      <button
        className="swiper-button-next-custom group absolute top-1/2 right-4 z-10 transform -translate-y-1/2 bg-gray-50 bg-opacity-30 rounded-full p-2 shadow-md hover:bg-gray-100 hover:bg-opacity-50"
        aria-label="Next slide"
      >
        <ArrowRight className="h-5 w-5 text-[#AAAAAA] group-hover:text-white" />
      </button>
    </div>
  );
};

export default FeedCarousel;
