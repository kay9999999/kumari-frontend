"use client";
import Link from "next/link";
import { useState } from "react";
import CouponPopup from "@/components/ui/couponpopup";
import { BiSolidOffer } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
import CheckoutBreadcrumb from "@/components/ui/checkoutBreadcrumb";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { PiGreaterThan } from "react-icons/pi";

const RightDiv = () => {
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [showTaxDetails, setShowTaxDetails] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // state for couponpop

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const toggleShippingDetails = () =>
    setShowShippingDetails(!showShippingDetails);
  const toggleTaxDetails = () => setShowTaxDetails(!showTaxDetails);
  const toggleOrderSummary = () => setShowOrderSummary(!showOrderSummary);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Royal Rebel Seal Statement Ring",
      image:
        "https://media.kumari.co/media/catalog/product/cache/163aeb3e622214d723a1a27f886c88da/r/f/rfas0070-yl-k.jpg",
      price: 49778,
      qty: 1,
      metal: "14k Gold",
      metalColor: "Yellow",
      quality: "SI / IJ",
      size: "R12",
    },
  ]);

  return (
    <>
      {/* Right Div */}

      <div className="max-[1023px]:hidden order-1 lg:order-2 w-full lg:w-[45%] pr-0 lg:pr-4 lg:fixed lg:top-0 lg:right-0 lg:h-screen lg:overflow-y-auto outline outline-1 outline-gray-200 flex flex-col">
        {/* Product Info */}
        {cartItems.map((item) => (
          <div key={item.id} className="p-4 w-full bg-[#fafafa]">
            <h2 className="text-xl text-black my-2">Ships in 1-3 weeks </h2>
            <div className="flex gap-4 border p-3 bg-white rounded">
              <div className="w-full md:w-[160px] min-h-px border">
                <picture>
                  <img
                    className="object-cover w-full h-auto"
                    src={item.image}
                    alt={item.name}
                  />
                </picture>
              </div>
              <div className="w-full text-[#404040]">
                <strong className="text-lg text-[#4D4D4D]">{item.name}</strong>
                <div>
                  <span className="text-sm font-semibold">Metal:</span>{" "}
                  {item.metal || "14k Gold"}
                </div>
                <div>
                  <span className="text-sm font-semibold">Metal Color:</span>{" "}
                  {item.metalColor || "Yellow"}
                </div>
                <div>
                  <span className="text-sm font-semibold">Quality:</span>{" "}
                  {item.quality || "SI / IJ"}
                </div>
                <div>
                  <span className="text-sm font-semibold">Size:</span>{" "}
                  {item.size || "R12"}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Coupon Section */}
        <div className="p-4 w-full bg-[#fafafa]">
              <div className="flex justify-between items-center bg-white mt-2 border p-3 cursor-pointer"
                onClick={togglePopup}>
                <div className="flex items-center gap-1 z-30">
                  <BiSolidOffer className="h-6 w-6" />
                  Have Coupon Code?{" "}
                  <b>
                    <CouponPopup isOpen={isOpen} togglePopup={togglePopup} />
                  </b>
                </div>
                <button>
                  <PiGreaterThan />
                </button>
              </div>
          </div>

        {/* Total Amount */}
        <div className="p-4 w-full bg-[#fafafa]">
          <div className="p-3 bg-white border">
            <div className="flex justify-between items-center">
              <div>Subtotal</div>
              <div>
                <span>
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.price * (item.qty || 1),
                    0
                  )}
                </span>
              </div>
            </div>
            <div
              className="flex justify-between items-center mt-2"
              onClick={toggleShippingDetails}
            >
              <div className="flex flex-col">
                <div className="flex items-center">Shipping</div>
                {showShippingDetails && (
                  <div className="text-gray-600 text-sm mt-1">
                    (Standard - Shipping)
                  </div>
                )}
              </div>
              <span>₹0</span>
            </div>

            <div
              className="flex justify-between items-center mt-2"
              onClick={toggleTaxDetails}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  Estimated Tax{" "}
                  {showTaxDetails ? (
                    <FaChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </div>
              <span>₹1,449.85</span>
            </div>
            {showTaxDetails && (
              <div className="flex justify-between items-center">
                <div className="text-gray-600 text-sm mt-1">IGST (3%)</div>
                <span className="text-[#808080]">₹1,449.85</span>
              </div>
            )}

            <div className="flex justify-between items-center border-t mt-4">
              <h1 className="text-2xl font-bold">Total</h1>
              <span className="text-2xl font-bold text-[#1A1A1A]">
                ₹
                {cartItems.reduce(
                  (total, item) => total + item.price * (item.qty || 1),
                  0
                ) + 1449.85}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Links Right */}
        <div className="hidden lg:flex lg:flex-row items-center justify-around p-6">
          <Link href="/cancellation-refund" className="flex items-center">
            <span>Return Policy</span>
            <GoArrowUpRight />
          </Link>
          <Link href="/privacy-policy" className="flex items-center ml-4">
            <span>Privacy Policy</span>
            <GoArrowUpRight />
          </Link>
          <Link href="/terms-conditions" className="flex items-center ml-4">
            <span>Term of services</span>
            <GoArrowUpRight />
          </Link>
        </div>
      </div>

      {/* Order Summary Dropmenu for Small Screens */}
      <div className="order-1 lg:hidden flex items-center justify-center w-full bg-white z-20 py-4">
        <img
          className="object-contain"
          src="/images/logo/Kumari-logo2x.png"
          width={140}
          height={43}
          alt="Kumari Logo"
        />
      </div>
      <div className="order-1 lg:hidden p-4 border rounded bg-[#fafafa] mt-6">
        <div
          className="flex justify-between items-center cursor-pointer w-full"
          onClick={toggleOrderSummary}
        >
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Order Summary</h2>
            <span className="ml-2 text-2xl">
              {showOrderSummary ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
          <span className="text-xl font-bold text-[#1A1A1A]">
            ₹
            {cartItems.reduce(
              (total, item) => total + item.price * (item.qty || 1),
              0
            ) + 1449.85}
          </span>
        </div>

        {showOrderSummary && (
          <div className="mt-4 space-y-4">
            {/* Product Info */}
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded">
                <h2 className="text-lg text-black my-2">Ships in 1-3 weeks</h2>
                <div className="flex gap-4 border p-3 rounded">
                  <div className="w-full md:w-[120px] min-h-px border">
                    <picture>
                      <img
                        className="object-cover w-full h-auto"
                        src={item.image}
                        alt={item.name}
                      />
                    </picture>
                  </div>
                  <div className="w-full text-[#404040]">
                    <strong className="text-base text-[#4D4D4D]">
                      {item.name}
                    </strong>
                    <div>
                      <span className="text-sm font-semibold">Metal:</span>{" "}
                      {item.metal}
                    </div>
                    <div>
                      <span className="text-sm font-semibold">
                        Metal Color:
                      </span>{" "}
                      {item.metalColor}
                    </div>
                    <div>
                      <span className="text-sm font-semibold">Quality:</span>{" "}
                      {item.quality}
                    </div>
                    <div>
                      <span className="text-sm font-semibold">Size:</span>{" "}
                      {item.size}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="bg-white p-3 rounded">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 z-30">
                  <BiSolidOffer className="h-6 w-6" />
                  Have Coupon Code?{" "}
                  <b>
                    <CouponPopup />
                  </b>
                </div>
                <span>
                  <PiGreaterThan />
                </span>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-white p-3 rounded border">
              <div className="flex justify-between items-center">
                <div>Subtotal</div>
                <div>
                  <span>
                    ₹
                    {cartItems.reduce(
                      (total, item) => total + item.price * (item.qty || 1),
                      0
                    )}
                  </span>
                </div>
              </div>
              <div
                className="flex justify-between items-center mt-2"
                onClick={toggleShippingDetails}
              >
                <div className="flex flex-col">
                  <div className="flex items-center">Shipping</div>
                  {showShippingDetails && (
                    <div className="text-gray-600 text-sm mt-1">
                      (Standard - Shipping)
                    </div>
                  )}
                </div>
                <span>₹0</span>
              </div>

              <div
                className="flex justify-between items-center mt-2"
                onClick={toggleTaxDetails}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    Estimated Tax{" "}
                    {showTaxDetails ? (
                      <FaChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </div>
                <span>₹1,449.85</span>
              </div>
              {showTaxDetails && (
                <div className="flex justify-between items-center">
                  <div className="text-gray-600 text-sm mt-1">IGST (3%)</div>
                  <span className="text-[#808080]">₹1,449.85</span>
                </div>
              )}

              <div className="flex justify-between items-center border-t mt-4">
                <h1 className="text-xl font-bold">Total</h1>
                <span className="text-xl font-bold text-[#1A1A1A]">
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.price * (item.qty || 1),
                    0
                  ) + 1449.85}
                </span>
              </div>
            </div>

            {/* Footer Links */}
            <div className="hidden">
              <Link
                href="/cancellation-refund"
                className="flex items-center gap-1"
              >
                <span>Return Policy</span>
                <GoArrowUpRight />
              </Link>
              <Link href="/privacy-policy" className="flex items-center gap-1">
                <span>Privacy Policy</span>
                <GoArrowUpRight />
              </Link>
              <Link
                href="/terms-conditions"
                className="flex items-center gap-1"
              >
                <span>Term of services</span>
                <GoArrowUpRight />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Breadcrumb for small screens*/}
      <div className="order-2 lg:order-1 w-full lg:hidden flex justify-center py-4 bg-white">
        <CheckoutBreadcrumb />
      </div>
    </>
  );
};

export default RightDiv;
