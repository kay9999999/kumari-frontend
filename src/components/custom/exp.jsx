"use client";
import products from "@/app/data/product";
import Link from "next/link";
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
import { useState } from "react";
import ReadMoreButton from "@/components/ui/readmorebutton";
import CarouselFromStyleGuide from "@/components/ui/styleguide-carousel";
import CarouselFromProductPage from "@/components/ui/productpage-carousel";
import VideoPlayer from "@/components/custom/videoplayer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

const videoSources = {
  videoSrc: "/videos/Kumari_Story_Desktop_2.mp4",
};

const ProductPage = () => {
  const mainCarouselItems = [
    {
      id: 1,
      images: ["/images/kumari-guides/rfas0124-wh-k-r_36_1.jpg"],
    },
    {
      id: 2,
      images: ["/images/kumari-guides/rfas0121-rs-k_1_1.jpg"],
    },
    {
      id: 3,
      images: ["/images/kumari-guides/esth0090-yl-k_2_1.jpg"],
    },
    {
      id: 4,
      images: ["/images/kumari-guides/reng0013-rs-k_1_1.jpg"],
    },
  ];

  const feedItems = [
    {
      id: 1,
      images: ["/images/product/320_magenest_insta_1.jpg"],
      url: "https://www.instagram.com/p/DBv8zjRt_rm/",
    },
    {
      id: 2,
      images: ["/images/product/320_magenest_insta_2.jpg"],
      url: "http://www.instagram.com/reel/C3NvNAZxZA3/?igsh=MTdxaTF6NG0wc2F2bA",
    },
    {
      id: 3,
      images: ["/images/product/320_magenest_insta_3.jpg"],
      url: "http://www.instagram.com/reel/C3NmrMSta-P/?igsh=MXVxb2p0OTRxeWhlMw",
    },

    {
      id: 4,
      images: ["/images/product/320_magenest_insta_4.jpg"],
      url: "http://www.instagram.com/reel/C3MyW95pgWJ/?igsh=NTFlNTRja2ducnM2",
    },
    {
      id: 5,
      images: ["/images/product/320_magenest_insta_5.jpg"],
      url: "http://www.instagram.com/reel/C3LHY4ORRwJ/?igsh=Z29vOW02eXVnd3gz",
    },
    {
      id: 6,
      images: ["/images/product/320_magenest_insta_6.jpg"],
      url: "http://www.instagram.com/reel/C3LHY4ORRwJ/?igsh=Z29vOW02eXVnd3gz",
    },
    {
      id: 7,
      images: ["/images/product/320_magenest_insta_7.jpg"],
      url: "http://www.instagram.com/reel/C3LHY4ORRwJ/?igsh=Z29vOW02eXVnd3gz",
    },
    {
      id: 8,
      images: ["/images/product/320_magenest_insta_8.jpg"],
      url: "http://www.instagram.com/reel/C3LHY4ORRwJ/?igsh=Z29vOW02eXVnd3gz",
    },
    {
      id: 9,
      images: ["/images/product/320_magenest_insta_9.jpg"],
      url: "http://www.instagram.com/reel/C3LHY4ORRwJ/?igsh=Z29vOW02eXVnd3gz",
    },
    {
      id: 10,
      images: ["/images/product/320_magenest_insta_10.jpg"],
      url: "http://www.instagram.com/reel/C3LHY4ORRwJ/?igsh=Z29vOW02eXVnd3gz",
    },
    {
      id: 11,
      images: ["/images/product/320_magenest_insta_11.jpg"],
      url: "http://www.instagram.com/reel/C3LHY4ORRwJ/?igsh=Z29vOW02eXVnd3gz",
    },
  ];

  const [metalSelected, setmetalSelected] = useState("14K");
  const [metalColorselected, setmetalColorSelected] = useState("Yellow");
  const [DiamondQualitySelected, setDiamondQualitySelected] = useState("SI");
  const [ringSizeSelected, setRingSizeSelected] = useState("R12");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailsDropdownOpen, setDetailsDropdownOpen] = useState(false);
  const [priceBreakupOpen, setPriceBreakupOpen] = useState(false);
  const [makingCharges, setMakingCharges] = useState(7952);

  const priceBreakupDropdown = () => {
    setPriceBreakupOpen(!priceBreakupOpen);
  };

  const handleRingSizeSelect = (size) => {
    setRingSizeSelected(size);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const moreDetailsDropdown = () => {
    setDetailsDropdownOpen(!detailsDropdownOpen);
  };

  const handlemetalSelect = (value) => {
    setmetalSelected(value);
    if (value === "14K") {
      setMakingCharges(7952);
    } else if (value === "18K") {
      setMakingCharges(10038);
    }
  };

  const handlemetalColorSelect = (value) => {
    setmetalColorSelected(value);
  };

  const handleDiamondQualitySelect = (value) => {
    setDiamondQualitySelected(value);
  };

  return (
    <section className="text-gray-600 overflow-hidden">
      {/* PRODUCTS INFORMATIONS */}
      <div className="flex flex-col lg:flex-row ">
        {/* Product Images and video section */}
        <div className="lg:w-3/5 p-4 lg:p-8 ">
          {/* Carousel for mobile screens */}
          <div className="block lg:hidden">
            <Swiper
              spaceBetween={10}
              navigation
              loop={true}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
              }}
            >
              {products.map((product) =>
                product.images.map((image, index) => (
                  <SwiperSlide key={`${product.id}-${index}`}>
                    <div className="bg-gray-50 overflow-hidden">
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full h-auto"
                      />
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>

          {/*for larger screens */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
            {products.map((product) =>
              product.images.map((image, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="bg-gray-50 overflow-hidden"
                >
                  <img
                    src={image}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>
              ))
            )}
          </div>

          {/* Video  */}
          <div className="mt-4 float-left">
            <iframe
              src="https://player.vimeo.com/video/881616917?api=1&player_id=vimeo8816169171737590485649&autoplay=1&controls=0"
              width="100%"
              height="300"
              frameBorder="0"
              allow="fullscreen; autoplay"
              allowFullScreen
              title="Vimeo Video"
            ></iframe>
          </div>
        </div>

        {/* Product Description */}
        <div className="lg:w-2/5 p-4">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-4 text-black">
              Royal Rebel Seal Statement Ring
            </h2>
            <h2 className="uppercase mb-2 text-gray-900">Royal Rebel</h2>
            <p className="text-gray-500 mb-4">
              Stamp your style authority with our Royal Rebel Seal Ring. It's
              like your personal fashion declaration. Seal it with a statement,
              chic empress!
            </p>

            <Link
              href="/"
              className="hover:underline text-gray-900 font-semibold"
            >
              <span>Write a review ↓ </span>
            </Link>
            <div className="flex flex-row items-center mt-5">
              <p className="mr-4 text-gray-950 font-semibold">Certifications</p>
              <picture className="flex space-x-6">
                <img
                  src="/images/product/certificate-logoHolm.png"
                  alt="BIS logo"
                  className="object-cover w-15 h-9"
                />
                <img
                  src="/images/product/certificate-logoSGL.png"
                  alt="SGL logo"
                  className="object-cover w-15 h-9"
                />
              </picture>
            </div>
          </div>

          {/* Metal */}
          <div className="product-options">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900 mr-2">Metal</span>
              <Info className="w-4 h-4" />
              <Link
                href="/"
                className="hover:underline text-gray-900 font-semibold"
              >
                <span>Metal Guide</span>
              </Link>
            </div>

            <div className="flex text-center mt-1 space-x-3">
              <div
                className={`w-1/2 border rounded p-4 cursor-pointer ${
                  metalSelected === "14K"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handlemetalSelect("14K")}
              >
                <span>14K GOLD</span>
                <p className="text-xs">Made to order</p>
              </div>
              <div
                className={`w-1/2 border rounded p-4 cursor-pointer ${
                  metalSelected === "18K"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handlemetalSelect("18K")}
              >
                <span>18K GOLD</span>
                <p className="text-xs">Made to order</p>
              </div>
            </div>
          </div>

          {/* Metal Color */}
          <div className="product-options mt-4">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900 mr-1">
                Metal Color
              </span>
              <span>{metalColorselected === "Rose" ? "Rose" : "Yellow"}</span>
              <Info className="w-4 h-4" />
              <Link
                href="/"
                className="hover:underline text-gray-900 font-semibold"
              >
                <span>Metal Color Guide</span>
              </Link>
            </div>

            <div className="flex text-center mt-1 space-x-3">
              <div
                className={`w-1/2 border rounded p-2 cursor-pointer ${
                  metalColorselected === "Rose"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handlemetalColorSelect("Rose")}
              >
                <picture>
                  <img
                    src="/images/product/rs.png"
                    alt="Rose"
                    className="mx-auto"
                  />
                </picture>
                <span className="block text-center">Rose</span>
                <p className="text-xs text-center">Made to order</p>
              </div>
              <div
                className={`w-1/2 border rounded p-2 cursor-pointer ${
                  metalColorselected === "Yellow"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handlemetalColorSelect("Yellow")}
              >
                <picture>
                  <img
                    src="/images/product/yl.png"
                    alt="Yellow"
                    className="mx-auto"
                  />
                </picture>
                <span className="block text-center">Yellow</span>
                <p className="text-xs text-center">Made to order</p>
              </div>
            </div>
          </div>

          {/* Diamond Quality */}
          <div className="product-options mt-4">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900 mr-2">
                Diamond Quality
              </span>
              <Info className="w-4 h-4" />
              <Link
                href="/"
                className="hover:underline text-gray-900 font-semibold"
              >
                <span>Diamond Guide</span>
              </Link>
            </div>

            <div className="flex text-center mt-1 space-x-3">
              <div
                className={`w-1/2 border rounded p-4 cursor-pointer                ${
                  DiamondQualitySelected === "SI"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleDiamondQualitySelect("SI")}
              >
                <span>SI/IJ</span>
                <p className="text-xs">Made to order</p>
              </div>
              <div
                className={`w-1/2 border rounded p-4 cursor-pointer ${
                  DiamondQualitySelected === "VS"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleDiamondQualitySelect("VS")}
              >
                <span>VS/GH</span>
                <p className="text-xs">Made to order</p>
              </div>
              <div
                className={`w-1/2 border rounded p-4 cursor-pointer ${
                  DiamondQualitySelected === "VVS"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={() => handleDiamondQualitySelect("VVS")}
              >
                <span>VVS/EF</span>
                <p className="text-xs">Made to order</p>
              </div>
            </div>
          </div>

          {/* Size/Rings Size Guide */}
          <div className="product-options mt-4">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-900 mr-2">Size</span>
              <Info className="w-4 h-4" />
              <Link
                href="/"
                className="hover:underline text-gray-900 font-semibold"
              >
                <span>Rings Size Guide</span>
              </Link>
            </div>

            {/* Toggle Dropdown for ring sizes */}
            <div className="relative mt-1">
              <div
                className={`flex justify-between items-center w-full text-center border rounded p-4 cursor-pointer ${
                  ringSizeSelected === "R12"
                    ? "border-2 border-black"
                    : "border-gray-300"
                }`}
                onClick={toggleDropdown}
              >
                <div className="flex flex-col text-center mx-auto">
                  <span>{ringSizeSelected}</span>
                  <p className="text-xs">Made to order</p>
                </div>
                {dropdownOpen ? (
                  <ChevronUp className="ml-2" />
                ) : (
                  <ChevronDown className="ml-2" />
                )}
              </div>

              {/* Dropdown for other sizes */}
              {dropdownOpen && (
                <div className="relative flex flex-wrap justify-around z-10 w-full bg-white mt-1">
                  {[
                    "R5",
                    "R6",
                    "R7",
                    "R8",
                    "R9",
                    "R10",
                    "R11",
                    "R12",
                    "R13",
                    "R14",
                    "R15",
                    "R16",
                    "R17",
                    "R18",
                    "R19",
                    "R20",
                    "R21",
                    "R22",
                    "R23",
                    "R24",
                    "R25",
                  ].map((size) => (
                    <div
                      key={size}
                      className={`p-2 m-1 border text-center cursor-pointer rounded hover:border-gray-600 ${
                        size === "R25" ? "w-full" : "w-[23%]"
                      }`}
                      onClick={() => handleRingSizeSelect(size)} // Select size from dropdown
                    >
                      <span>{size}</span>
                      <p className="text-xs">Made to order</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount & Postcode Section */}
          <div className="mt-6 product-price ">
            <div className="flex justify-between items-center text-gray-900">
              <span className="text-2xl font-semibold">₹48,452.68</span>

              <div className="flex items-center gap-1">
                <LogOut className="w-4 h-4" />
                <Link
                  href="/"
                  className="hover:underline text-gray-900 font-semibold"
                >
                  <span className="font-semibold text-sm mr-1">
                    Signup for Price Alert
                  </span>
                </Link>
              </div>
            </div>

            <p className="text-sm mt-3 font-semibold text-gray-500">
              Eligible for a Cash on Delivery, You can choose it during
              checkout.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center font-semibold space-x-2">
              <Package className="w-5 h-5" />
              <span>Order Today : </span>
            </div>
            <div>
              <p className="text-xs mt-2">Delivery not available</p>
              <Link
                href="/"
                className="hover:underline text-gray-900 font-semibold"
              >
                <span className="text-sm flex items-center mt-1 gap-1">
                  Enter your postcode for exact delivery timelines
                  <MoveUpRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* Add to cart */}
          <div className="w-full flex items-center mt-4">
            <div className="w-[70%]">
              <ReadMoreButton
                link="/"
                label="Add to Bag"
                className="w-full capitalize rounded"
              />
            </div>
            <div className="w-[30%] flex justify-around">
              <Heart className="w-5 h-5" />
              <Share2 className="w-5 h-5" />
            </div>
          </div>

          {/* Drop a hint */}
          <div className="flex justify-center p-4 mt-6 ">
            <Link href="/" className="flex items-center text-gray-900">
              <MailQuestion className="w-5 h-5 mr-2 stroke-slate-600" />
              <span className="font-semibold">Drop a hint</span>
            </Link>
          </div>

          {/* More Details Section */}
          <div className="relative mt-1">
            <div
              className="flex justify-between w-full border rounded p-4 cursor-pointer"
              onClick={moreDetailsDropdown}
            >
              <div className="flex flex-col">
                <span className="font-semibold">More Details</span>
              </div>
              {detailsDropdownOpen ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              )}
            </div>

            {detailsDropdownOpen && (
              <div className="relative flex flex-wrap border z-10 w-full ">
                <div className="flex flex-wrap items-center text-center p-4">
                  <div className="p-8 w-1/2 flex flex-col items-center space-y-1 border-b border-r">
                    <Weight />
                    <h1 className="font-medium">Total Weight</h1>
                    <Link href="/" className="flex items-center space-x-2">
                      <p className="font-semibold underline">7.06 gram</p>
                      <div className="relative inline-block group">
                        <Info className="w-4 h-4 cursor-pointer" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 -mt-28 w-36 bg-gray-700 text-white text-xs rounded-xl p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Weight can vary in the final product. A refund will be
                          initiated if it is lesser than the weight mentioned.
                        </span>
                      </div>
                    </Link>
                    <p className="text-sm font-semibold text-gray-400">
                      Approx. Gross Weight
                    </p>
                  </div>

                  <div className="p-8 w-1/2 flex flex-col items-center space-y-1 border-b border-r">
                    <Sparkle />
                    <h1 className="font-medium">14K Yellow Gold</h1>
                    <p className="font-semibold underline">6.08 gram</p>
                    <p className="text-sm font-semibold text-gray-400">
                      Approx. Metal Weight
                    </p>
                  </div>

                  <div className="p-8 w-1/2 flex flex-col items-center space-y-1 border-b border-r">
                    <Gem />
                    <h1 className="font-medium">Diamonds</h1>
                    <p className="font-semibold underline">0.2 Ct</p>
                    <p className="text-sm font-semibold text-gray-400">
                      Approx. Diamond Weight
                    </p>
                  </div>

                  <div className="p-8 w-1/2 flex flex-col items-center space-y-1 border-b">
                    <Gem />
                    <h1 className="font-medium">Gemstones</h1>
                    <p className="font-semibold underline">1.37 Ct</p>
                    <p className="text-sm font-semibold text-gray-400 text-nowrap">
                      Approx. Gemstones Weight
                    </p>
                  </div>

                  <div className="p-5 w-full flex flex-col items-center space-y-1">
                    <Weight />
                    <h1 className="font-medium">Components</h1>
                    <p className="font-semibold underline">0.67 gram</p>
                    <p className="text-sm font-semibold text-gray-400 text-nowrap">
                      Approx. Components Weight
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakup */}
          <div className="relative mt-6">
            <div
              className="flex justify-between w-full border rounded p-4 cursor-pointer"
              onClick={priceBreakupDropdown}
            >
              <div className="flex flex-col">
                <span className="font-semibold">Price Breakup</span>
              </div>
              {priceBreakupOpen ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              )}
            </div>

            {priceBreakupOpen && (
              <div className="relative flex flex-wrap text-sm px-2 z-10 space-y-3 border">
                {/* Metal Details Display  */}
                <div className="w-full flex justify-between">
                  <div>{metalSelected}</div>
                  <div>
                    <span>₹43,826.63</span>
                  </div>
                </div>

                {/* Diamonds Details Display */}
                <div className="w-full flex justify-between">
                  <div>Natural Diamonds (0.2ct)</div>
                  <div>
                    <span>₹18,000</span>
                  </div>
                </div>

                {/* Gemstone Details Display */}
                <div className="w-full space-y-2">
                  <div>Gemstone (1.37ct)</div>

                  <div className="w-full flex justify-between">
                    <div className="ml-4">Sapphire</div>
                    <div>
                      <span>₹959.00</span>
                    </div>
                  </div>
                </div>

                {/* Making Charges Display */}
                <div className="w-full flex justify-between">
                  <div>Making Charge</div>
                  <div>
                    <span>₹{makingCharges}</span>
                  </div>
                </div>

                {/* Other Costs Display */}
                <div className="w-full space-y-2">
                  <div>Findings & Other Components </div>

                  <div className="w-full flex justify-between">
                    <div className="ml-4">Ceramic</div>
                    <div>
                      <span>₹6700</span>
                    </div>
                  </div>
                </div>

                {/* Subtotal Display */}
                <div className="w-full flex justify-between">
                  <div>SubTotal</div>
                  <div>
                    <span>₹79,523.62</span>
                  </div>
                </div>

                {/* Tax Display */}
                <div className="w-full flex justify-between">
                  <div>Tax (3%)</div>
                  <div>
                    <span>₹2,385.71</span>
                  </div>
                </div>

                {/* Total Amount Display */}
                <div className="w-full font-semibold flex justify-between">
                  <div>Total</div>
                  <div>
                    <span>₹81,909.33</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BRAND PROMISE SECTION */}
      <div className="mt-20 bg-gray-100 text-black py-24 space-y-20">
        <div className="w-full flex flex-col text-center items-center space-y-10">
          <h1 className="text-6xl">BRAND PROMISE</h1>
          <p className="w-3/4 md:w-1/2 mx-auto">
            Our shopping experience is carefully designed with you in mind.
            Stress-free from start to finish with complimentary, no-hassle
            services—and that's our promise.
          </p>
        </div>

        <div className="flex text-center pb-10 mx-auto">
          <div className="flex flex-col items-center w-1/4 space-y-4">
            <Truck
              className="w-14 h-14 text-pink-600"
              style={{ strokeWidth: 1 }}
            />
            <h1 className="uppercase text-sm">
              Free shipping
              <br />
              within India
            </h1>
          </div>

          <div className="flex flex-col items-center w-1/4 space-y-4">
            <RefreshCcw
              className="w-14 h-14 text-pink-600"
              style={{ strokeWidth: 1 }}
            />
            <h1 className="uppercase text-sm">
              Free 15-day
              <br />
              returns
            </h1>
          </div>

          <div className="flex flex-col items-center w-1/4 space-y-4">
            <NotepadText
              className="w-14 h-14 text-pink-600"
              style={{ strokeWidth: 1 }}
            />
            <h1 className="uppercase text-sm">
              One-year Jewellery
              <br />
              Insurance
            </h1>
          </div>

          <div className="flex flex-col items-center w-1/4 space-y-4">
            <ShieldCheck
              className="w-14 h-14 text-pink-600"
              style={{ strokeWidth: 1 }}
            />
            <h1 className="uppercase text-sm">
              Lifetime exchange
              <br />
              and buy-backs
            </h1>
          </div>
        </div>
      </div>

      <div className="my-20 text-center text-black">
        <h1 className="text-5xl mb-6">YOU MAY ALSO LIKE</h1>
        <CarouselFromStyleGuide cards={mainCarouselItems} slidesPerView={3} />
      </div>

      {/* PRODUCT Carousel Section */}
      <div className="flex items-center flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <VideoPlayer src={videoSources.videoSrc} />
        </div>

        <div className="w-full md:w-1/2 text-center p-10">
          <div className="mt-8">
            <h1 className="text-5xl font-thin">
              <i>T</i>he
              <br />
              KUMARI
              <br />
              STORY
            </h1>
            <p className="w-3/4 mx-auto font-condensed text-md my-10">
              Kumari is created for the heart. Remarkable designs and high
              aesthetics drive us to create Wearable Wonders that let you live
              every day looking just that extra stylish. Know more about vision
            </p>
            <ReadMoreButton
              link="/about-us"
              label="about us"
              className="px-20"
            />
          </div>
        </div>
      </div>

      {/* ALL COLLECTION SECTION */}
      <div className="flex px-8 items-center flex-col md:flex-row mt-20">
        <div className="w-full md:w-2/5">
          <div className="mt-8 space-y-10">
            <h1 className="text-5xl font-thin text-black">
              ALL MOODS <i>of</i>
              <br /> KUMARI
            </h1>
            <ReadMoreButton
              link="/our-collections"
              label="shop all collections"
              className="px-2 py-3 text-sm"
            />
          </div>
        </div>

        <div className="w-full md:w-3/5">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="/images/product/Kumari_All_collection_banner_Desktop_1.jpg"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/product/Kumari_All_collection_banner_Tablet.jpg"
            />
            <img
              src="/images/product/Kumari_All_collection_banner_Mobile_1.jpg"
              alt="All Collections"
              className="object-cover w-full h-auto md:h-96"
            />
          </picture>
        </div>
      </div>

      <div className="insta-items mt-8">
        <div className="p-12">
          <h1 className="text-5xl font-thin text-black">
            SHOP <i>the</i> FEED
          </h1>
        </div>

        <div>
          <CarouselFromProductPage cards={feedItems} slidesPerView={6} />
        </div>

        <div className="text-center w-full py-6 border-b">
          <Link href="/instagram/gallery/">
            <p className="inline-flex items-center justify-center">
              View Full Gallery
              <span className="text-2xl ml-1 mb-1">&gt;</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
