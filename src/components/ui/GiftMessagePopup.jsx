import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import './GiftMessagePopup.css';

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

  return (
    <>
      <button onClick={togglePopup} className="px-1 py-2 rounded">
        Add
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 overlay" 
          onClick={handleOverlayClick}
        >
          <div 
            className="bg-white rounded-xl w-3/4 md:w-1/2" 
            style={{ maxHeight: '120vh', overflowY: 'auto', position: 'absolute', top: '2%', bottom: '2%' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-white  p-4 sticky top-0 z-10">
              <h2 className="text-3xl font-normal">Personalize your gift message</h2>
              <button onClick={togglePopup}>
                <IoIosClose className='bg-gray-500 text-white rounded-full w-6 h-6 hover:bg-black focus:outline-none'/>
              </button>
            </div>

            {/* Image Section */}
            <img src="/images/checkout/gift-box.jpg" alt="Gift" className="my-4 w-full h-auto" />

            {/* Form Section */}
     <form className="space-y-4 p-4">
           <div className="mb-6 relative">
                <input
                type="text"
                id="Name"
                name="Name"
                placeholder=""
                className="block w-full p-4 border rounded-lg focus:border-pink-500 foucs:ring foucs:ring-ping-200
                    placeholder-transparent"
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
              className="block w-full p-4 border rounded-lg focus:border-pink-500 foucs:ring foucs:ring-ping-200
                 placeholder-transparent"
            />

            <label
              htmlFor="mail"
              className="absolute left-4 -top-1 text-gray-500"
            >
              Email
            </label>
          </div>

          <div className="mb-6 relative">
        <textarea id="message" name="message" rows="6" placeholder="Your Message" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"/>
        <label htmlFor="message" className="absolute left-2 top-3.5 text-gray-500"
        >
          {/* Your Message */}
          </label>
        </div>
        
     </form>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 justify-between mt-4 p-4">
              <button className="bg-black text-white px-4 py-4 font-bold rounded">Save Message</button>
              <button onClick={togglePopup} className="font-semibold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftMessagePopup;
