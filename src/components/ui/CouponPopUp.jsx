import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const CouponPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      togglePopup();
    }
  };

  return (
    <>
      <button onClick={togglePopup} className="px-1 py-2 rounded text-sm">
        Apply
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-80 overlay" // Change to items-start
          onClick={handleOverlayClick}
        >
          <div className="relative bg-white rounded-xl w-11/12 sm:w-3/4 md:w-1/2 lg:p-10 md:p-4 mt-10">
            {" "}
            {/* Add mt-10 to push it down from the top */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl">Apply Coupon</h2>
              <button onClick={togglePopup}>
                <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <form className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  id="coupon"
                  name="coupon"
                  placeholder="Enter Coupon Code"
                  className="relative w-full border p-2 sm:p-3 rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-200"
                />
                <button
                  type="submit"
                  className="absolute right-10 w-full sm:w-auto px-4 py-2"
                >
                  Apply
                </button>
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

export default CouponPopUp;
