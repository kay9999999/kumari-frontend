"use client";
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const CouponPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState(""); 

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };


  // to close form 
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      togglePopup();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Coupon applied:", coupon);
    
  };

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);


  return (
    <>
      <button onClick={togglePopup} className="px-1 py-2 rounded">
        Apply
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur z-[1000] transition-opacity duration-300 ease-in-out "
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white rounded-xl lg:w-3/5 sm:w-3/4 lg:p-6 max-sm:p-4 max-md:p-4 md:p-4 transform transition-transform duration-300 ease-in-out scale-100 -translate-y-40">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl sm:text-2xl">Apply Coupon</h2>
              <button onClick={togglePopup}>
                <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSubmit} className="relative w-full ">
                <div className="relative">
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="w-full p-4 pr-20 border rounded-lg outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1  rounded hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </div>
              </form>
              <span className="text-gray-500 text-center sm:text-left">
                No Coupon codes available!
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CouponPopup;
