import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";

const OuterContainer = styled.div`
  position: absolute;
  top: 14%;
  bottom: 2%;
  width: 75%;
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
  @media (min-width: 640px) {
    width: 60%;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

// Define a styled container that includes your scrollbar styles
const ScrollableContainer = styled.div`
  max-height: 120vh;
  overflow-y: auto;
  position: absolute;
  top: 0%;
  bottom: 0%;
  background: white;

  /* Scrollbar styles for WebKit browsers */
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Firefox scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

const GiftMessage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Disable background scrolling when modal is open
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

  const togglePopup = () => setIsOpen(!isOpen);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      togglePopup();
    }
  };

  return (
    <>
      <button onClick={togglePopup} className="px-1 py-2 rounded text-sm">
        Add
      </button>

      {isOpen && (
        <div
          className=" overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20"
          onClick={handleOverlayClick}
        >
          <OuterContainer>
            <ScrollableContainer>
              {/* Header */}
              <div className="flex justify-between items-center bg-white py-2 px-3 sticky top-0 z-10">
                <h2 className="md:text-xl text-[#1D1D1F]">
                  Personalize your gift message
                </h2>
                <button onClick={togglePopup}>
                  <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
                </button>
              </div>

              {/* Image Section */}
              <img
                src="/images/gift-box.jpg"
                alt="Gift"
                className="my-0 w-full h-auto"
              />

              {/* Form Section */}
              <form className="space-y-4 p-4">
                <div className="mb-6 relative">
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    placeholder=""
                    className="block w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300 placeholder-transparent"
                  />
                  <label
                    htmlFor="Name"
                    className="absolute left-4 -top-1 text-gray-500"
                  >
                    Name
                  </label>
                </div>

                <div className="mb-6 relative">
                  <input
                    type="mail"
                    id="mail"
                    name="mail"
                    placeholder=""
                    className="block w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300 placeholder-transparent"
                  />
                  <label
                    htmlFor="mail"
                    className="absolute left-4 -top-1 text-gray-500"
                  >
                    Email
                  </label>
                </div>

                <div className="mb-6 relative">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Your Message"
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-2 top-3.5 text-gray-500"
                  >
                    {/* Your Message */}
                  </label>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 justify-between mt-4 p-4">
                <button className="bg-black text-white px-4 py-4 font-bold rounded">
                  Save Message
                </button>
                <button onClick={togglePopup} className="text-sm font-semibold">
                  Cancel
                </button>
              </div>
            </ScrollableContainer>
          </OuterContainer>
        </div>
      )}
    </>
  );
};

export default GiftMessage;
