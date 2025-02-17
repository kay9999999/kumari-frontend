"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Heart, MessageCircle, Instagram } from "lucide-react";
import Link from "next/link";
import { getStrapiURL } from "@/lib/utils";

const FeedCarousel = ({ cards = [], slidesPerView = {} }) => {
  if (!Array.isArray(cards) || cards.length === 0) {
    return <div>No cards</div>;
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        navigation
        loop={true}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: slidesPerView,
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
            <div className="relative group overflow-hidden bg-gray-50">
              {/* Render the image if it exists */}
              {card.image && (
                <img
                  src={`${getStrapiURL()}${card.image.url}`}
                  alt="Feed"
                  className="w-full h-60 object-cover"
                />
              )}

              {/* Overlay that links to the card path */}
              {card.path && (
                <Link href={card.path}>
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
                  <div className="absolute text-white bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-4">
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
    </div>
  );
};

export default FeedCarousel;
