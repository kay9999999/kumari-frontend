"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import PhoneInput from "@/components/ui/CountryCodeDropdown";
import CouponPopUp from "@/components/ui/CouponPopUp";
import { BiSolidOffer } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
// import CheckoutBreadcrumb from "@/components/ui/checkoutBreadcrumb";
import { FaChevronUp, FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { useSelector, shallowEqual } from "react-redux";
import { selectCartProducts } from "@/redux/selectors";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartProducts, shallowEqual);

  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [showTaxDetails, setShowTaxDetails] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [coupon, setCoupon] = useState(null);

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

  const toggleShippingDetails = () =>
    setShowShippingDetails(!showShippingDetails);
  const toggleTaxDetails = () => setShowTaxDetails(!showTaxDetails);
  const toggleOrderSummary = () => setShowOrderSummary(!showOrderSummary);
  // const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    mail: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    company: "",
    phone: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.mail) newErrors.mail = "This is a required field.";
    if (!formData.firstName) newErrors.firstName = "This is a required field.";
    if (!formData.lastName) newErrors.lastName = "This is a required field.";
    if (!formData.address1) newErrors.address1 = "This is a required field.";
    if (!formData.city) newErrors.city = "This is a required field.";
    if (!formData.state) newErrors.state = "This is a required field.";
    if (!formData.postalCode)
      newErrors.postalCode = "This is a required field.";
    if (!formData.phone) newErrors.phone = "This is a required field.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col ">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Right Div */}

        <div className="bg-[#fafafa] pt-8 hidden lg:flex flex-col order-1 lg:order-2 w-1/2 lg:w-[45%] pr-0 lg:pr-4 lg:sticky lg:top-0 lg:right-0 lg:h-full lg:overflow-y-auto outline outline-1 outline-gray-200 ">
          {/* Product Info */}
          {cartItems.map((item) => (
            <div key={item.sku} className="p-4 w-full bg-[#fafafa]">
              <div className="flex gap-4 border p-3 bg-white rounded">
                <div className="w-[160px] min-h-px border relative">
                  <picture>
                    <img
                      className="object-fit w-full h-full"
                      src={item.image}
                      alt={item.title}
                    />
                  </picture>
                  <div className="absolute top-0 right-0 bg-gray-800 text-white px-1 py-1  text-xs">
                    {item.quantity}
                  </div>
                </div>
                <div className="w-full text-[#808080] text-sm space-y-1 px-2">
                  <strong className="text-[#404040] text-base">
                    {item.title}
                  </strong>
                  <div>
                    <span className=" font-semibold">Metal:</span>{" "}
                    {item.metal || "14k Gold"}
                  </div>
                  <div>
                    <span className=" font-semibold">Metal Color:</span>{" "}
                    {item.metalColor || "Yellow"}
                  </div>
                  <div>
                    <span className=" font-semibold">Diamond Quality:</span>{" "}
                    {item.diamondQuality || "SI / IJ"}
                  </div>
                  <div>
                    <span className="font-semibold">Size:</span>{" "}
                    {item.size || "R12"}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Coupon Section  */}
          <div className="p-4 w-full bg-[#fafafa] ">
            <div className="flex justify-between items-center bg-white mt-2 border p-3">
              <div className="flex items-center gap-1 z-30 text-sm text-[#404040]">
                <BiSolidOffer className="h-6 w-6 " />
                Have Coupon Code?
                <b>
                  <CouponPopUp onApplyCoupon={handleApplyCoupon} />
                </b>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="p-4 w-full bg-[#fafafa] text-sm text-[#404040] ">
            <div className="p-3 bg-white border space-y-2">
              <div className="flex justify-between items-center">
                <div>Subtotal</div>
                <div>
                  <span>₹{overallSubtotal}</span>
                </div>
              </div>

              {/* Coupon Discount (only if coupon is applied) */}
              {coupon && (
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-[#404040]">
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
                  </div>
                  <div className="text-[#404040]">
                    - ₹
                    {discountAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              )}

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
                <span>₹{Tax}</span>
              </div>
              {showTaxDetails && (
                <div className="flex justify-between items-center">
                  <div className="text-gray-600 text-sm mt-1">IGST (3%)</div>
                  <span className="text-[#808080]">₹{Tax}</span>
                </div>
              )}

              <div className="flex justify-between items-center border-t mt-6">
                <h1 className="text-2xl font-bold pt-2">Total</h1>
                <span className="text-2xl font-bold pt-2 text-[#1A1A1A]">
                  ₹
                  {finalTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links Right */}
          <div className="hidden lg:flex lg:flex-row items-center justify-around p-6 text-sm">
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
        <div className="order-1 lg:hidden flex items-center justify-center w-full bg-white z-20 py-6">
          <img
            className="object-contain"
            src="/images/Miorola-logo.webp"
            width={140}
            height={43}
            alt="Miorola Logo"
          />
        </div>
        <div className="order-1 lg:hidden p-4 border rounded bg-[#fafafa] mt-6">
          <div
            className="flex justify-between items-center cursor-pointer w-full"
            onClick={toggleOrderSummary}
          >
            <div className="flex items-center">
              <h2 className="  text-[#1A1A1A]">Order Summary</h2>
              <span className="ml-2 text-2xl">
                {showOrderSummary ? (
                  <FaChevronUp size={14} />
                ) : (
                  <FaChevronDown size={14} />
                )}
              </span>
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">
              ₹
              {finalTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {showOrderSummary && (
            <div className="mt-4 space-y-4">
              {/* Product Info */}
              {cartItems.map((item) => (
                <div key={item.sku} className="bg-white p-4 rounded">
                  <div className="flex items-center gap-4 border p-3 rounded">
                    <div className="w-[120px] min-h-px border  relative">
                      <picture>
                        <img
                          className="object-fit w-full h-full"
                          src={item.image}
                          alt={item.title}
                        />
                      </picture>
                      <div className="absolute top-0 right-0 bg-gray-800 text-white px-0.5 py-0.5  text-xs">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="w-full  space-y-1 text-[#808080] text-xs md:text-sm">
                      <strong className="text-sm md:text-base  text-[#404040]">
                        {item.title}
                      </strong>
                      <div>
                        <span className=" font-semibold">Metal:</span>{" "}
                        {item.metal}
                      </div>
                      <div>
                        <span className=" font-semibold">Metal Color:</span>{" "}
                        {item.metalColor}
                      </div>
                      <div>
                        <span className=" font-semibold">Diamond Quality:</span>{" "}
                        {item.diamondQuality}
                      </div>
                      <div>
                        <span className=" font-semibold">Size:</span>{" "}
                        {item.size}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Section */}
              <div className="bg-white p-3 rounded">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 z-30 text-sm text-[#404040]">
                    <BiSolidOffer className="h-6 w-6  " />
                    Have Coupon Code?
                    <b>
                      <CouponPopUp onApplyCoupon={handleApplyCoupon} />
                    </b>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-white p-3 rounded border text-[#404040] text-sm">
                <div className="flex justify-between items-center ">
                  <div>Subtotal</div>
                  <div>
                    <span>₹{overallSubtotal}</span>
                  </div>
                </div>

                {/* Coupon Discount (only if coupon is applied) */}
                {coupon && (
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-[#404040]">
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
                    </div>
                    <div className="text-[#404040]">
                      - ₹
                      {discountAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                )}

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
                        <FaChevronUp size={14} className=" text-gray-600" />
                      ) : (
                        <FaChevronDown size={14} className=" text-gray-600" />
                      )}
                    </div>
                  </div>
                  <span>₹{Tax}</span>
                </div>
                {showTaxDetails && (
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 text-sm mt-1">IGST (3%)</div>
                    <span className="text-[#808080]">₹{Tax}</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t mt-4 text-xl font-bold text-[#1A1A1A]">
                  <h1>Total</h1>
                  <span>
                    ₹
                    {finalTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Breadcrumb for small screens*/}
        {/* <div className="order-2 lg:order-1 w-full lg:hidden flex justify-center py-4 bg-white">
          <CheckoutBreadcrumb />
        </div> */}

        {/* Left Div */}

        <div className="order-3 lg:order-1 w-full lg:w-[55%] lg:pl-8 mt-10 mb-6 lg:mt-8 lg:mb-0 px-6 lg:sticky lg:top-0 lg:right-0 lg:h-full lg:overflow-y-auto">
          <div className="hidden  lg:flex items-center justify-center bg-white z-20 pb-6">
            <img
              className="object-contain"
              src="/images/Miorola-logo.webp"
              width={140}
              height={43}
              alt="Miorola Logo"
            />
          </div>
          {/* <div className="hidden lg:block pb-10">
            <CheckoutBreadcrumb />
          </div> */}

          <div className="flex justify-between items-center text-center w-full mb-4 max-md:p-2">
            <div className="flex items-center">
              <h2 className="text-2xl max-md:text-sm font-bold text-[#1A1A1A] m-0">
                Contact information
              </h2>
            </div>
            <div className="flex items-center text-sm">
              Have an account? <span className="font-semibold"> Login</span>
            </div>
          </div>

          {/* Form  */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}

            <div className="p-5 border rounded bg-[#fafafa]">
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 "
                  required
                />
                <label
                  htmlFor="mail"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  Email Address
                </label>
                {errors.mail && (
                  <p className="text-red-500 text-sm mt-1">{errors.mail}</p>
                )}
              </div>
            </div>

            <div className="mt-4 mb-2">
              <h2 className="text-2xl max-md:text-sm font-bold text-[#1A1A1A] mb-2 max-sm:p-2">
                Where should we send your order?
              </h2>
            </div>

            <div className="p-5 border rounded bg-[#fafafa] space-y-6">
              {/* First Name */}
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                  required
                />
                <label
                  htmlFor="firstName"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  First Name
                </label>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder=""
                  className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 "
                  required
                />
                <label
                  htmlFor="lastName"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  Last Name
                </label>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Address 1 */}
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder=""
                  className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                  required
                />
                <label
                  htmlFor="address1"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  Apartment/ Suite/ Building
                </label>
                {errors.address1 && (
                  <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
                )}
              </div>

              {/* Address 2 */}
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder=""
                  className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                  required
                />
                <label
                  htmlFor="address2"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  Street Address
                </label>
                {errors.address2 && (
                  <p className="text-red-500 text-sm mt-1">{errors.address2}</p>
                )}
              </div>

              {/* Country */}
              <div className="grid grid-rows-1 grid-cols-1">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent"
                  required
                >
                  <option value="">Select a country</option>
                  <option value="India">India</option>
                </select>
                <label
                  htmlFor="country"
                  className="row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none"
                >
                  Country
                </label>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              {/* State */}
              <div className="grid grid-rows-1 grid-cols-1">
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent"
                  required
                >
                  <option value="">
                    Please select a region, state or province
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                </select>
                <label
                  htmlFor="state"
                  className="row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none"
                >
                  State
                </label>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              {/* City and Postal Code */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="grid grid-rows-1 grid-cols-1 w-full sm:w-1/2">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder=""
                    className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                    required
                  />
                  <label
                    htmlFor="city"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm  peer-valid:pt-0 pl-4 pointer-events-none"
                  >
                    City
                  </label>
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div className="grid grid-rows-1 grid-cols-1 w-full sm:w-1/2">
                  <input
                    type="tel"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder=""
                    className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                    required
                  />
                  <label
                    htmlFor="postalCode"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                  >
                    Zip/Postal Code
                  </label>
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder=""
                  className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                  required
                />
                <label
                  htmlFor="company"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  Company
                </label>
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              {/* Phone */}
              <PhoneInput
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            </div>

            <div className="space-y-6 mx-6 lg:pb-10 ">
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-4 rounded hover:opacity-85 transition duration-300 capitalize"
              >
                Continue to Delivery
              </button>
              <Link href="/checkout/cart">
                <div className="flex flex-row justify-center items-center w-full gap-1 pt-6">
                  <FaChevronLeft size={14} />

                  <span className="hover:underline cursor-pointer ">
                    Return to Bag
                  </span>
                </div>
              </Link>
            </div>

            {/* Footer Links Left */}
            <div className="border-t text-sm flex flex-row items-center justify-between flex-wrap md:mx-10 sm:mx-1 p-4 order-4 lg:order-none lg:hidden">
              <Link
                href="/cancellation-refund"
                className="flex items-center justify-center gap-1"
              >
                <span>Return Policy</span>
                <GoArrowUpRight />
              </Link>
              <Link href="/privacy-policy" className="flex items-center gap-1 ">
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
          </form>
        </div>
      </div>
      <style>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </section>
  );
};

export default CheckoutPage;
