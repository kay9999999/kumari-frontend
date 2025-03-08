import React, { useState, useEffect, useRef } from 'react';
import { IoIosClose } from "react-icons/io";
import Link from 'next/link';
import { SlHeart } from "react-icons/sl";
import { IoLogInOutline } from "react-icons/io5";


const WishlistPopup = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); 
  const popupRef = useRef(null);


  const togglePopup = () => {
    setIsOpen(!isOpen);
  };


  // const [cartItems, setCartItems] = useState([
  //   // empty state for testing
  // ]);

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

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

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
        <SlHeart className="text-xl cursor-pointer hover:text-gray-600" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-end z-50 text-black">
          <div
            ref={popupRef}
            className="w-1/3 bg-white shadow-lg p-4 rounded-xl mx-4 my-6 relative"
          >
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black focus:outline-none"
            >
              <IoIosClose />
            </button>

            <div className="flex flex-col min-h-0">
              {cartItems.length === 0 ? (
                <div className="py-8 border-b">
                  <p className="text-[#1D1D1F] text-sm md:text-base mb-2 font-semibold">
                    Welcome to your saved items
                  </p>
                  <p className="text-[#808080] text-xs md:text-sm">
                    View saved favourites.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-4">Your Wishlist</h2>
                  <div className="flex items-center justify-between my-4 py-2">
                    <p className="text-[#404040]">{cartItems.length} Saved items</p>
                    <div className="flex gap-1 max-sm:gap-3 text-center items-center text-sm">
                      <p>View All</p>
                    </div>
                  </div>

                  <div>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-t max-sm:py-4">
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
                          <div className="pl-3 flex flex-col">
                            <p className="text-[#1D1D1F] text-sm">{item.name}</p>
                          </div>
                        </div>
                        <div className="w-1/4 text-right">
                          <p className="font-semibold text-sm">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

            
              {!isSignedIn && (
                <div className="my-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Link href="/customer/account/login/" className="flex items-center space-x-2">
                      <IoLogInOutline className="w-4 h-4 md:w-5 md:h-5" />
                      <p className="text-sm md:text-md">Sign In</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPopup;
