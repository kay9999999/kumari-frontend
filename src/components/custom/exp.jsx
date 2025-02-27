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

const ScrollableContainer = styled.div`
  max-height: 120vh;
  overflow-y: auto;
  position: absolute;
  top: 0%;
  bottom: 0%;
  background: white;

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

  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

const SharingBag = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    let scrollY = 0;
    if (isOpen) {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, top ? parseInt(top) * -1 : 0);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      togglePopup();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20"
          onClick={handleOverlayClick}
        >
          <OuterContainer>
            <ScrollableContainer>
              <div className="flex justify-between items-center bg-white py-2 px-3 sticky top-0 z-10">
                <h2 className="md:text-xl text-[#1D1D1F]">
                  Choose Sharing Option
                </h2>
                <button onClick={togglePopup}>
                  <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
                </button>
              </div>

              <div className="text-center mt-4">
                <h2>Email</h2>
                <form className="space-y-6 p-6">
                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder=" "
                      required
                      className="peer block w-full py-4 px-2 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                       peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                       peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                       peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm peer-focus:-mt-0.5 peer-valid:-mt-0.5"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative mb-6">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder=" "
                      required
                      className="peer block w-full py-4 px-2 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                       peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                       peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                       peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm peer-focus:-mt-0.5 peer-valid:-mt-0.5"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative mb-6">
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder=" "
                      required
                      className="peer border rounded w-full pt-5 px-2 text-gray-700 leading-tight focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                       peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                       peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                       peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm peer-focus:-mt-0.5 peer-valid:-mt-0.5"
                    >
                      Your Message
                    </label>
                  </div>
                </form>
              </div>

              <div className="flex flex-col gap-4 justify-between mt-4 p-4">
                <button className="bg-black text-white px-4 py-4 font-bold rounded hover:opacity-85 transition duration-200">
                  Share Bag
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

export default SharingBag;
