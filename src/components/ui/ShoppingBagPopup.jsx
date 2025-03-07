"use client"
import React, { useState, useEffect, useRef } from 'react';
import { IoIosClose } from "react-icons/io";
import { IoBagOutline, IoLogInOutline } from "react-icons/io5";
import { MdOutlineManageAccounts, MdIosShare } from "react-icons/md";

const ShoppingBagPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
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
    {
      id: 2,
      name: "Royal Earring xyz",
      image:
        "https://media.kumari.co/media/catalog/product/cache/163aeb3e622214d723a1a27f886c88da/r/f/rfas0070-yl-k.jpg",
      price: 47678,
      qty: 1,
      metal: "14k Gold",
      metalColor: "Yellow",
      quality: "SI / IJ",
      size: "R12",
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button onClick={togglePopup} className="flex items-center">
        <IoBagOutline className="text-xl cursor-pointer hover:text-gray-600" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-end z-50 text-black">
          <div
            ref={popupRef}
            className="w-full max-w-[640px] md:w-1/3 bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-2xl m-0 md:mx-4 md:my-6 relative flex flex-col h-full md:h-auto transform transition-all duration-300 overflow-y-auto"
          >
            <button
              onClick={togglePopup}
              className="absolute top-6 right-4 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black focus:outline-none"
            >
              <IoIosClose className="w-5 h-5" />
            </button>

            <div className="flex flex-col min-h-0">
              <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-4">Your Shopping Bag</h2>

              <div className="flex items-center justify-between border-b my-4 py-2">
                <p className="text-[#404040]">{cartItems.length} items</p>
                <div className="flex gap-1 max-sm:gap-3 text-center items-center text-sm ">
                  <IoBagOutline className="w-4 h-4 md:w-5 md:h-5" />
                  <p>View Bag</p>
                  <div className="border-l-2 h-4 border-[#D6D6D6]"></div>
                  <MdIosShare className="w-4 h-4 md:w-5 md:h-5" />
                  <p>Share Bag</p>
                </div>
              </div>

              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b max-sm:py-4">
                    <div className="flex items-center w-3/4">
                      <div className="w-1/3">
                        <picture>
                          <img
                            className="object-cover w-full h-auto rounded"
                            src={item.image}
                            alt={item.name}
                          />
                        </picture>
                      </div>
                      <div className="pl-3 md:pl-4 flex flex-col">
                        <p className="text-[#1D1D1F] text-sm">{item.name}</p>
                        <p className="text-xs md:text-sm">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <div className="w-1/4 text-right">
                      <p className="font-semibold text-sm">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-semibold">Total</span>
                  <p className="font-semibold">₹{cartItems.reduce((total, item) => total + item.price * item.qty, 0)}</p>
                </div>

                <p className="text-xs md:text-sm mt-2 text-[#808080]">
                  Your shopping bag is eligible for Cash on Delivery. You can choose it during checkout.
                </p>

                <button className="mt-4 w-full bg-black text-white py-2 md:py-3 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-sm md:text-base">
                  Proceed to Checkout
                </button>

                <div className="my-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <IoLogInOutline className="w-4 h-4 md:w-5 md:h-5" />
                    <p className="text-sm md:text-md">Sign In</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MdOutlineManageAccounts className="w-4 h-4 md:w-5 md:h-5" />
                    <p className="text-sm md:text-md">Create an Account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingBagPopup;
