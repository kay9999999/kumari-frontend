import { useState, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import styled, { createGlobalStyle } from 'styled-components';
import { CiMail } from "react-icons/ci";

// scrollbar styles for Webkit browsers
const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// Styled component for popup 
const PopupContainer = styled.div`
  background: white;
  border-radius: 0.75rem; 
  width: 75%; 
  max-height: 90vh;
  position: absolute;
  top: 2%;
  bottom: 2%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) { /* md: breakpoint */
    width: 50%; /* md:w-1/2 */
  }
`;

//  scrollable content
const ScrollableContent = styled.div`
  flex: 1;  
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #888 #f1f1f1; /* Firefox */
`;

// Styled component for the header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem; 
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #e5e7eb; 
`;

const GiftMessagePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      togglePopup();
    }
  };

  // Disable bg scrolling 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <GlobalStyle />
      <button onClick={togglePopup} className="px-1 py-2 rounded">
        Add
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 overlay"
          onClick={handleOverlayClick}
        >
          <PopupContainer>
            {/* Header */}
            <Header>
              <h2 className="lg:text-3xl font-semibold md:text-2xl sm:text-lg">Personalize your gift message</h2>
              <button onClick={togglePopup}>
                <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
              </button>
            </Header>

            {/* Image */}
            <ScrollableContent>
            
              <img src="/images/checkout/gift-box.jpg" alt="Gift" className="my-4 w-full h-auto" />

              {/* Form */}
              <form className="space-y-4 p-4">
                <div className="mb-6 relative">
                  <input
                    type="email"
                    id="mail"
                    name="mail"
                    placeholder=""
                    className="block w-full p-4 border outline-none rounded-lg focus:border-pink-600 focus:ring-4 focus:ring-pink-600 placeholder-transparent"
                  />
                  <label htmlFor="Name" className="absolute left-4 -top-1 text-gray-500">
                    From Email
                  </label>
                  <label htmlFor="mail" className="absolute right-2 top-4 text-gray-500 text-center">
                     <CiMail className=" w-6 h-6  text-gray-500"/>
                  </label>
                </div>

                <div className="mb-6 relative">
                  <input
                    type="email"
                    id="mail"
                    name="mail"
                    placeholder=""
                    className="block w-full p-4 outline-none border rounded-lg focus:border-pink-500 focus:ring-4 focus:ring-pink-600 placeholder-transparent"
                  />
                  <label htmlFor="Name" className="absolute left-4 -top-1 text-gray-500">
                    To Email
                  </label>
                  <label htmlFor="mail" className="absolute right-2 top-4 text-gray-500 text-center">
                     <CiMail className=" w-6 h-6  text-gray-500"/>
                  </label>
                </div>

                <div className="mb-6 relative">
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Your Message"
                    className="border rounded w-full py-2 px-3 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-600 "
                  />
                  <label htmlFor="message" className="absolute left-2 top-3.5 text-gray-500 hidden">
                    {/* Your Message */}
                  </label>
                </div>
              </form>

              {/* Buttons */}
              <div className="flex flex-col gap-4 justify-between mt-4 p-4">
                <button className="bg-black text-white px-4 py-4 font-bold rounded">Save Message</button>
                <button onClick={togglePopup} className="font-semibold">Cancel</button>
              </div>
            </ScrollableContent>
          </PopupContainer>
        </div>
      )}
    </>
  );
};

export default GiftMessagePopup;
