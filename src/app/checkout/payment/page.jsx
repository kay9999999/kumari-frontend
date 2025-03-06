"use client";
import Link from "next/link";
import { useState } from "react";
import CheckoutBreadcrumb from "@/components/ui/checkoutBreadcrumb";
import { PiLessThan } from "react-icons/pi";
import RightDiv from "@/components/ui/rightdiv";
import FAQs from "@/components/ui/FaqforBillingandPayment";
import PhoneInput from "@/components/ui/CountryCodeDropdown";
import CouponPopup from "@/components/ui/couponpopup";
import { RiErrorWarningLine } from "react-icons/ri";
import { z } from "zod";


// Zod schema for form validation
const addressSchema = z.object({
  firstName: z.string().min(2, "This is a required field."),
  lastName: z.string().min(3, "This is a required field."),
  address1: z.string().min(1, "This is a required field"),
  address2: z.string().min(1, "This is a required field"),
  country: z.string().min(1, "This is a required field"),
  state: z.string().min(1, "This is a required field"),
  city: z.string().min(1, "This is a required field"),
  postalCode: z.string()
    .min(6, "This is a required field.")
    .max(6, "This is a required field.")
    .regex(/^\d+$/, "This is a required field."),
  phone: z.string()
    .min(10, "This is a required field.")
    .max(10, "This is a required field")
    .regex(/^\d+$/, "Enter valid telephone number"),
  countryCode: z.string().min(1, "This is a required field"),
});

const PaymentPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [billingOption, setBillingOption] = useState("shipping");
  const [codBillingOption, setCodBillingOption] = useState("shipping");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
      if (section === "cod") {
        setCodBillingOption("shipping");
      } else if (section === "razorpay") {
        setBillingOption("shipping");
      }
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "India",
    state: "",
    city: "",
    postalCode: "",
    company: "",
    phone: "",
    countryCode: "+91",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
    // Clear error msg when start typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e, paymentMethod) => {
    e.preventDefault();
    
    // Only validate if using new address
    if ((paymentMethod === "razorpay" && billingOption === "new") || 
        (paymentMethod === "cod" && codBillingOption === "new")) {
      try {
        addressSchema.parse(newAddress);
        setErrors({});
        // Proceed with form submission logic here
        console.log("Form validated successfully:", newAddress);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors = {};
          error.errors.forEach((err) => {
            newErrors[err.path[0]] = err.message;
          });
          setErrors(newErrors);
        }
        return;
      }
    }
    
  };

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
    <section className="w-full min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row w-full">

 {/* Right Div from Component*/}
        <RightDiv />

 {/* Left Div */}   
        <div className="order-3 lg:order-1 w-full lg:w-[55%] lg:pl-8 my-10 lg:mt-4 lg:my-0 px-6">
          <div className="max-[1023px]:hidden flex items-center justify-center bg-white z-20 py-4">
            <img
              className="object-contain"
              src="/images/logo/Kumari-logo2x.png"
              width={140}
              height={43}
              alt="Kumari Logo"
            />
          </div>
          <div className="hidden lg:block pb-10">
            <CheckoutBreadcrumb />
          </div>

  {/* Delivery Info Page */}
          <div className="space-y-4 p-2 border">
       {/* Contact */}
            <div className="flex justify-between items-center text-center w-11/12 mb-4 mx-auto">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg max-md:text-sm text-[#808080] m-0">Contact</h2>
                <div>test@gmail.com</div>
              </div>
              <div className="flex items-center">
                <span className="font-normal text-black hover:underline cursor-pointer">Change</span>
              </div>
            </div>

            <hr className="w-11/12 mx-auto border-gray-300" />
 {/* Ship to */}
            <div className="flex justify-between items-center text-center w-11/12 mb-4 mx-auto">
              <h2 className="text-lg max-md:text-sm text-[#808080] m-0">Ship to</h2>
              <div className="flex-1 mx-4 text-start">
                ttt test34 ewed rrfef, g34 , Gwagon cart telewsa, West Bengal 110048 India +91 1234567890
              </div>
              <div className="flex items-center">
                <span className="font-normal text-black hover:underline cursor-pointer">Change</span>
              </div>
            </div>

            <hr className="w-11/12 mx-auto border-gray-300" />
   {/* Method */}
            <div className="flex justify-between items-center text-center w-11/12 mb-4 mx-auto">
              <h2 className="text-lg max-md:text-sm text-[#808080] m-0">Method</h2>
              <div className="flex-1 mx-4 text-start">Free Shipping</div>
              <div className="flex items-center">
                <span className="font-normal text-black hover:underline cursor-pointer">Change</span>
              </div>
            </div>
          </div>
 {/* Payment Section */}
          <div className="p-4 my-4 w-full">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Select a payment method:</h2>
{/* Payment Options */}
            <div className="space-y-4">
{/* Razorpay */}
              <div className="border rounded-lg">
                <div
                  className={`min-h-[86px] flex items-center cursor-pointer border rounded-lg ${
                    expandedSection === "razorpay" ? "border-black border-2" : "border-gray-300"
                  }`}
                  onClick={() => toggleSection("razorpay")}
                >
                  <div className="ml-4">
                    <img src="https://cdn.razorpay.com/logo.png" alt="Razorpay" className="h-5" />
                  </div>
                </div>

                {expandedSection === "razorpay" && (
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Billing Address</h3>
                    <div className="space-y-4 border border-gray-300 rounded py-2">
                      <label className="flex items-start">
                        <input
                          type="radio"
                          name="billingAddress"
                          value="shipping"
                          checked={billingOption === "shipping"}
                          onChange={() => setBillingOption("shipping")}
                          className="mt-1 mx-2 h-5 w-5 text-pink-500 border-pink-500 focus:ring-pink-500"
                        />
                        <span className="text-base text-[#1D1D1F] font-bold">
                          Use my shipping address
                        </span>
                      </label>
                      {billingOption === "shipping" && (
                        <div className="mt-2 text-sm text-[#404040] space-y-1 font-semibold bg-gray-100 border">
                          <div>ttt test34</div>
                          <div>ewed rrfef, g34 , Gwagon cart</div>
                          <div>telewsa, West Bengal</div>
                          <div>IN 110048</div>
                          <div>+91 9425314759</div>
                        </div>
                      )}

                      <label className={`flex items-center ${billingOption === "new" ? "border-t mt-6" : ""}`}>
                        <input
                          type="radio"
                          name="billingAddress"
                          value="new"
                          checked={billingOption === "new"}
                          onChange={() => setBillingOption("new")}
                          className="mt-2 mx-2 h-5 w-5 text-pink-500 border-pink-500 focus:ring-pink-500"
                        />
                        <span className="text-base text-gray-800 mt-2">New Address</span>
                      </label>
                      
{/* New Address Form Razorpay*/}
                      {billingOption === "new" && (
                        <div className="mt-4 p-5 space-y-4 bg-[#FAFAFA] border">
          {/* First Name */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={newAddress.firstName}
                              onChange={handleAddressChange}
                              placeholder=""
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                          <label
                              htmlFor="firstName"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              First Name
                            </label>
                            {errors.firstName && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine /> {errors.firstName}</p>}
                          </div>
                         
 {/* Last Name */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={newAddress.lastName}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                            <label
                              htmlFor="lastName"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              Last Name
                            </label>
                            {errors.lastName && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.lastName}</p>}
                          </div>
 {/* Apartment/Suite/Building */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="address1"
                              name="address1"
                              value={newAddress.address1}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                            <label
                              htmlFor="address1"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              Apartment/Suite/Building
                            </label>
                            {errors.address1 && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.address1}</p>}
                          </div>
  {/* Street Address */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="address2"
                              name="address2"
                              value={newAddress.address2}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                            <label
                              htmlFor="address2"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              Street Address
                            </label>
                            {errors.address2 && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.address2}</p>}
                          </div>
{/* Country */}
                          <div className="grid grid-rows-1 grid-cols-1 bg-white">
                            <select
                              id="country"
                              name="country"
                              value={newAddress.country}
                              onChange={handleAddressChange}
                              className="peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent"
                            >
                              <option value="India">India</option>
                            </select>
                            <label
                              htmlFor="country"
                              className="row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none"
                            >
                              Country
                            </label>
                            {errors.country && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.country}</p>}
                          </div>
 {/* State/Province */}
                          <div className="grid grid-rows-1 grid-cols-1 bg-white">
                            <select
                              id="state"
                              name="state"
                              value={newAddress.state}
                              onChange={handleAddressChange}
                              className={`peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent ${
                                errors.state ? 'bg-pink-100 border-pink-500 border-2' : 'border-gray-300'
                              }`} required
                            >
                              <option value="">Please select a region, state or province</option>
                              
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
                              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
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
                              className={`row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none ${errors.state ? "text-red-500" : ""}`}
                            >
                              State/Province
                            </label>
                            {errors.state && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.state}</p>}
                          </div>
   {/* City and Zip/Postal Code */}
                          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="grid grid-rows-1 grid-cols-1 w-full sm:w-1/2">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                value={newAddress.city}
                                onChange={handleAddressChange}
                                placeholder=" "
                                className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                              />
                              <label
                                htmlFor="city"
                                className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                              >
                                City
                              </label>
                              {errors.city && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.city}</p>}
                            </div>

                            <div className="grid grid-rows-1 grid-cols-1 w-full sm:w-1/2">
                              <input
                                type="tel"
                                id="postalCode"
                                name="postalCode"
                                value={newAddress.postalCode}
                                onChange={handleAddressChange}
                                placeholder=" "
                                className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                              />
                              <label
                                htmlFor="postalCode"
                                className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                              >
                                Zip/Postal Code
                              </label>
                              {errors.postalCode && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.postalCode}</p>}
                            </div>
                          </div>
  {/* Company */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={newAddress.company}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500" 
                              required
                            />
                            <label
                              htmlFor="company"
                              className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                            >
                              Company
                            </label>
                           
                          </div>
 {/* Phone Number */}
                      <PhoneInput 
                            isOpen={isOpen}
                            value={newAddress.phone}
                            onChange={(value) => handleAddressChange({ target: { name: 'phone', value } })}
                            countryCode={newAddress.countryCode}
                            onCountryCodeChange={(value) => handleAddressChange({ target: { name: 'countryCode', value } })}
                          />
                          {errors.phone && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.phone}</p>}
   {/* Add Button */}
                          <button 
                            className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            onClick={(e) => handleSubmit(e, "razorpay")}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
  {/* Create Account */}
                    <label className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 text-pink-500 border-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-600">
                        I would like to create a Kumari Fine Jewellery account
                      </span>
                    </label>
 {/* Razorpay Button */}
                    <button 
                      className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      onClick={(e) => handleSubmit(e, "razorpay")}
                    >
                      Pay with Razorpay
                    </button>
                  </div>
                )}
              </div>

              {/* PayPal */}
              <div className="border rounded-lg">
                <div
                  className={`min-h-[86px] flex items-center cursor-pointer border rounded-lg ${
                    expandedSection === "paypal" ? "border-black border-2" : "border-gray-300"
                  }`}
                  onClick={() => toggleSection("paypal")}
                >
                  <div className="ml-4">
                    <img
                      src="https://static.kumari.co/static/version1736965701/frontend/SeePossible/kumari/en_US/SeePossible_Checkout/images/payment/pp-logo-200px.webp"
                      alt="PayPal"
                      className="h-5"
                    />
                  </div>
                </div>

                {expandedSection === "paypal" && (
                  <div className="p-4 border-t border-gray-300">
                    <label className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-600">
                        I would like to create a Kumari Fine Jewellery account
                      </span>
                    </label>

                    <button className="mt-6 w-full bg-[#ffc439] text-white py-3 rounded hover:bg-[#e6af2f] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                      <img
                        src="https://static.kumari.co/static/version1736965701/frontend/SeePossible/kumari/en_US/SeePossible_Checkout/images/payment/pp-logo-200px.webp"
                        alt="Paypal"
                        className="h-6 mx-auto"
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Cash On Delivery */}
              <div className="border rounded-lg">
                <div
                  className={`min-h-[86px] flex items-center cursor-pointer border rounded-lg ${
                    expandedSection === "cod" ? "border-black border-2" : "border-gray-300"
                  }`}
                  onClick={() => toggleSection("cod")}
                >
                  <span className="text-lg font-bold text-gray-800 ml-4">Cash On Delivery</span>
                </div>
{/* Collapsible COD Section */}
                {expandedSection === "cod" && (
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Billing Address</h3>
                    <div className="space-y-4 border border-gray-300 rounded-lg py-2">
    {/* Shipping Address Option */}                    
                      <label className="flex items-start">
                        <input
                          type="radio"
                          name="codBillingAddress"
                          value="shipping"
                          checked={codBillingOption === "shipping"}
                          onChange={() => setCodBillingOption("shipping")}
                          className="mt-1 mx-2 h-5 w-5 text-pink-500 border-gray-300 focus:ring-pink-500"
                        />
                        <span className="text-base text-[#1D1D1F] font-bold">
                          Use my shipping address
                        </span>
                      </label>
                      {codBillingOption === "shipping" && (
                        <div className="mt-2 text-sm text-[#404040] space-y-1 font-semibold bg-gray-100">
                          <div>ttt test34</div>
                          <div>ewed rrfef, g34 , Gwagon cart</div>
                          <div>telewsa, West Bengal</div>
                          <div>IN 110048</div>
                          <div>+91 9425314759</div>
                        </div>
                      )}
 {/* New Address Option for COD*/}
                      <label className={`flex items-center ${codBillingOption === "new" ? "border-t mt-6" : ""}`}>
                        <input
                          type="radio"
                          name="codBillingAddress"
                          value="new"
                          checked={codBillingOption === "new"}
                          onChange={() => setCodBillingOption("new")}
                          className="mt-2 mx-2 h-5 w-5 text-pink-500 border-gray-300 focus:ring-pink-500"
                        />
                        <span className="text-base text-gray-800 mt-2">New Address</span>
                      </label>
  {/* New Address for COD  */}
                      {codBillingOption === "new" && (
                        <div className="mt-4 p-5 space-y-4 bg-[#FAFAFA] border">
    {/* First Name */}                       
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={newAddress.firstName}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                            <label
                              htmlFor="firstName"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              First Name
                            </label>
                            {errors.firstName && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.firstName}</p>}
                          </div>
  {/* Last Name */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={newAddress.lastName}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                            <label
                              htmlFor="lastName"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              Last Name
                            </label>
                            {errors.lastName && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.lastName}</p>}
                          </div>
 {/* Apartment/Suite/Building */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="address1"
                              name="address1"
                              value={newAddress.address1}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                            <label
                              htmlFor="address1"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              Apartment/Suite/Building
                            </label>
                            {errors.address1 && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.address1}</p>}
                          </div>
  {/* Street Address */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="address2"
                              name="address2"
                              value={newAddress.address2}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                            />
                            <label
                              htmlFor="address2"
                              className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                            >
                              Street Address
                            </label>
                            {errors.address2 && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.address2}</p>}
                          </div>
  {/* Country */}
                          <div className="grid grid-rows-1 grid-cols-1 bg-white">
                            <select
                              id="country"
                              name="country"
                              value={newAddress.country}
                              onChange={handleAddressChange}
                              className="peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent"
                            >
                              <option value="India">India</option>
                            </select>
                            <label
                              htmlFor="country"
                              className="row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none"
                            >
                              Country
                            </label>
                            {errors.country && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.country}</p>}
                          </div>
  {/* State/Province */}
                         <div className="grid grid-rows-1 grid-cols-1 bg-white">
                            <select
                              id="state"
                              name="state"
                              value={newAddress.state}
                              onChange={handleAddressChange}
                              className={`peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent ${
                                errors.state ? 'bg-pink-100 border-pink-500 border-2' : 'border-gray-300'
                              }`} required
                            >
                              <option value="">Please select a region, state or province</option>
                              
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
                              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
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
                              className={`row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none ${errors.state ? "text-red-500" : ""}`}
                            >
                              State/Province
                            </label>
                            {errors.state && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.state}</p>}
                          </div>
 {/* City and Zip/Postal Code */}
                          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="grid grid-rows-1 grid-cols-1 w-full sm:w-1/2">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                value={newAddress.city}
                                onChange={handleAddressChange}
                                placeholder=" "
                                className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                              />
                              <label
                                htmlFor="city"
                                className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                              >
                                City
                              </label>
                              {errors.city && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.city}</p>}
                            </div>

                            <div className="grid grid-rows-1 grid-cols-1 w-full sm:w-1/2">
                              <input
                                type="tel"
                                id="postalCode"
                                name="postalCode"
                                value={newAddress.postalCode}
                                onChange={handleAddressChange}
                                placeholder=" "
                                className={`peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 ${
                                errors.firstName ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                              }`}
                              required
                              />
                              <label
                                htmlFor="postalCode"
                                className={`row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none ${errors.firstName ? "text-red-500" : ""}`}
                              >
                                Zip/Postal Code
                              </label>
                              {errors.postalCode && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.postalCode}</p>}
                            </div>
                          </div>
   {/* Company */}
                          <div className="grid grid-rows-1 grid-cols-1">
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={newAddress.company}
                              onChange={handleAddressChange}
                              placeholder=" "
                              className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                              required
                            />
                            <label
                              htmlFor="company"
                              className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                            >
                              Company
                            </label>
                           
                          </div>
 {/* Phone Number Component*/}
                          <PhoneInput 
                            isOpen={isOpen}
                            value={newAddress.phone}
                            onChange={(value) => handleAddressChange({ target: { name: 'phone', value } })}
                            countryCode={newAddress.countryCode}
                            onCountryCodeChange={(value) => handleAddressChange({ target: { name: 'countryCode', value } })}
                          />
                          {errors.phone && <p className="text-red-500 text-sm flex items-center mt-1 gap-1"><RiErrorWarningLine />{errors.phone}</p>}

                          <button 
                            className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            onClick={(e) => handleSubmit(e, "cod")}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
 {/* Delivery Note */}
                    <p className="mt-4 text-sm text-gray-600">
                      Upon delivery of your order, you will be required to pay
                      the full amount due using a credit card (Visa, Rupay,
                      MasterCard or American Express). Packaging can be
                      scheduled only after payment has been made. Make sure you
                      get a receipt from the order.
                    </p>
{/* Create Account Checkbox */}
                    <label className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 text-pink-500 border-gray-300 focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-600">
                        I would like to create a Kumari Fine Jewellery account
                      </span>
                    </label>
 {/* Place Order Button */}
                    <button 
                      className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      onClick={(e) => handleSubmit(e, "cod")}
                    >
                      Place Order
                    </button>
                  </div>
                )}
              </div>
            </div>
  {/*Return to Shipping*/}
            <div className="mt-12 text-center">
              <Link href="#" className="text-base text-gray-800 hover:underline flex items-center justify-center">
                <span className="mr-1"><PiLessThan /></span> Return to Shipping
              </Link>
            </div>
          </div>

          <hr className="w-11/12 mx-auto border-gray-300" />
      {/* FAQs Component*/}   
         <div><FAQs /></div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
