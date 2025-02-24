import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { CiMail } from "react-icons/ci";
import { RiErrorWarningLine } from "react-icons/ri";
import ReCAPTCHA from 'react-google-recaptcha';

const HintPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    username: '',
    email: '',
    subscribe: false,
    sendcopy: false,
  });

  const [captchaValue, setCaptchaValue] = useState(null); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert('Please complete the reCAPTCHA');
      return;
    }
    // Handle form submission logic here
    console.log(formData);
    onClose(); // Close popup after submission
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center relative md:w-3/4 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black focus:outline-none"
        >
          <IoIosClose />
        </button>

        <h2 className="text-3xl font-bold my-6 text-black">Drop a Hint</h2>
        
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img src="/images/product/rfas0070-yl-k.webp" alt="Hint" className="w-full h-auto rounded" />
            <h1 className='text-3xl'>
              Dear {formData.recipientName ? formData.recipientName : '____'}, <br/ >A little hint that this caught<br/ > {formData.username ? formData.username : '____'}'s eye.<br/ >Love, Your friends at Kumari Fine<br/ >Jewellery.
            </h1>
          </div>

          {/* Right Side: Form */}
          <div className="md:w-1/2 p-4">
            <form onSubmit={handleSubmit}>
                {/* Recepient Name */}
              <div className="mb-6 relative">
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder=""
                  className="block w-full p-4 border rounded-lg focus:border-pink-400 focus:ring focus:ring-pink-500 placeholder-transparent"
                  required
                />
                <label htmlFor="recipientName" className="absolute left-4 top-0 text-gray-500">
                  Recipient Name
                </label>
              </div>

              {/* Recepient Email */}
              <div className="mb-6 relative">
                <input
                    type="email"
                    id="recipientEmail"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    placeholder=""
                    className={`block w-full p-4 pr-10 border rounded-lg 
                    ${formData.recipientEmail && !/\S+@\S+\.\S+/.test(formData.recipientEmail) ? 'border-red-500 bg-red-100' : 'focus:border-pink-600 focus:ring focus:ring-pink-500'}`}
                />
                <label 
                    htmlFor="recipientEmail" 
                    className={`absolute left-4 top-0 
                    ${formData.recipientEmail && !/\S+@\S+\.\S+/.test(formData.recipientEmail) ? 'text-red-500' : 'text-gray-500'}`}
                >
                    Recipient Email
                </label>
                
                <CiMail className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 ${formData.recipientEmail && !/\S+@\S+\.\S+/.test(formData.recipientEmail) ? 'text-red-500' : 'text-gray-500'}`} />
                {formData.recipientEmail && !/\S+@\S+\.\S+/.test(formData.recipientEmail) && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <RiErrorWarningLine />Please enter a valid email address (Ex: johndoe@domain.com).
                    </p>
                )}
              </div>

              {/* Your Name */}
              <div className="mb-6 relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder=""
                  className="block w-full p-4 border rounded-lg focus:border-pink-400 focus:ring focus:ring-pink-500 placeholder-transparent"
                  required
                />
                <label htmlFor="username" className="absolute left-4 top-0 text-gray-500">
                  Your Name
                </label>
              </div>

              {/* Your Email */}
              <div className="mb-6 relative">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    className={`block w-full p-4 pr-10 border rounded-lg 
                    ${formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'border-red-500 bg-red-100' : 'focus:border-pink-400 focus:ring focus:ring-pink-500'}`}
                    required
                />
                <label 
                    htmlFor="email" 
                    className={`absolute left-4 top-0 
                    ${formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'text-red-500' : 'text-gray-500'}`}
                >
                    Your Email
                </label>
                <CiMail className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 ${formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'text-red-500' : 'text-gray-500'}`} />
                {formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                     <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                     <RiErrorWarningLine />Please enter a valid email address (Ex: johndoe@domain.com).
                     </p>
                )}
              </div>

              {/*Drop a Hint Mail */}
                <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    id="sendcopy"
                    name="sendcopy"
                    checked={formData.sendcopy}
                    onChange={handleChange}
                    className="mr-2 w-4 h-4 leading-tight text-pink-500 focus:ring-pink-500 transition duration-200 ease-in-out"
                />
                <label htmlFor="sendcopy" className="text-gray-700 text-sm">
                    Send me a copy of the "Drop a Hint" email.
                </label>
                </div>

              {/* Subscribe Newsletter */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4 leading-tight  text-pink-500 focus:ring-pink-500  transition duration-200 ease-in-out"
                />
                <label htmlFor="subscribe" className="text-gray-700 text-sm">
                  Subscribe to our Newsletter updates.
                </label>
              </div>

              {/* reCAPTCHA */}
              <div className="mb-6">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71tXfl7Vt9t6M6wLXz" // THIS IS A DEMO SITE KEY/ You can enter your Site Key here
                  onChange={onCaptchaChange}
                />
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintPopup;
