import { useState, useEffect } from "react";
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
  width: 100%;
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
  const [activeForm, setActiveForm] = useState("email");

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    let scrollY = 0;
    if (activeForm) {
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
  }, [activeForm]);

  const [formData, setFormData] = useState({
    emailName: "",
    email: "",
    emailMessage: "",
    urlName: "",
    urlEmail: "",
    whatsappName: "",
    whatsappEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderForm = () => {
    switch (activeForm) {
      case "email":
        return (
          <form className="space-y-4 p-4 sm:p-6">
            <div className="mb-6 relative">
              <input
                type="text"
                id="emailName"
                name="emailName"
                value={formData.emailName}
                onChange={handleInputChange}
                placeholder=" "
                className="peer block w-full py-4 px-2 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 placeholder-transparent"
                required
              />
              <label
                htmlFor="emailName"
                className={`absolute left-2 text-gray-500 transition-all duration-300 ${
                  formData.emailName
                    ? "top-0 left-2 text-sm -mt-0.5"
                    : "top-4 left-4 text-base"
                }`}
              >
                Name
              </label>
            </div>
            <div className="mb-6 relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=" "
                className="peer block w-full py-4 px-2 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 placeholder-transparent"
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-2 text-gray-500 transition-all duration-300 ${
                  formData.email
                    ? "top-0 left-2 text-sm -mt-0.5"
                    : "top-4 left-4 text-base"
                }`}
              >
                Email
              </label>
            </div>
            <div className="mb-6 relative">
              <textarea
                id="emailMessage"
                name="emailMessage"
                value={formData.emailMessage}
                onChange={handleInputChange}
                rows="5"
                placeholder=" "
                className="peer border rounded w-full pt-5 px-2 text-gray-700 leading-tight focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                required
              />
              <label
                htmlFor="emailmessage"
                className={`absolute left-2 text-gray-500 transition-all duration-300 ${
                  formData.emailMessage
                    ? "top-0 left-2 text-sm -mt-0.5"
                    : "top-4 left-4 text-base"
                }`}
              >
                Your Message
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-3 rounded hover:opacity-85 transition duration-200"
            >
              Share via Email
            </button>
          </form>
        );
      case "url":
        return (
          <form className="space-y-4 p-4 sm:p-6">
            <div className="mb-6 relative">
              <input
                type="text"
                id="urlName"
                name="urlName"
                value={formData.urlName}
                onChange={handleInputChange}
                placeholder=" "
                className="peer block w-full py-4 px-2 outline-none border rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 placeholder-transparent"
                required
              />
              <label
                htmlFor="urlName"
                className={`absolute left-2 text-gray-500 transition-all duration-300 ${
                  formData.urlName
                    ? "top-0 left-2 text-sm -mt-0.5"
                    : "top-4 left-4 text-base"
                }`}
              >
                Name
              </label>
            </div>
            <div className="mb-6 relative">
              <input
                type="email"
                id="urlEmail"
                name="urlEmail"
                value={formData.urlEmail}
                onChange={handleInputChange}
                placeholder=" "
                className="peer block w-full py-4 px-2 outline-none border rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 placeholder-transparent"
                required
              />
              <label
                htmlFor="urlEmail"
                className={`absolute left-2 text-gray-500 transition-all duration-300 ${
                  formData.urlEmail
                    ? "top-0 left-2 text-sm -mt-0.5"
                    : "top-4 left-4 text-base"
                }`}
              >
                Email
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-3 rounded hover:opacity-85 transition duration-200"
            >
              Share via URL
            </button>
          </form>
        );
      case "whatsapp":
        return (
          <form className="space-y-4 p-4 sm:p-6">
            <div className="mb-6 relative">
              <input
                type="text"
                id="whatsappName"
                name="whatsappName"
                value={formData.whatsappName}
                onChange={handleInputChange}
                placeholder=" "
                className="peer block w-full py-4 px-2 outline-none border rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 placeholder-transparent"
                required
              />
              <label
                htmlFor="whatsappName"
                className={`absolute left-2 text-gray-500 transition-all duration-300 ${
                  formData.whatsappName
                    ? "top-0 left-2 text-sm -mt-0.5"
                    : "top-4 left-4 text-base"
                }`}
              >
                Name
              </label>
            </div>
            <div className="mb-6 relative">
              <input
                type="email"
                id="whatsappEmail"
                name="whatsappEmail"
                value={formData.whatsappEmail}
                onChange={handleInputChange}
                placeholder=" "
                className="peer block w-full py-4 px-2 outline-none border rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 placeholder-transparent"
                required
              />
              <label
                htmlFor="whatsappEmail"
                className={`absolute left-2 text-gray-500 transition-all duration-300 ${
                  formData.whatsappEmail
                    ? "top-0 left-2 text-sm -mt-0.5"
                    : "top-4 left-4 text-base"
                }`}
              >
                Email
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-3 rounded hover:opacity-85 transition duration-200"
            >
              Share via WhatsApp
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20"
        onClick={handleOverlayClick}
      >
        <OuterContainer>
          <ScrollableContainer>
            <div className="flex justify-between items-center bg-white py-2 px-3 sticky top-0 z-10 border-b">
              <h2 className="text-lg sm:text-xl text-[#1D1D1F]">
                Choose Sharing Option
              </h2>
              <button onClick={onClose}>
                <IoIosClose className="bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none" />
              </button>
            </div>

            <div className="flex justify-around border-b p-2 mt-4">
              <button
                onClick={() => setActiveForm("email")}
                className={`flex-1 text-center py-2 text-sm sm:text-base ${
                  activeForm === "email"
                    ? "font-bold border-b-2 border-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setActiveForm("url")}
                className={`flex-1 text-center py-2 text-sm sm:text-base ${
                  activeForm === "url"
                    ? "font-bold border-b-2 border-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                URL
              </button>
              <button
                onClick={() => setActiveForm("whatsapp")}
                className={`flex-1 text-center py-2 text-sm sm:text-base ${
                  activeForm === "whatsapp"
                    ? "font-bold border-b-2 border-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                WhatsApp
              </button>
            </div>

            {/* Form Section */}
            {renderForm()}
          </ScrollableContainer>
        </OuterContainer>
      </div>
    </div>
  );
};

export default SharingBag;
