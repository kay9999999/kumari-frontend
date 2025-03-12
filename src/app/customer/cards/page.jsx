"use client";
import Link from "next/link";
import React from "react";
import { PiLessThan } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { IoIosLock } from "react-icons/io";

const Cards = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cardCVV: "",
  });


  const [hasAddress, setHasAddress] = useState(false); 

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const parts = digits.match(/.{1,4}/g) || [];
    return parts.join(" ").slice(0, 19);
  };

  const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, "");
    const month = digits.slice(0, 2);
    const year = digits.slice(2, 4);
    let formatted = month;
    if (month.length === 2 && year.length > 0) {
      formatted += "/" + year;
    }
    return formatted.slice(0, 5);
  };

  const formatCVV = (value) => {
    return value.replace(/\D/g, "").slice(0, 3);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "cardNumber"
          ? formatCardNumber(value)
          : name === "expiryDate"
          ? formatExpiryDate(value)
          : name === "cardCVV"
          ? formatCVV(value)
          : value,
    }));
  };

  return (
    <section className="w-full my-24">
      <div className="w-full bg-white ">
        <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center mt-2 h-full">
          <span className="whitespace-nowrap text-[#4D4D4D] text-base">
            Hi, Username.
          </span>
          <Link
            href="/customer/account/"
            className="hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            <PiLessThan className="h-3 w-4" />
            <span className="text-sm">Go to Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="inset-x-0 bottom-0 border-b"></div>

      {/* if hasAddress */}
      {hasAddress ? (
       
        <>
          <div className="max-w-5xl mt-8 mx-auto px-4 pt-2 flex items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl max-md:text-2xl font-bold text-[#1A1A1A] ">
                Payment
              </h2>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 flex flex-col">
            <div className="w-full md:w-1/2 lg:w-2/5 space-y-4 mt-10 ">
              <p className="text-lg font-semibold text-[#4D4D4D]">
                Add a new saved card
              </p>

              {/* cardNumber */}
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 1234 1234 1234"
                  maxLength="19"
                  className="row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none"
                  required
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
                <label
                  htmlFor="cardNumber"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out pl-4 pointer-events-none"
                ></label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* MM/YY */}
                <div className="grid grid-rows-1 grid-cols-1">
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none"
                    required
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                  <label
                    htmlFor="expiryDate"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out pl-4 pointer-events-none"
                  ></label>
                </div>

                {/* CVV */}
                <div className="grid grid-rows-1 grid-cols-1">
                  <input
                    type="text"
                    id="cardCVV"
                    name="cardCVV"
                    value={formData.cardCVV}
                    onChange={handleChange}
                    placeholder="CVV"
                    maxLength="3"
                    pattern="[0-9]{3}"
                    inputMode="numeric"
                    className="row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none"
                    required
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                  <label
                    htmlFor="cardCVV"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out pl-4 pointer-events-none"
                  ></label>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <IoIosLock className="text-green-600" />
                <span className="text-xs text-gray-400 mt-1">
                  Your card details are protected using PCI DSS v3.2 security
                  standards.
                </span>
              </div>

              <div className="lg:pb-10">
                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-4 rounded hover:opacity-85 transition duration-300 capitalize"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // if NO address
        <div className="max-w-5xl mt-8 mx-auto px-4 pt-2 flex items-center">
          <div className="w-full lg:w-1/2 my-4">
            <h2 className="text-4xl max-md:text-2xl font-bold text-[#1A1A1A] mb-6 ">
              Payment
            </h2>
            <div className="border-l-8 border-blue-500 bg-gray-50 p-2 rounded ">
              <p className="text-gray-700 text-sm flex items-center justify-center">
                <span className="mr-2">
                  <IoInformationCircleOutline className="w-6 h-6 text-blue-500" />
                </span>
                <span className="text-[#808080] font-normal ">
                  You must first add a full billing address before you can add
                  saved cards.{" "}
                  <Link href="/customer/address/" className="ml-1 hover:underline">
                    Add Billing Address
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cards;
