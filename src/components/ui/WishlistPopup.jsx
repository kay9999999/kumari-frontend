import React, { useState, useEffect, useRef } from 'react';
import { IoIosClose } from "react-icons/io";
import { CiHeart, CiLogin } from "react-icons/ci";

const WishlistPopup = () => {
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

  useEffect(() => {
    if (isOpen) {
     
      document.body.style.overflow = 'hidden';
     
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      
      document.body.style.overflow = 'unset';
    
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button onClick={togglePopup} className="flex items-center">
        <CiHeart className="w-6 h-6" />
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
            <h2 className="text-lg font-bold mb-4">Your Wishlist</h2>

        <div className='flex items-center justify-between border-b my-4 py-2'>
            <p>1 Saved items</p>
            <p>View all</p>
        </div>
        <div className='flex items-center justify-between my-4 py-2'>
            <p className="mb-4">Product image + Product Name</p>
            <p>Amount here</p>
        </div>
            <div className="flex items-center mt-auto space-x-2">
              <CiLogin className="w-5 h-5" />
              <p className="text-md">Sign In</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPopup;
