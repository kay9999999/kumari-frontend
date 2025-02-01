import { getStrapiURL } from "@/lib/utils";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductCard = React.memo(({ product }) => {
  const { media, title, price, filter_values } = product;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [hasSwitchedImage, setHasSwitchedImage] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const formatNumberWithCommas = (num) => num.toLocaleString();

  const handlePrev = () => {
    if (media.length > 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex = prevIndex === 0 ? media.length - 1 : prevIndex - 1;
          setHasSwitchedImage(newIndex !== 0);
          return newIndex;
        });
        setIsFading(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (media.length > 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex = prevIndex === media.length - 1 ? 0 : prevIndex + 1;
          setHasSwitchedImage(newIndex !== 0);
          return newIndex;
        });
        setIsFading(false);
      }, 300);
    }
  };

  const handleMouseEnter = () => {
    if (hasSwitchedImage && media.length > 1 && previousImageIndex !== 0) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex(previousImageIndex);
        setIsFading(false);
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    if (hasSwitchedImage && media.length > 1 && currentImageIndex !== 0) {
      setPreviousImageIndex(currentImageIndex);
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex(0);
        setIsFading(false);
      }, 300);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStart - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const validColors = ["rose", "white", "yellow"];

  const typeColors = {
    rose: `bg-gradient-to-br from-[#B76E79] to-[#F33A6A] shadow-[0_6px_12px_rgba(183,110,121,0.5),0_2px_6px_rgba(243,58,106,0.4)] border border-[#B76E79]`,
    white: `bg-gradient-to-br from-[#F0F0F0] to-[#DADADA] shadow-[0_4px_8px_rgba(211,211,211,0.5),0_2px_4px_rgba(211,211,211,0.3)] border border-[#DADADA]`,
    yellow: `bg-gradient-to-br from-[#FCE38A] to-[#F9A602] shadow-[0_4px_8px_rgba(252,227,138,0.5),0_2px_4px_rgba(252,227,138,0.3)] border border-[#F9A602]`,
  };

  return (
    <div
      className="relative  bg-gray-50 overflow-hidden  group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-auto flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {media && media.length > 0 ? (
          <>
            <img
              src={`${getStrapiURL()}${media?.[currentImageIndex]?.url}`}
              alt={`${title} Image`}
              className={`w-full h-full object-contain p-6 transition-opacity duration-300 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
            {media.length > 1 && (
              <>
                <button
                  className="hidden md:flex absolute left-2 top-1/3 transform -translate-y-1/2 bg-gray-200 text-gray-400 w-8 h-8  items-center justify-center rounded-full opacity-0 group-hover:opacity-50 transition-opacity"
                  onClick={handlePrev}
                >
                  <FaArrowLeft size={14} />
                </button>
                <button
                  className="hidden md:flex absolute right-2 top-1/3 transform -translate-y-1/2 bg-gray-200 text-gray-400 w-8 h-8  items-center justify-center rounded-full opacity-0 group-hover:opacity-50 transition-opacity"
                  onClick={handleNext}
                >
                  <FaArrowRight size={14} />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        {filter_values?.length > 0 ? (
          filter_values
            .filter((filter) =>
              validColors.includes(filter.value?.toLowerCase())
            )
            .map((filter) => (
              <div
                key={filter.value}
                className={`w-4 h-4 rounded-full ${
                  typeColors[filter.value.toLowerCase()]
                }`}
                title={
                  filter.value.charAt(0).toUpperCase() + filter.value.slice(1)
                }
              ></div>
            ))
        ) : (
          <div
            className="w-5 h-5 rounded-full bg-gray-50"
            title="Unknown"
          ></div>
        )}
      </div>

      <div className="pb-2 text-center text-[10px] xs:text-sm">
        <div className="text-gray-400 mt-4 tracking-wide">{title}</div>
        <p className="text-gray-600 mt-2 mb-2">{`₹${formatNumberWithCommas(
          price
        )}`}</p>
      </div>
    </div>
  );
});

// Specify a display name for debugging purposes
ProductCard.displayName = "ProductCard";

export default ProductCard;
