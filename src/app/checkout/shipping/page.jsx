"use client";
import { useState } from "react";
import CheckoutBreadcrumb from "@/components/ui/checkoutBreadcrumb";
import { PiLessThan } from "react-icons/pi";
import RightDiv from "@/components/ui/rightdiv";

const ShippingMethod = () => {
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
        {/* Right Div */}
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
            <div className="flex justify-between items-center text-center w-11/12 mb-4  mx-auto">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg max-md:text-sm text-[#808080] m-0">
                  Contact
                </h2>
                <div>test@gmail.com</div>
              </div>
              <div className="flex items-center">
                <span className="font-normal text-black hover:underline cursor-pointer">
                  Change
                </span>
              </div>
            </div>

            <hr className="w-11/12 mx-auto border-gray-300" />

            {/* Ship to */}
            <div className="flex justify-between items-center text-center w-11/12 mb-4  mx-auto">
              <h2 className="text-lg max-md:text-sm text-[#808080] m-0">
                Ship to
              </h2>
              <div className="flex-1 mx-4 text-start">
                ttt test34 ewed rrfef, g34 , Gwagon cart telewsa, West Bengal
                110048 India +91 1234567890
              </div>
              <div className="flex items-center">
                <span className="font-normal text-black hover:underline cursor-pointer">
                  Change
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6 my-6 w-full">
            {/* Ships in 1-3 weeks */}
            <h2 className="text-xl  text-black mb-2">Ships in 1-3 weeks</h2>

            {/* Product Name */}
            <h3 className="text-sm font-semibold text-gray-600 bg-gray-100 uppercase mb-4 p-2">
              Royal Rebel Seal Statement Ring
            </h3>

            {/* Select your delivery method */}
            <h4 className="text-base font-medium text-gray-800 mb-2">
              Select your delivery method:
            </h4>

            {/* Delivery Option */}
            <div className="border border-black rounded p-6 flex justify-between items-center mb-4">
              <div>
                <p className="text-base font-medium text-gray-800">
                  Logistics (Free Shipping)
                </p>
                <p className="text-sm text-gray-600">
                  Delivery By 21st Mar 2025
                </p>
              </div>
              <span className="text-base font-medium text-gray-800">FREE</span>
            </div>

            {/* Keep this in mind section */}
            <div>
              <h4 className="text-base font-medium text-gray-800 mb-2">
                Keep this in mind about your delivery:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>
                  You’ll be contacted by Kumari Fine Jewellery prior to delivery
                  of your order.
                </li>
                <li>A signature must be required upon delivery.</li>
              </ul>
            </div>

            {/* Shipping Policy */}
            <div className="mt-2">
              <a
                href="/terms-conditions#shipping_delivery"
                className="text-sm text-black hover:underline"
              >
                View our shipping policy
              </a>
            </div>

            {/* Buttons */}
            <div className="space-y-6 max-sm:mx-6 lg:pb-10">
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-4 rounded hover:bg-gray-800 transition-colors duration-200"
              >
                Continue to Payment
              </button>
              <div className="flex flex-row justify-center items-center w-full gap-1">
                <PiLessThan />
                <span className="hover:underline cursor-pointer">
                  Return to Information
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingMethod;
