import React, { useState, useRef, useEffect } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { TiLocationArrowOutline } from "react-icons/ti";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import { BsTruck } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5";

const pincodeData = {
  "400001": {
    fastDelivery: "1388 designs, ready to ship next business day.",
    cashOnDelivery: "1151 designs available.",
    nearbyStores: "2 nearby Kumari Fine Jewellery Stores found.",
  },
  "400002": {
    fastDelivery: "1200 designs, ready to ship next business day.",
    cashOnDelivery: "1000 designs available. which can be purchased with cash on delivery",
    nearbyStores: "1 nearby Kumari Fine Jewellery Store found.",
  },
};

const LocationPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [content, setContent] = useState(null);
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const iconRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPopupOpen) {
      setPincode("");
      setIsInputExpanded(true);
      setContent(null);
    }
  };


  const handleApplyClick = () => {
    if (pincodeData[pincode]) {
      setContent(pincodeData[pincode]);
      setIsInputExpanded(false); 
    } else {
      alert("Invalid pincode");
    }
  };

  
  useEffect(() => {
    if (isPopupOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isPopupOpen]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

 
  return (
    <div className="relative">
      <TfiLocationPin
        ref={iconRef}
        className="block text-gray-700 text-2xl hover:text-gray-600 cursor-pointer"
        title="Location"
        onClick={togglePopup}
      />

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
         
         <div className={`bg-white p-8 rounded-xl w-full max-w-xl relative transform ${content && isPopupOpen ? "-translate-y-2" : "-translate-y-24"} max-h-[90vh] overflow-y-auto`}>

           {/* Close Button */}
            <button
              className="absolute top-5 right-3 text-white hover:text-gray-200 bg-gray-600 rounded-full hover:bg-black focus:outline-none"
              onClick={togglePopup}
            >
              <IoIosClose className="w-5 h-5" />
            </button>

            <h2 className="text-[#1a1a1a] text-4xl font-semibold m-0 tracking-[-0.05em] text-center mb-2">
              Choose your location
            </h2>
            <p className="text-black text-center text-base my-4">
              To know more about Fast Delivery, availability of Cash on Delivery and Stores near you.
            </p>

            {/* Collapsible Input Section */}
            <div className="mb-4">
              <div
                className="flex justify-center gap-1 items-center cursor-pointer p-2 rounded-lg"
                onClick={() => setIsInputExpanded(!isInputExpanded)}
              >
                <span className="text-black font-semibold text-base">
                  {content ? `Delivers to: ${pincode}` : "Enter a Zip Code to get delivery options"}
                </span>
                {isInputExpanded ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </div>

              {isInputExpanded && (
                <div className="relative w-72 h-14 mx-auto flex items-center border                 border-gray-300 rounded-lg focus-within:border-pink-500 focus-within:ring focus-within:ring-pink-300 mt-2">
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    placeholder=" "
                    className="w-full p-4 pt-6 outline-none bg-transparent rounded placeholder-transparent peer"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <label
                    htmlFor="zipcode"
                    className="absolute left-4 transform -translate-y-3/4 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-4 peer-focus:text-sm peer-focus:text-pink-500"
                  >
                    Zip Code
                  </label>
                  <button className="absolute right-3" onClick={handleApplyClick}>
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center my-4">
              <span className="border-t border-gray-300 w-1/4"></span>
              <span className="text-gray-600 text-sm mx-2">OR</span>
              <span className="border-t border-gray-300 w-1/4"></span>
            </div>
            <button
              className="flex items-center mx-auto text-base hover:underline"
              onClick={handleLocationClick}
            >
              <TiLocationArrowOutline className="w-6 h-6 text-[#404040]" /> Use my current location
            </button>

            {/* Delivery options after applying Pincode */}
            {content && (
              <div className="mt-6 w-full">
                <div className="container p-4">
                  {/* Fast Delivery Section */}
                  <div className="p-4 mb-2 hover:bg-[#f5f5f5] cursor-pointer">
                    <Link href="/all-jewelry?filter=ready-to-ship">
                        <div className="flex items-start mb-2 space-x-2">
                        <BsTruck className="text-2xl mt-1" />
                        <div className="flex-1 text-base">
                            <h2 className="font-semibold">Fast Delivery</h2>
                            <p className="text-sm">
                            {content.fastDelivery}
                            </p>
                            <span className="text-sm">
                            See Ready to Ship Designs →
                            </span>
                        </div>
                        </div>
                    </Link>
                  </div>

                  {/* Cash on Delivery Section */}
                  <div className="p-4 mb-2 hover:bg-[#f5f5f5] cursor-pointer">
                    <div className="flex items-start mb-2 space-x-2">
                      <AiOutlineDollar className="text-2xl mt-1" />
                      <div className="flex-1 text-base">
                        <h2 className="font-semibold">Cash on Delivery</h2>
                        <p className="text-sm">
                          {content.cashOnDelivery}
                        </p>
                        <span className="text-sm">
                          See Cash on Delivery Designs →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nearby Stores Section */}
                  <div className="p-4 mb-2 hover:bg-[#f0f0f0] cursor-pointer">
                    <div className="flex items-start mb-2 space-x-2">
                      <IoStorefrontOutline className="text-2xl mt-1" />
                      <div className="flex-1 text-base">
                        <h2 className="font-semibold">
                          Nearby Kumari Fine Jewellery Stores
                        </h2>
                        <p className="text-sm">
                          {content.nearbyStores}
                        </p>
                        <span className="text-sm">
                          Locate All Nearby Stores →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPopup;
