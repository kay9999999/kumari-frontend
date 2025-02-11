import { getStrapiURL } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductCard = React.memo(({ product }) => {
  const validColors = ["Rose", "White", "Yellow"];

  const availableMetalColors =
    product.filter_values?.filter((filter) =>
      validColors.includes(filter.value)
    ) || [];

  // Set default metal color to the first available color, or fallback to "common"
  const defaultMetalColor =
    availableMetalColors.length > 0 ? availableMetalColors[0].value : "";

  const [metalColorSelected, setMetalColorSelected] =
    useState(defaultMetalColor);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [hasSwitchedImage, setHasSwitchedImage] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const filteredImageVariants =
    product?.imageVariants?.filter((variant) => {
      if (
        variant.metalColor &&
        variant.metalColor.trim() !== "" &&
        variant.metalColor.toLowerCase() !== "common"
      ) {
        return (
          variant.metalColor.toLowerCase() === metalColorSelected.toLowerCase()
        );
      }
      return true;
    }) || [];

  // Reset the carousel index if the metal color changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [metalColorSelected]);

  const formatNumberWithCommas = (num) => num.toLocaleString();

  const handlePrev = () => {
    if (filteredImageVariants.length > 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex =
            prevIndex === 0 ? filteredImageVariants.length - 1 : prevIndex - 1;
          setHasSwitchedImage(newIndex !== 0);
          return newIndex;
        });
        setIsFading(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (filteredImageVariants.length > 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex =
            prevIndex === filteredImageVariants.length - 1 ? 0 : prevIndex + 1;
          setHasSwitchedImage(newIndex !== 0);
          return newIndex;
        });
        setIsFading(false);
      }, 300);
    }
  };

  const handleMouseEnter = () => {
    if (
      hasSwitchedImage &&
      filteredImageVariants.length > 1 &&
      previousImageIndex !== 0
    ) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex(previousImageIndex);
        setIsFading(false);
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    if (
      hasSwitchedImage &&
      filteredImageVariants.length > 1 &&
      currentImageIndex !== 0
    ) {
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

  return (
    <Link href={`/${product.slug}`}>
      <div
        className="relative bg-gray-50 overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-full h-auto flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          {filteredImageVariants.length > 0 ? (
            <>
              <img
                src={`${getStrapiURL()}${
                  filteredImageVariants[currentImageIndex]?.image?.url
                }`}
                alt={`${product.title} Image`}
                className={`w-full h-full object-contain pt-8 px-8 pb-4 transition-opacity duration-300 ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              />
              {filteredImageVariants.length > 1 && (
                <>
                  <button
                    className="hidden md:flex absolute left-2 top-1/3 transform -translate-y-1/2 bg-gray-200 text-gray-400 w-8 h-8 items-center justify-center rounded-full opacity-0 group-hover:opacity-50 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handlePrev(e);
                    }}
                  >
                    <FaArrowLeft size={14} />
                  </button>
                  <button
                    className="hidden md:flex absolute right-2 top-1/3 transform -translate-y-1/2 bg-gray-200 text-gray-400 w-8 h-8 items-center justify-center rounded-full opacity-0 group-hover:opacity-50 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleNext(e);
                    }}
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

        {/* Metal Color Icons */}
        <div className="flex justify-center  space-x-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          {availableMetalColors.length > 0 &&
            availableMetalColors.map((filter) => (
              <img
                key={filter.value}
                src={`/images/${filter.value.toLowerCase()}.png`}
                alt={filter.value}
                title={filter.value}
                className={`w-5 h-5 cursor-pointer ${
                  metalColorSelected.toLowerCase() ===
                  filter.value.toLowerCase()
                    ? "border border-black rounded-full"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setMetalColorSelected(filter.value);
                }}
              />
            ))}
        </div>

        <div className="pb-4 text-center text-[10px] xs:text-sm">
          <div className="text-gray-400 mt-6 tracking-wide">
            {product.title}
          </div>
          <p className="text-gray-600 mt-4 ">
            {`₹${formatNumberWithCommas(product.price)}`}
          </p>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
