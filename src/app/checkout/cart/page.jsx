"use client";

import Link from "next/link";
import { React, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiOutlineGiftTop } from "react-icons/hi2";
import GiftMessage from "@/components/ui/GiftMessage";
import CouponPopUp from "@/components/ui/CouponPopUp";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdLock, IoIosClose } from "react-icons/io";
import { MdIosShare } from "react-icons/md";
import SharingBag from "@/components/ui/SharingBag";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/redux/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);

  const [isSpecVisible, setIsSpecVisible] = useState(false);
  const [isDeliveryOption, setDeliveryOption] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSharingBagOpen, setIsSharingBagOpen] = useState(false);

  const toggleSharingBag = () => {
    setIsSharingBagOpen(!isSharingBagOpen);
  };
  const toggleSpecifications = () => {
    setIsSpecVisible(!isSpecVisible);
  };
  const toggleDeliveryOption = () => {
    setDeliveryOption(!isDeliveryOption);
  };

  const handleApply = () => {
    // console
    console.log("Applied Zip Code:", zipCode);
  };

  const toggleShippingDetails = () => {
    setShowShippingDetails(!showShippingDetails);
  };

  const handleMoveToWishlist = () => {
    // Handle move
    console.log("Moved to Wishlist");
    setIsPopupVisible(false);
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item.sku));
    setIsPopupVisible(false);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <section>
      <div className="cart-container w-full max-w-[1040px] lg:max-w-7xl px-5 mx-auto">
        <div className="bag mt-[76px] lg:mt-[84px] xl:mt-[92px]">
          <div className="flex flex-col items-center py-20 px-5 text-center">
            <h1 className="mb-2 text-[24px] md:text-[36px] text-[#1A1A1A] font-semibold">
              Review your bag.
            </h1>
            <div className=" leading-relaxed font-semibold text-[14px] md:text-[15px] text-[#404040]">
              Get free shipping and free returns on all orders.
            </div>
          </div>
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.sku}>
              {/* Cart Page items & Details */}
              <div className="test flex flex-col md:flex-row mx-auto justify-center py-6 lg:w-3/4 border-t border-b relative">
                {/* Image Section */}
                <div className="flex justify-center w-full md:w-[200px] min-h-px">
                  <span className="block relative w-1/2 md:w-full pb-[60%]">
                    <picture>
                      <img
                        className="absolute inset-0 object-cover"
                        src={`${item?.image}`}
                        alt={item?.title || "Product Image"}
                        loading="lazy"
                      />
                    </picture>
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 ml-0 md:ml-8 w-full">
                  {/* Primary Info */}
                  <div className="flex max-md:flex-col">
                    <div className="flex-1 pr-4 w-full">
                      <strong className="text-[#4D4D4D] text-[18px] md:text-xl">
                        <Link href="#">{item.title}</Link>
                      </strong>
                    </div>

                    {/* Quantity and Price */}
                    <div className="py-2 md:py-0 flex justify-between min-w-[180px] gap-6">
                      <div className="flex justify-center w-18">
                        <select
                          id="cart-qty"
                          name="cart-qty"
                          className="w-full h-10 px-3 border border-gray-300 rounded"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1 text-right">
                        <span className="text-[#1A1A1A] text-[18px] md:text-xl font-semibold">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="mt-4 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href="#"
                          className="flex items-center gap-1 text-base  cursor-pointer"
                          onClick={toggleSpecifications}
                        >
                          Specifications
                          {isSpecVisible ? <FaChevronUp /> : <FaChevronDown />}
                        </Link>
                      </div>
                    </div>

                    {/* Fixed height for the specifications section */}
                    <div
                      className={`spec-info mt-4 transition-all duration-500 ${
                        isSpecVisible ? "max-h-40" : "max-h-0 overflow-hidden"
                      }`}
                    >
                      <div className="space-y-2 text-[#404040] text-sm">
                        <div>
                          <span className="font-medium">SKU:</span>
                          {item.sku}
                        </div>
                        <div>
                          <span className="font-medium">Metal:</span>
                          {item.metal}
                        </div>
                        <div>
                          <span className="font-medium">Metal Color:</span>
                          {item.metalColor}
                        </div>
                        <div>
                          <span className="font-medium">Diamond Quality:</span>{" "}
                          {item.diamondQuality}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {item.size}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="remove absolute top-0 right-0">
                      <Link
                        href="#"
                        className="flex items-center gap-1 text-base cursor-pointer"
                        onClick={togglePopup}
                      >
                        <RiDeleteBin6Line />
                        <span>Remove</span>
                      </Link>
                    </div>
                  </div>

                  {/* Delivery Section */}
                  <div className="mt-6 pt-6 border-t border-gray-300 w-full relative">
                    <div className="flex flex-row items-center">
                      <div className="text-3xl mr-2 h-full text-center absolute">
                        <LiaTruckMovingSolid className="text-gray-600 h-6 w-6 mt-3" />
                      </div>
                      <div className="flex-1 ml-8 text-[#404040] text-sm">
                        <div className="font-semibold">Delivery:</div>
                        <div className="mt-1">Ships in 1-3 weeks</div>
                        <div className="mt-1">
                          <div className="flex items-center">
                            <Link
                              href="#"
                              className="flex items-center gap-1"
                              onClick={toggleDeliveryOption}
                            >
                              Delivery option for :
                              <span className="text-black">
                                {zipCode || ""}
                              </span>
                              {isDeliveryOption ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </Link>
                          </div>
                          {isDeliveryOption && (
                            <div className="mb-6 relative w-full md:w-1/2">
                              <form>
                                <input
                                  type="text"
                                  id="ZipCode"
                                  name="ZipCode"
                                  value={zipCode}
                                  onChange={(e) => setZipCode(e.target.value)}
                                  placeholder=""
                                  style={{ paddingTop: "20px" }}
                                  className="block w-full p-4 border mt-2 rounded-lg  focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300 placeholder-transparent pr-16"
                                />
                                <label
                                  htmlFor="ZipCode"
                                  className="absolute left-4 top-[1px] text-gray-400 text-sm"
                                >
                                  Zip Code
                                </label>
                                <button
                                  type="button"
                                  onClick={handleApply}
                                  className="text-[#1A1A1A] absolute right-0 top-2 rounded-lg px-4 py-2 hover:underline cursor-pointer"
                                >
                                  Apply
                                </button>
                              </form>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popup Overlay */}
              {isPopupVisible && (
                <div className="popup-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                  <div className="popup-content bg-white p-6 border rounded-lg w-11/12 md:w-1/2 lg:w-1/2 flex flex-col md:flex-row items-center relative">
                    {/* Close Button */}
                    <button
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                      onClick={togglePopup}
                    >
                      <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
                    </button>

                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                      <img
                        src={`${item?.image}`}
                        alt={item?.title || "Product Image"}
                        className="w-full h-auto rounded"
                      />
                    </div>

                    {/* Right Side: Heading and Buttons */}
                    <div className="w-full md:w-3/5 md:ml-4">
                      <h2 className="text-xl font-semibold mb-1">
                        Remove item from shopping bag?
                      </h2>
                      <p className=" mb-4">
                        Tip : Add it to your wishlist to purchase it later!
                      </p>
                      <div className="flex flex-col justify-center  space-y-2">
                        <button
                          className="bg-black text-white px-4 py-2 rounded hover:opacity-85 transition duration-200 capitalize"
                          onClick={handleMoveToWishlist}
                        >
                          Move to Wishlist
                        </button>
                        <button
                          className=" px-4 py-2 rounded hover:underline "
                          onClick={() => handleRemoveItem(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center py-10">Your cart is empty.</p>
        )}
        {/* Gift message */}
        <div className="flex flex-row mx-auto items-center space-x-2 py-6 lg:w-3/4 border-b">
          <HiOutlineGiftTop className="h-6 w-6 rounded-xl text-gray-800" />
          <h1 className="font-semibold text-[#404040]">
            Gift message or gift wrap
          </h1>
          <span className="border-l pl-2 ml-2">
            <GiftMessage />
          </span>
        </div>

        <div className="flex flex-row mx-auto lg:w-3/4 py-6">
          <div className="w-1/4 min-h-px hidden md:block">&nbsp;</div>

          <div className="lg:w-3/4 w-full flex flex-col text-[#404040] text-sm md:text-base">
            {/* Subtotal */}
            <div className=" flex justify-between items-center">
              <div>Subtotal</div>
              <div>
                <span>₹48,328.26</span>
              </div>
            </div>

            {/* CouponCode */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-1">
                <BiSolidOffer className="h-6 w-6" />
                Have Coupon Code ?{" "}
                <b>
                  <CouponPopUp />
                </b>
              </div>
              <span>couponamount</span>
            </div>

            {/* Shipping */}
            <div
              className="flex justify-between items-center mt-2"
              onClick={toggleShippingDetails}
            >
              <div className="flex items-center gap-1">
                Shipping
                {showShippingDetails && (
                  <div className=" text-gray-600">(Standard - Shipping)</div>
                )}
              </div>
              <span>₹0</span>
            </div>

            {/* Estimated Tax */}
            <div className="flex justify-between items-center mt-2 border-b pb-6">
              <div>Estimated Tax</div>
              <span>₹1,449.85</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-4 text-[#1A1A1A] text-[18px] md:text-2xl">
              <h1 className=" font-semibold">Total</h1>
              <span className="font-semibold">₹49,828.26</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end lg:w-3/4 mx-auto">
          <p className="text-gray-600 text-sm">
            Your shopping bag is eligible for a Cash on Delivery. You can choose
            it during checkout.
          </p>
        </div>

        <div className="flex justify-center md:justify-end lg:w-3/4 mx-auto">
          <ul className="p-4 w-[440px]">
            <li className="mt-4">
              <button
                type="button"
                className="flex items-center justify-center w-full px-4 py-4 bg-black text-white rounded hover:opacity-85 transition duration-200 capitalize gap-1"
              >
                <IoMdLock className="w-5 h-5" />
                <span className="text-lg text-center">Proceed to Checkout</span>
              </button>
            </li>

            <li className="mt-4">
              <button
                type="button"
                onClick={toggleSharingBag}
                className="flex justify-center items-center gap-1 w-full max-w-[440px] px-4 py-2 transition duration-200"
              >
                <MdIosShare className="w-5 h-5" />
                <span className="text-center">Share Your Bag</span>
              </button>
            </li>
          </ul>

          {/* Sharingform component */}
          {isSharingBagOpen && <SharingBag onClose={toggleSharingBag} />}
        </div>

        {/* help section  */}
        <div className="border-t my-6">
          <div className="flex flex-col mx-auto space-y-4 my-14 lg:w-3/4">
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold">
              Need more help?
            </h2>
            <p className="text-[#404040] text-sm ">
              Reach us All Day from 10:30 AM – 08:30 PM IST{" "}
              <a
                href="tel:+912048552268"
                className="hover:cursor-pointer hover:underline text-black"
              >
                +91 2048552268
              </a>
              <br />
              Or contact us at:{" "}
              <a
                href="mailto:care@kumari.co"
                className="hover:cursor-pointer hover:underline text-black"
              >
                care@kumari.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
