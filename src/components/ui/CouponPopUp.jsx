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
    // Extract the numeric part from the coupon code
    const match = couponCode.match(/\d+/);
    if (match) {
      const discountPercent = parseFloat(match[0]);
      // Pass both the code and discount percentage back
      onApplyCoupon({ code: couponCode, discountPercent });
    }
    setCouponCode(""); // clear the input field
    togglePopup(); // close the popup
  };

  return (
    <>
      <button onClick={togglePopup} className="px-1  rounded text-sm">
        Apply
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex  justify-center bg-black bg-opacity-90 overlay items-center" // Change to items-start
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white rounded-xl w-11/12 sm:w-3/4 md:w-1/2 lg:p-5 p-3 ">
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-xl sm:text-2xl text-[#1D1D1F]">
                Apply Coupon
              </h2>
              <button onClick={togglePopup}>
                <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
              </button>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit(e);
                }}
                className="flex justify-between sm:flex-row items-center gap-4"
              >
                <input
                  type="text"
                  id="coupon"
                  name="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="relative w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white rounded hover:opacity-85 transition duration-200"
                >
                  Apply
                </button>
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
