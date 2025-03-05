import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const CouponPopUp = ({ onApplyCoupon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    let scrollY = 0;
    if (isOpen) {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // When modal closes, restore the body's position and scroll
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // top is in the format "-123px", so we multiply by -1 to get back the scroll position
      window.scrollTo(0, top ? parseInt(top) * -1 : 0);
    }
    return () => {
      // Clean up styles in case component unmounts while modal is open
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      togglePopup();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof onApplyCoupon !== "function") {
      console.error("onApplyCoupon is not a function");
      return;
    }

    // Extract the numeric part from the coupon code
    const match = couponCode.match(/\d+/);
    if (match) {
      const discountPercent = parseFloat(match[0]);
      // Pass both the code and discount percentage back

      onApplyCoupon({ code: couponCode, discountPercent });
    }
    setCouponCode("");
    togglePopup();
  };

  return (
    <>
      <button onClick={togglePopup} className="px-1  rounded text-sm">
        Apply
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-80 backdrop-blur z-[1000] transition-opacity duration-300 ease-in-out"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white rounded-xl w-[75%] lg:w-[50%] sm:w-[60%] lg:p-6 max-sm:p-4 max-md:p-4 md:p-4 transform transition-transform duration-300 ease-in-out scale-100 -translate-y-40">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl sm:text-2xl text-[#1D1D1F]">
                Apply Coupon
              </h2>
              <button onClick={togglePopup}>
                <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
              </button>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              <form onSubmit={handleSubmit} className="relative w-full">
                <div className="relative">
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="w-full p-4 pr-20 border rounded-lg outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1  rounded hover:bg-black hover:text-white"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center mt-8">
              <span className="text-[#404040] text-center sm:text-left">
                {couponCode.trim().length > 0
                  ? " Applying Coupon..."
                  : "No Coupon Code Applied!"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CouponPopUp;
