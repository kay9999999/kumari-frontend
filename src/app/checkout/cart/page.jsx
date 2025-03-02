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
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { removeItem, updateQuantity } from "@/redux/cartReducer";
import { selectCartProducts } from "@/redux/selectors";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartProducts, shallowEqual);

  const [isSpecVisible, setIsSpecVisible] = useState({});
  const [isDeliveryOption, setDeliveryOption] = useState({});
  const [zipCode, setZipCode] = useState("");
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSharingBagOpen, setIsSharingBagOpen] = useState(false);
  const [showTax, setShowTax] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [popupVisibleId, setPopupVisibleId] = useState(null);

  // Calculate the subtotal price
  const Subtotal = cartItems.reduce((acc, item) => {
    // Remove commas if needed and convert to number
    const price = parseFloat(String(item.subtotal).replace(/,/g, "")) || 0;
    const quantity = Number(item.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  const overallSubtotal = Subtotal.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // If a coupon is applied, calculate discount and final total
  const discountPercent = coupon ? coupon.discountPercent : 0;
  const discountAmount = Subtotal * (discountPercent / 100);

  // Calculate the Tax price
  const estimatedTax = Subtotal * 0.03;
  const Tax = estimatedTax.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const finalTotal = Subtotal + estimatedTax - discountAmount;

  const handleApplyCoupon = ({ code, discountPercent }) => {
    setCoupon({ code, discountPercent });
  };

  // Handler to update quantity from the select dropdown.
  const handleQuantityChange = (sku, newQuantity) => {
    dispatch(updateQuantity({ sku, quantity: newQuantity }));
  };

  const toggleSharingBag = () => {
    setIsSharingBagOpen(!isSharingBagOpen);
  };
  const toggleSpecifications = (e, sku) => {
    e.preventDefault();
    setIsSpecVisible((prev) => ({
      ...prev,
      [sku]: !prev[sku],
    }));
  };
  const toggleDeliveryOption = (e, sku) => {
    e.preventDefault();
    setDeliveryOption((prev) => ({
      ...prev,
      [sku]: !prev[sku],
    }));
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
    setPopupVisibleId(null);
  };

  const handleRemoveItem = (sku) => {
    dispatch(removeItem(sku));
    setPopupVisibleId(null);
  };

  const togglePopup = (sku) =>
    setPopupVisibleId(popupVisibleId === sku ? null : sku);

  console.log(cartItems);

  return (
    <>
      {cartItems.length > 0 ? (
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
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.sku,
                                  Number(e.target.value)
                                )
                              }
                              className="w-full h-8 px-2 border border-gray-300 rounded"
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
                              {`₹${parseFloat(
                                item.finalPrice * item.quantity
                              ).toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="mt-4 relative">
                        <div className="flex justify-between items-start">
                          <div>
                            <button
                              className="flex items-center gap-1 text-base  cursor-pointer"
                              onClick={(e) => toggleSpecifications(e, item.sku)}
                            >
                              Specifications
                              {isSpecVisible[item.sku] ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Fixed height for the specifications section */}
                        <div
                          className={`spec-info mt-4 transition-all duration-500 ${
                            isSpecVisible[item.sku]
                              ? "max-h-40 opacity-100 transform translate-y-0"
                              : "max-h-0 opacity-0 transform -translate-y-5 overflow-hidden"
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
                              <span className="font-medium">
                                Diamond Quality:
                              </span>{" "}
                              {item.diamondQuality}
                            </div>
                            <div>
                              <span className="font-medium">Size:</span>{" "}
                              {item.size}
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className="remove absolute top-0 right-0">
                          <button
                            className="flex items-center gap-1 text-base cursor-pointer"
                            onClick={() => togglePopup(item.sku)}
                          >
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                          </button>
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

                            <div className="mt-1">
                              <span>{item.quantity} x</span> Ships in 1-3 weeks
                            </div>
                            <div className="mt-1">
                              <div className="flex items-center">
                                <button
                                  className="flex items-center gap-1"
                                  onClick={(e) =>
                                    toggleDeliveryOption(e, item.sku)
                                  }
                                >
                                  Delivery option for :
                                  <span className="text-black">
                                    {zipCode || ""}
                                  </span>
                                  {isDeliveryOption[item.sku] ? (
                                    <FaChevronUp />
                                  ) : (
                                    <FaChevronDown />
                                  )}
                                </button>
                              </div>
                              <div
                                className={`mt-4 transition-all duration-300 overflow-hidden ${
                                  isDeliveryOption[item.sku]
                                    ? " opacity-100 transform translate-y-0"
                                    : " opacity-0 transform -translate-y-5 "
                                }`}
                              >
                                {isDeliveryOption[item.sku] && (
                                  <div className="mb-6 relative w-full md:w-1/2">
                                    <form>
                                      <input
                                        type="text"
                                        id="ZipCode"
                                        name="ZipCode"
                                        value={zipCode}
                                        onChange={(e) =>
                                          setZipCode(e.target.value)
                                        }
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
                    {popupVisibleId === item.sku && (
                      <div
                        className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="bg-white p-8 rounded w-3/4 max-w-xl flex flex-row max-md:flex-col items-center relative">
                          {/* Close Button */}
                          <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => togglePopup(item.sku)}
                          >
                            <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
                          </button>

                          {/* Left Side: Image */}
                          <div>
                            <div className="w-full  mb-4 md:mb-0">
                              <img
                                src={`${item?.image}`}
                                alt={item?.title || "Product Image"}
                                className="w-full max-w-[200px] max-md:max-w-[200px] h-auto rounded object-cover"
                              />
                            </div>
                          </div>

                          {/* Right Side: Heading and Buttons */}
                          <div className="w-full flex flex-col items-center text-center">
                            <h2
                              id="popup-title"
                              className="lg:text-lg sm:text-sm md:text-lg font-semibold mb-2 text-gray-800"
                            >
                              Remove item from shopping bag?
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                              Tip : Add it to your wishlist to purchase it
                              later!
                            </p>
                            <div className="flex flex-col space-y-3 w-full max-w-[280px]">
                              <button
                                className="bg-black text-white px-4 py-2 rounded hover:opacity-85 transition duration-200 capitalize"
                                onClick={handleMoveToWishlist}
                              >
                                Move to Wishlist
                              </button>
                              <button
                                className="px-4 py-2 rounded hover:underline text-sm text-gray-700"
                                onClick={() => handleRemoveItem(item.sku)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
                    <span>₹{overallSubtotal}</span>
                  </div>
                </div>

                {/* Coupon Code Section */}
                <div className="flex justify-between items-center mt-2 bg-white ">
                  <div className="flex items-center gap-2">
                    {coupon ? (
                      <span className="text-sm   text-[#404040]">
                        Coupon Applied :{" "}
                        <strong className="text-[#808080] px-2 bg-slate-50 shadow py-1 rounded">
                          {coupon.code}
                        </strong>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCoupon(null);
                          }}
                          className="px-2 py-1 text-red-600 rounded hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </span>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          <BiSolidOffer className="h-6 w-6" />
                          Have Coupon Code ?
                          <b>
                            <CouponPopUp onApplyCoupon={handleApplyCoupon} />
                          </b>
                        </div>
                      </>
                    )}
                  </div>
                  <div className=" text-[#404040]">
                    ₹
                    {discountAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>

                {/* Shipping */}
                <div
                  className="flex justify-between items-center mt-2"
                  onClick={toggleShippingDetails}
                >
                  <div className="flex items-center gap-1">
                    Shipping
                    {showShippingDetails && (
                      <div className=" text-gray-600">
                        (Standard - Shipping)
                      </div>
                    )}
                  </div>
                  <span>₹0</span>
                </div>

                {/* Estimated Tax Section */}
                <div className="mt-2 border-b pb-6">
                  <div className="flex justify-between items-center ">
                    <div className="flex items-center">
                      <span>Estimated Tax</span>
                      <button
                        onClick={() => setShowTax(!showTax)}
                        className="ml-1"
                      >
                        {showTax ? (
                          <FaChevronUp size={12} />
                        ) : (
                          <FaChevronDown size={12} />
                        )}
                      </button>
                    </div>
                    <span>₹{Tax}</span>
                  </div>

                  {showTax && (
                    <div className="flex justify-between items-center text-xs text-[#808080] mt-2 ml-2">
                      <div>IGST (3%)</div>
                      <span>₹{Tax}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mt-4 text-[#1A1A1A] text-[18px] md:text-2xl">
                  <h1 className=" font-semibold">Total</h1>
                  <span className="font-semibold">
                    ₹
                    {finalTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end lg:w-3/4 mx-auto">
              <p className="text-gray-600 text-sm">
                Your shopping bag is eligible for a Cash on Delivery. You can
                choose it during checkout.
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
                    <span className="text-lg text-center">
                      Proceed to Checkout
                    </span>
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
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 text-center  mt-[76px] lg:mt-[84px] xl:mt-[92px] w-full max-w-[1040px] lg:max-w-7xl px-5 mx-auto">
          <h1 className=" text-2xl md:text-4xl font-semibold text-[#1A1A1A] mb-10">
            Your bag is empty.
          </h1>
          <p className="text-[#404040] mb-8 text-sm lg:text-base">
            Sign in to see if you have any saved items. Or continue shopping.
          </p>

          <div className="flex flex-col xs:flex-row justify-center items-center w-full pt-6 gap-4">
            {/* Sign In Button */}
            <div className="w-full sm:w-auto">
              <Link href="/signin" passHref>
                <button className="w-full sm:w-[300px] bg-black h-14 text-base text-white px-6 py-0 rounded hover:opacity-85 transition duration-200">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Continue Shopping Button */}
            <div className="w-full sm:w-auto">
              <Link href="/home" passHref>
                <button className="w-full sm:w-[300px] bg-[#E7E7E8] h-14 text-base text-[#404040] px-6 py-0 rounded hover:bg-gray-300 transition duration-200">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="border-t "></div>
      <section className="w-full max-w-[1040px] lg:max-w-7xl px-5 mx-auto">
        <div className=" my-6">
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
      </section>
    </>
  );
};

export default Cart;
