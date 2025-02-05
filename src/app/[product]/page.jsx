"use client";

import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "next/navigation";
import qs from "qs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { getStrapiURL } from "@/lib/utils";
import Breadcrumbs from "@/components/custom/Breadcrumbs";
import Link from "next/link";
import { IoIosArrowRoundDown } from "react-icons/io";
import {
  Info,
  ChevronDown,
  ChevronUp,
  LogOut,
  Package,
  MoveUpRight,
  Heart,
  Share2,
  MailQuestion,
  Weight,
  Gem,
  Sparkle,
  Truck,
  RefreshCcw,
  NotepadText,
  ShieldCheck,
} from "lucide-react";

const ProductPage = () => {
  const params = useParams();
  const productSlug = params.product;
  const URL = getStrapiURL();
  const [swiperKey, setSwiperKey] = useState(0);
  const [metalSelected, setmetalSelected] = useState(null);
  const [metalColorSelected, setmetalColorSelected] = useState("Yellow");
  const [diamondQualitySelected, setDiamondQualitySelected] = useState("SI");

  // Local state for selected size and dropdown open/closed state
  const [sizeSelected, setSizeSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSwiperKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productsEndpoint = qs.stringify(
    {
      populate: {
        media: { fields: ["url"] },
        categories: {
          sort: ["createdAt:asc"],
          fields: ["name", "slug"],
        },
        sub_categories: {
          sort: ["createdAt:asc"],
          fields: ["name", "slug"],
        },
        filter_values: { fields: ["value"] },
        available_sizes: { populate: "*" },
      },

      filters: {
        slug: productSlug, // Filter by slug field
      },
    },
    { encodeValuesOnly: true }
  );

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch(`/api/products?${productsEndpoint}`);

  const product = productsData || [];
  const mainProduct = Array.isArray(product) ? product[0] : product;

  // Extract available_sizes from product (which is an array of one object)
  const availableSizesData =
    mainProduct?.available_sizes &&
    Array.isArray(mainProduct.available_sizes) &&
    mainProduct.available_sizes.length > 0
      ? mainProduct.available_sizes[0]
      : {};

  const sizes = Array.isArray(availableSizesData?.size?.size)
    ? availableSizesData?.size?.size
    : [];

  const defaultSize =
    availableSizesData.default_size || (sizes.length > 0 ? sizes[0] : "");
  const sizeGuideLabel = availableSizesData.size_guide_label || "Size Guide";
  const sizeGuideLink = availableSizesData.size_guide_link || "/";

  // Update selected size if default changes
  useEffect(() => {
    setSizeSelected(defaultSize);
  }, [defaultSize]);

  if (!mainProduct) return null;
  if (productsLoading) return <div>Loading...</div>;
  if (productsError) return <div>Error: {productsError.message}</div>;

  // Fixed ordering arrays
  const metalOrder = ["14K GOLD", "18K GOLD"];
  const metalColorOrder = ["Rose", "White", "Yellow"];
  const diamondOrder = ["SI / IJ", "VS / GH", "VVS / EF"];

  // metal
  const metalFilters = (
    mainProduct?.filter_values?.filter((filter) => {
      const value = filter.value?.toUpperCase();
      return value === "14K GOLD" || value === "18K GOLD";
    }) || []
  ).sort((a, b) => {
    const aVal = a.value?.toUpperCase();
    const bVal = b.value?.toUpperCase();
    return metalOrder.indexOf(aVal) - metalOrder.indexOf(bVal);
  });

  // metal color
  const metalColorOptions = (
    mainProduct?.filter_values?.filter((filter) => {
      const val = filter.value;
      return val === "Rose" || val === "White" || val === "Yellow";
    }) || []
  ).sort((a, b) => {
    return metalColorOrder.indexOf(a.value) - metalColorOrder.indexOf(b.value);
  });

  // diamondOptions
  const diamondOptions = (
    mainProduct?.filter_values?.filter((filter) => {
      const val = filter.value?.toUpperCase();
      return val === "SI / IJ" || val === "VS / GH" || val === "VVS / EF";
    }) || []
  ).sort((a, b) => {
    const aVal = a.value?.toUpperCase();
    const bVal = b.value?.toUpperCase();
    return diamondOrder.indexOf(aVal) - diamondOrder.indexOf(bVal);
  });

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleSizeSelect = (size) => {
    setSizeSelected(size);
    setDropdownOpen(false);
  };

  return (
    <section className="w-full  pt-20">
      {/*  dynamic breadcrumbs  */}
      <div className="w-full pt-2 lg:pt-3 xl:pt-5 px-2 xl:px-0">
        <Breadcrumbs product={product} />
      </div>
      <div className="flex flex-col lg:flex-row pt-2">
        {/* Product Images and video section */}
        <div className="lg:w-3/5 px-8 ">
          {/* Mobile Carousel */}
          <div className="block lg:hidden ">
            <Swiper
              key={swiperKey}
              spaceBetween={10}
              navigation
              loop={true}
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {product.map((item) =>
                // Add optional chaining for media
                item?.media?.map((image, index) => (
                  <SwiperSlide key={`${item.id}-${index}`}>
                    <div className="bg-gray-50 overflow-hidden">
                      <img
                        src={`${URL}${image.url}`}
                        alt={item.title}
                        className="w-full h-auto"
                      />
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden  lg:grid lg:grid-cols-2 lg:gap-4 lg:mt-2 xl:mt-1">
            {product?.map((item) =>
              item?.media?.map((image, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="bg-gray-50 overflow-hidden"
                >
                  <img
                    src={`${URL}${image.url}`}
                    alt={item.title}
                    className="w-full h-auto"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="lg:w-2/5 px-5 pt-5 lg:pt-0 mx-auto w-full max-w-[540px]">
          <div className="mb-6">
            <h2 className="text-2xl lg:text-[28px] font-[500] mb-3 text-[#1A1A1A]">
              {mainProduct?.title}
            </h2>
            <h2 className="uppercase mb-2 text-sm text-[#1A1A1A]">
              {mainProduct.collection}
            </h2>
            <div className="mb-4 text-[#808080] text-[14px]">
              {mainProduct?.info?.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.children.map((child, idx) => (
                    <span
                      key={idx}
                      style={{
                        whiteSpace: "pre-wrap",
                        fontStyle: child.italic ? "italic" : "normal",
                        fontWeight: child.bold ? "bold" : "normal",
                        textDecoration: `${
                          child.underline ? "underline" : ""
                        } ${child.strikethrough ? "line-through" : ""}`,
                      }}
                    >
                      {child.text}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            <div className="flex flex-row items-center">
              <a
                href="#"
                className="hover:underline text-black flex items-center"
              >
                <span>Write a review</span>
                <span>
                  <IoIosArrowRoundDown size={20} />
                </span>
              </a>
            </div>

            <div className="flex flex-row items-center mt-5">
              <h4 className="mr-4 text-[#1A1A1A] ">Certifications</h4>
              <picture className="flex space-x-6">
                <a
                  href="https://www.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/certificate-logoHolm.png"
                    alt="BIS logo"
                    className="object-cover w-15 h-9"
                  />
                </a>
                <a
                  href="https://sgl-labs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/certificate-logoSGL.png"
                    alt="BIS logo"
                    className="object-cover w-15 h-9"
                  />
                </a>
              </picture>
            </div>

            {/* Metal */}
            <div className="product-options mt-4">
              <div className="flex items-center text-[#1A1A1A] space-x-1">
                <span className="  mr-2">Metal</span>
                <Info className="w-3 h-3" />
                <Link href="/" className="hover:underline  text-sm">
                  <span>Metal Guide</span>
                </Link>
              </div>

              <div className="flex text-center text-sm text-[#404040] mt-2 space-x-3">
                {metalFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className={`flex-grow  border  rounded p-4 cursor-pointer ${
                      metalSelected === filter.value.toUpperCase()
                        ? "border-2 border-black"
                        : " hover:outline hover:outline-gray-300 hover:outline-1"
                    }`}
                    onClick={() => setmetalSelected(filter.value.toUpperCase())}
                  >
                    <span>{filter.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metal Color */}
            <div className="product-options mt-4">
              <div className="flex items-center text-[#1A1A1A] ">
                <span className=" mr-2">Metal Color</span>
                <span className="text-sm text-[#646464] mr-2">
                  {metalColorSelected}
                </span>
                <Info className="w-3 h-3 mr-1" />
                <Link href="/" className="hover:underline  text-sm">
                  <span>Metal Color Guide</span>
                </Link>
              </div>

              <div className="flex text-center text-sm mt-2 space-x-3 text-[#404040]">
                {metalColorOptions.map((option) => {
                  const colorValue = option.value; // e.g. "Rose", "White", or "Yellow"
                  return (
                    <div
                      key={option.id}
                      className={`flex-grow border  rounded p-2 cursor-pointer ${
                        metalColorSelected === colorValue
                          ? "border-2 border-black"
                          : " hover:outline hover:outline-gray-300 hover:outline-1"
                      }`}
                      onClick={() => setmetalColorSelected(colorValue)}
                    >
                      <picture>
                        <img
                          src={`/images/${colorValue.toLowerCase()}.png`}
                          alt={colorValue}
                          className="mx-auto w-[30px] h-[30px]"
                        />
                      </picture>
                      <span className="block text-center mt-1">
                        {colorValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Diamond Quality */}
            <div className="product-options mt-4">
              <div className="flex items-center text-[#1A1A1A]">
                <span className="  mr-2">Diamond Quality</span>
                <Info className="w-3 h-3 mr-1" />
                <Link href="/" className="hover:underline text-sm">
                  <span>Diamond Guide</span>
                </Link>
              </div>

              <div className="flex text-center mt-2 space-x-3">
                {diamondOptions.map((option) => {
                  const qualityValue = option.value;
                  return (
                    <div
                      key={option.id}
                      className={`flex-grow border  rounded p-4 cursor-pointer ${
                        diamondQualitySelected === qualityValue
                          ? "border-2 border-black"
                          : " hover:outline hover:outline-gray-300 hover:outline-1"
                      }`}
                      onClick={() => setDiamondQualitySelected(qualityValue)}
                    >
                      <span>{qualityValue}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="product-options mt-4">
              {/* Header with dynamic size guide */}
              <div className="flex items-center text-[#1A1A1A] space-x-1">
                <span className=" mr-2">Size</span>
                <Info className="w-3 h-3" />
                <Link href={sizeGuideLink} className="hover:underline text-sm">
                  <span>{sizeGuideLabel}</span>
                </Link>
              </div>

              {/* Dropdown Toggle */}
              <div className="relative mt-2">
                <div
                  className={`text-[#4D4D4D] text-sm flex justify-between items-center w-full text-center border rounded p-4 cursor-pointer ${
                    dropdownOpen ? "border-gray-300" : "border-2 border-black"
                  }`}
                  onClick={toggleDropdown}
                >
                  <div className="flex flex-col text-center mx-auto">
                    <span>{sizeSelected}</span>
                  </div>
                  {dropdownOpen ? (
                    <ChevronUp className="ml-2" />
                  ) : (
                    <ChevronDown className="ml-2" />
                  )}
                </div>

                {/* Dropdown List */}
                {dropdownOpen && (
                  <div className="text-[#404040] text-sm relative flex flex-wrap justify-around z-10 w-full bg-white mt-1">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className={`py-3 m-1 border text-center cursor-pointer rounded hover:outline hover:outline-gray-300 hover:outline-1 ${
                          size === sizeSelected ? "border-2 border-black" : ""
                        } ${
                          // Adjust width as needed; here we use full width for the last item
                          size === sizes[sizes.length - 1]
                            ? "w-full"
                            : "w-[23%] "
                        }`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        <span>{size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
