"use client";

import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "next/navigation";
import qs from "qs";
import { Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { getStrapiURL } from "@/lib/utils";
import Breadcrumbs from "@/components/custom/Breadcrumbs";
import Link from "next/link";
import { IoIosArrowRoundDown } from "react-icons/io";
import { TbMailHeart } from "react-icons/tb";
import RelatedProducts from "@/components/ui/RelatedProducts";
import ReadMoreButton from "@/components/ui/ReadMoreButton";
import Story from "@/components/custom/Homepage/Story";
import FeedCarousel from "@/components/ui/FeedCarousel";
import HeartBanner from "@/components/ui/HeartBanner";

import {
  Info,
  ChevronDown,
  ChevronUp,
  LogOut,
  Package,
  MoveUpRight,
  Heart,
  Share2,
  Weight,
  Gem,
  LoaderCircle,
  Circle,
  ChevronRight,
} from "lucide-react";
import { getProductPageData } from "@/data/loader";
import PriceBreakup from "@/components/custom/PriceBreakup";

const ProductPage = () => {
  const params = useParams();
  const productSlug = params.product;

  const URL = getStrapiURL();
  const [productData, setProductData] = useState(null);
  const [FeedData, setFeedData] = useState(null);

  const [swiperKey, setSwiperKey] = useState(0);
  const [metalSelected, setmetalSelected] = useState("");
  const [metalColorSelected, setmetalColorSelected] = useState("");
  const [diamondQualitySelected, setDiamondQualitySelected] = useState("");
  const [detailsDropdownOpen, setDetailsDropdownOpen] = useState(false);
  const [priceBreakupOpen, setPriceBreakupOpen] = useState(false);
  const [metalCode, setMetalCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);

  // Local state for selected size and dropdown open/closed state
  const [sizeSelected, setSizeSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const policyIcons = [
    { url: "/images/truck.png", text: "Free shipping within India" },
    { url: "/images/return.png", text: "Free 15-day easy returns" },
    { url: "/images/insurance.png", text: "One-year Jewellery Insurance" },
    { url: "/images/buyback.png", text: "Lifetime exchange and buy-backs" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setSwiperKey((prevKey) => prevKey + 1);
    };

    window.addEventListener("resize", handleResize);

    const fetchData = async () => {
      const response = await getProductPageData();
      setProductData(response);
      setFeedData(response);
    };

    fetchData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const productsEndpoint = qs.stringify(
    {
      populate: {
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
        weight: { populate: "*" },
        imageVariants: {
          populate: {
            image: { fields: ["url"] },
          },
        },
      },

      filters: {
        slug: productSlug,
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
  const availableSizesData = mainProduct?.available_sizes || {};

  const sizes = availableSizesData?.size?.size || [];

  const defaultSize =
    availableSizesData.default_size || (sizes.length > 0 ? sizes[0] : "");
  const sizeGuideLabel = availableSizesData.size_guide_label || "Size Guide";
  const sizeGuideLink = availableSizesData.size_guide_link || "/";

  const weight = mainProduct?.weight || [];

  // Filter the weight detail matching the selected metal type
  const selectedWeight = weight?.find(
    (item) => item.metal_type === metalSelected
  );

  // Update selected size if default changes
  useEffect(() => {
    setSizeSelected(defaultSize);
  }, [defaultSize]);

  // Fixed ordering arrays
  const metalOrder = ["14k Gold", "18k Gold"];
  const metalColorOrder = ["Rose", "White", "Yellow"];
  const diamondOrder = ["SI-IJ", "VS-GH", "VVS-EF"];

  // metal
  const metalOptions = (
    mainProduct?.filter_values?.filter((filter) => {
      const value = filter.value;
      return value === "14k Gold" || value === "18k Gold";
    }) || []
  ).sort((a, b) => {
    const aVal = a.value;
    const bVal = b.value;
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
      return val === "SI-IJ" || val === "VS-GH" || val === "VVS-EF";
    }) || []
  ).sort((a, b) => {
    const aVal = a.value?.toUpperCase();
    const bVal = b.value?.toUpperCase();
    return diamondOrder.indexOf(aVal) - diamondOrder.indexOf(bVal);
  });

  useEffect(() => {
    if (metalOptions.length > 0) {
      setmetalSelected(metalOptions[0].value);
    } else {
      setmetalSelected("");
    }
    if (metalColorOptions.length > 0) {
      setmetalColorSelected(metalColorOptions[0].value);
    } else {
      setmetalColorSelected("");
    }
    if (diamondOptions.length > 0) {
      setDiamondQualitySelected(diamondOptions[0].value);
    } else {
      setDiamondQualitySelected("");
    }
  }, [mainProduct]);

  // / Create mapping for color abbreviations
  const colorAbbreviations = {
    Rose: "R",
    White: "W",
    Yellow: "Y",
  };

  // Generate metal code when metal or color changes
  useEffect(() => {
    if (metalSelected && metalColorSelected) {
      // Convert metal type to code format (e.g., "14K Gold" -> "14KT")
      const metalPart =
        metalSelected
          .replace(/\s/g, "") // Remove spaces
          .replace(/Gold$/i, "") // Remove "Gold" from the end
          .toUpperCase() + "T"; // Add T at the end

      // Get color abbreviation
      const colorPart = colorAbbreviations[metalColorSelected] || "";

      setMetalCode(`${metalPart}${colorPart}`);
    }
  }, [metalSelected, metalColorSelected]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleSizeSelect = (size) => {
    setSizeSelected(size);
    setDropdownOpen(false);
  };

  if (!mainProduct) return null;
  if (productsLoading) return <div>Loading...</div>;
  if (productsError) return <div>Error: {productsError.message}</div>;

  return (
    <section className="w-full  pt-20">
      {/*  dynamic breadcrumbs  */}
      <div className="w-full pt-2 lg:pt-3 xl:pt-5 px-2 xl:px-0">
        <Breadcrumbs product={product} />
      </div>
      {/* images and details section */}
      <div className="flex flex-col lg:flex-row pt-2">
        {/* Product Images - Mobile Carousel */}
        <div className="lg:w-3/5 px-8">
          <div className="block lg:hidden">
            <Swiper
              key={swiperKey}
              spaceBetween={10}
              navigation
              loop={true}
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
            >
              {product.map((item) =>
                item?.imageVariants
                  ?.filter((variant) => {
                    // If the variant has a metalColor set, show it only if it matches the selected metal color.
                    if (
                      variant.metalColor &&
                      variant.metalColor.trim() !== "" &&
                      variant.metalColor !== "common"
                    ) {
                      return (
                        variant.metalColor.toLowerCase() ===
                        metalColorSelected.toLowerCase()
                      );
                    }
                    // Otherwise, include the image as a common/default image.
                    return true;
                  })
                  .map((variant, index) => (
                    <SwiperSlide key={`${item.id}-${index}`}>
                      <div className="bg-gray-50 overflow-hidden">
                        <img
                          src={`${URL}${variant.image.url}`}
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
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4 lg:mt-2 xl:mt-1">
            {product?.map((item) =>
              item?.imageVariants
                ?.filter((variant) => {
                  if (
                    variant.metalColor &&
                    variant.metalColor.trim() !== "" &&
                    variant.metalColor !== "common"
                  ) {
                    return (
                      variant.metalColor.toLowerCase() ===
                      metalColorSelected.toLowerCase()
                    );
                  }
                  return true;
                })
                .map((variant, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="bg-gray-50 overflow-hidden"
                  >
                    <img
                      src={`${URL}${variant.image.url}`}
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
          <div className="mb-4">
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
              {metalOptions.map((filter) => (
                <div
                  key={filter.id}
                  className={`flex-grow  border  rounded p-4 cursor-pointer ${
                    metalSelected === filter.value
                      ? "border-2 border-black"
                      : " hover:outline hover:outline-gray-300 hover:outline-1"
                  }`}
                  onClick={() => setmetalSelected(filter.value)}
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
              <span className="text-sm text-[#646464] mr-2 pt-0.5">
                {metalColorSelected}
              </span>
              <Info className="w-3 h-3 mr-1 " />
              <Link href="/" className="hover:underline  text-sm pt-0.5">
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
                    <span className="block text-center mt-1">{colorValue}</span>
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

            <div className="flex text-center text-sm text-[#404040] mt-2 space-x-3">
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
          {/* {Size} */}
          {sizes?.length > 0 && (
            <div className="product-options mt-4">
              {/* Header with dynamic size guide */}
              <div className="flex items-center text-[#1A1A1A] space-x-1">
                <span className="mr-2">Size</span>
                <Info className="w-3 h-3" />
                {sizeGuideLink && (
                  <Link
                    href={sizeGuideLink}
                    className="hover:underline text-sm"
                  >
                    <span>{sizeGuideLabel}</span>
                  </Link>
                )}
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
          )}

          {/* Amount Section */}
          <div className="mt-6 product-price ">
            <div className="flex justify-between items-center ">
              <span className="text-2xl font-primary text-[#1A1A1A]">
                {`₹${parseFloat(finalPrice).toLocaleString()}`}{" "}
              </span>

              <div className="flex flex-row items-center gap-1">
                <Link
                  href="/"
                  className="hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="text-sm">Signup for Price Alert</span>
                </Link>
              </div>
            </div>

            <p className="text-xs mt-2  text-[#808080]">
              Eligible for a Cash on Delivery, You can choose it during
              checkout.
            </p>
          </div>
          {/* Postcode Section */}
          <div className="mt-6">
            <div className="flex items-center text-[#404040] space-x-2">
              <Package className="w-5 h-5" />
              <span>Order Today : </span>
            </div>
            <div>
              <p className="text-xs text-[#404040] mt-2">
                Delivery not available
              </p>
              <Link href="/" className="hover:underline ">
                <span className="text-xs flex items-center mt-1 gap-1">
                  Enter your postcode for exact delivery timelines
                  <MoveUpRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            </div>
          </div>
          {/* Add to cart */}
          <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-center items-center z-20 lg:relative lg:mt-6 lg:bg-none lg:justify-start lg:z-0 py-2 lg:py-0">
            <div className="px-2 lg:px-0 w-full max-w-lg flex items-center justify-between">
              <div className="flex-1">
                <ReadMoreButton
                  link="/"
                  label="Add to Bag"
                  className="w-full py-2 lg:py-3 hover:opacity-85 transition duration-200 capitalize rounded"
                />
              </div>
              <div className="pl-8 space-x-2 flex h-10 lg:h-12">
                {[Heart, Share2].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-[#FAFAFA] flex justify-center items-center rounded"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drop a hint */}
          <div className="flex justify-center p-4 mt-6 w-full bg-[#FAFAFA] rounded">
            <Link href="/" className="flex items-center ">
              <TbMailHeart className="w-5 h-5 mr-2 " strokeWidth={1} />
              <span>Drop a hint</span>
            </Link>
          </div>
          {/* More Details Section */}
          <div className="relative mt-4">
            {/* Header that toggles the dropdown */}
            <div
              className={`flex text-[#4D4D4D] justify-between w-full border rounded-t cursor-pointer p-4 ${
                detailsDropdownOpen ? "border-b-0" : ""
              }`}
              onClick={() => setDetailsDropdownOpen(!detailsDropdownOpen)}
            >
              <div className="flex flex-col">
                <span className="text-sm">More Details</span>
              </div>
              {detailsDropdownOpen ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              )}
            </div>

            {/* Transition for dropdown content with stretching animation */}
            <Transition
              show={detailsDropdownOpen}
              enter="transition-all duration-300 ease-out"
              enterFrom="opacity-0 transform origin-top scale-y-0"
              enterTo="opacity-100 transform origin-top scale-y-100"
              leave="transition-all duration-300 ease-in"
              leaveFrom="opacity-100 transform translate-y-0 max-h-screen"
              leaveTo="opacity-0 transform -translate-y-2 max-h-0"
            >
              <div className="relative z-10 w-full border border-t-0 border-gray-200 rounded-b overflow-hidden">
                <div className="flex border-b text-[#4D4D4D] justify-between pb-2">
                  <div className="text-sm pl-4">Specifications</div>
                  <div className="text-xs pt-0.5 pr-4">
                    SKU: {selectedWeight?.SKU}
                  </div>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2">
                  {(() => {
                    const sections = [
                      {
                        title: "Total Weight",
                        Icon: Weight,
                        value: selectedWeight?.total_weight,
                        description: "Approx. Gross Weight",
                        tooltip:
                          "Weight can vary in the final product. A refund will be initiated if it is lesser than the weight mentioned.",
                      },
                      {
                        title: "Metal Weight",
                        Icon: LoaderCircle,
                        value: selectedWeight?.metal_weight,
                        description: "Approx. Metal Weight",
                      },
                      {
                        title: "Diamond",
                        Icon: Gem,
                        value: selectedWeight?.diamond_weight,
                        description: "Approx. Diamond Weight",
                      },
                      {
                        title: "Stone",
                        Icon: Gem,
                        value: selectedWeight?.stone_weight,
                        description: "Approx. Stone Weight",
                      },
                      {
                        title: "Components",
                        Icon: Circle,
                        value: selectedWeight?.components_weight,
                        description: "Approx. Components Weight",
                      },
                    ];

                    const validSections = sections.filter(
                      (section) =>
                        section.value !== undefined && section.value !== null
                    );

                    if (validSections.length === 0) return null;

                    return validSections.map((section, index) => {
                      const isLastOdd =
                        validSections.length % 2 !== 0 &&
                        index === validSections.length - 1;
                      return (
                        <div
                          key={section.title}
                          className={`flex flex-col items-center justify-center p-4 border-gray-200 ${
                            !isLastOdd ? "xs:border-r" : ""
                          } ${
                            !isLastOdd || validSections.length > 1
                              ? "xs:border-b"
                              : ""
                          } ${isLastOdd ? "xs:col-span-2" : ""}`}
                        >
                          <section.Icon
                            strokeWidth={1}
                            className="mb-2 text-[#4D4D4D]"
                          />
                          <h1 className="text-sm font-medium text-[#4D4D4D]">
                            {section.title}
                          </h1>
                          <div className="flex items-center space-x-1 mt-1">
                            {section.hasLink ? (
                              <Link
                                href="/"
                                className="text-sm text-[#4D4D4D] underline"
                              >
                                {section.value}
                              </Link>
                            ) : (
                              <p className="text-sm text-[#4D4D4D] underline">
                                {section.value}
                              </p>
                            )}
                            {section.tooltip && (
                              <span className="relative group inline-block">
                                <Info className="w-4 h-4 cursor-pointer text-[#4D4D4D]" />
                                <span className="absolute left-1/2 transform -translate-x-1/2 -top-10 w-40 bg-[#555] text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                                  {section.tooltip}
                                </span>
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-[#808080]">
                            {section.description}
                          </p>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </Transition>
          </div>
          {/* Price Breakup */}
          <PriceBreakup
            productSlug={productSlug}
            metalCode={metalCode}
            diamondQuality={diamondQualitySelected}
            metalSelected={metalSelected}
            metalColorSelected={metalColorSelected}
            priceBreakupOpen={priceBreakupOpen}
            setPriceBreakupOpen={setPriceBreakupOpen}
            setFinalPrice={setFinalPrice} // Pass function to receive price
          />
        </div>
      </div>

      {/* BRAND PROMISE SECTION */}
      <div className="mt-20 bg-gray-50 text-black py-16 space-y-16">
        <div className="w-full flex flex-col text-center items-center space-y-4">
          <h1 className="text-[40px] lg:text-[45px] xl:text-[52px] font-primary">
            BRAND PROMISE
          </h1>
          <p className="w-3/4 xl:w-1/2 mx-auto text-xs sm:text-sm lg:text-base">
            Our shopping experience is carefully designed with you in mind.
            Stress-free from start to finish with complimentary, no-hassle
            services—and that's our promise.
          </p>
        </div>

        {/* icon&text */}
        <div className="flex flex-wrap justify-center">
          {policyIcons.map((icon, index) => (
            <div
              key={index}
              className="w-1/2 sm:w-1/4 p-4 flex flex-col items-center"
            >
              <div className="items-center flex flex-col  ">
                <div className="icon w-14 h-14 lg:w-20 lg:h-20 flex-shrink-0">
                  {icon && (
                    <img
                      src={`${icon.url}`}
                      alt={icon.alternativeText || `policy Icon ${index + 1}`}
                      className="w-full h-full object-contain "
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="w-full break-words tracking-wide text-xs lg:text-sm font-secondary font-light text-white  mt-4   text-center">
                  <p className="max-w-28 lg:max-w-32 text-black">{icon.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* related products */}
      <div className="my-20 text-center text-[#1D1D1F]">
        <h1 className="font-primary text-[27px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[46px] mb-12">
          YOU MAY <i>also</i> LIKE
        </h1>
        <RelatedProducts mainProduct={mainProduct} />
      </div>

      {/* Story */}
      <Story response={{ data: { story: productData?.data?.video } }} />

      {/* All moods section */}
      <HeartBanner productData={productData} />

      {/* Feed Section */}
      <div className="insta-items ">
        <div className="pt-10 pb-8 px-4 lg:px-16 text-[#1D1D1F]">
          <h1 className="font-primary text-[27px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[46px] 2xl:text-[54px] text-black">
            SHOP <i>the</i> FEED
          </h1>
        </div>

        <div>
          <FeedCarousel cards={FeedData?.data?.feed} />
        </div>

        <div className="text-center w-full py-6 border-b">
          <Link href="/instagram/gallery/">
            <p className="inline-flex items-center justify-center text-sm text-[#404040]">
              View Full Gallery
              <span className="text-2xl  ">
                <ChevronRight size={18} strokeWidth={1} />
              </span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
