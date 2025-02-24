import React from "react";
import {
  FaWhatsapp,
  FaPinterestP,
  FaFacebook,
  FaTwitter,
  FaFacebookMessenger,
  FaGetPocket,
} from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const SharePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 ">
      <div className="bg-white p-4 rounded shadow-lg text-center relative w-11/12 md:w-1/3 ">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black focus:outline-none"
        >
          <IoIosClose />
        </button>

        <div className="text-left mx-auto flex flex-col w-3/4 max-md:w-full p-4">
          <h2 className="text-3xl md:text-4xl font-semibold py-10 text-black text-center">
            Share
          </h2>
          <div className="flex items-center mb-4 bg-blue-700 text-white font-semibold py-3 px-4 rounded">
            <FaFacebook className="mr-2" />
            <span>Share on Facebook</span>
          </div>
          <div className="flex items-center mb-4 bg-blue-400 text-white font-semibold py-3 px-4 rounded">
            <FaTwitter className="mr-2" />
            <span>Share on Twitter</span>
          </div>
          <div className="flex items-center mb-4 bg-blue-600 text-white font-semibold py-3 px-4 rounded">
            <FaFacebookMessenger className="mr-2" />
            <span>Share on Messenger</span>
          </div>
          <div className="flex items-center mb-4 bg-red-500 text-white font-semibold py-3 px-4 rounded">
            <FaPinterestP className="mr-2" />
            <span>Share on Pinterest</span>
          </div>
          <div className="flex items-center mb-4 bg-green-500 text-white font-semibold py-3 px-4 rounded">
            <FaWhatsapp className="mr-2" />
            <span>Share on Whatsapp</span>
          </div>
          <div className="flex items-center mb-4 bg-pink-600 text-white font-semibold py-3 px-4 rounded">
            <FaGetPocket className="mr-2" />
            <span>Share on Pocket</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
