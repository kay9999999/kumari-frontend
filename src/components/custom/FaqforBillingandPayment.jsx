"use client";
import { useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";

const FAQs = () => {
  
 const [openItems, setOpenItems] = useState({});
 const [isFaqListOpen, setIsFaqListOpen] = useState(false);

  
  const faqs = [
    {
      question: "What is the mode of payments you offer?",
      answer: "We offer multiple payment modes to make your shopping experience convenient. For orders within India, we accept payments in Indian Currency (INR) only, including CGST/SGST/UTGST and IGST as applicable. You can make payments through the RazorPay gateway using your RazorPay account or by using your credit/debit cards. It's quick and secure!",
    },
    {
      question: "Are my online transactions safe on your website?",
      answer: "We at Kumari always make sure to consider the security and safety of our customers. We are equipped with a lot of technological protections, which are in place so that all the transaction processes are safe and the information of customers are also secured. As a part of the advanced security options, we do not accept financial information on servers. All the information that is entered by you is usually received directly through the payment gateway and then it is transmitted to your respective bank’s servers. All of this is done through the RazorPay gateway either by your RazorPay account or by using debit/credit cards.",
    },
    {
      question: "Are there any undisclosed expenses?",
      answer: "Rest assured, there are absolutely no undisclosed expenses hiding in the shadows. We take pride in our commitment to transparency, making sure everything we offer to our valued clients is clearly laid out on our website. Your peace of mind is our top priority!",
    },
    {
      question: "Is cash on delivery an option? / Is cash on delivery possible in my area or zip code?",
      answer: "As per RBI standards, we'll accept cash on delivery for orders under Rs. 49,999. If you'd like to return your purchase, we'll request your account details in whose name the billing were done to process a refund directly to your bank account.",
    },
    {
      question: "Are prices on Kumari subject to change?",
      answer: "Not quite! You see, our prices can be a bit like the weather – they tend to sway with the market's mood swings, especially when it comes to gold and precious stones. So, while we do our best to keep things steady, you might occasionally see a shift in prices to keep up with the ever-changing market trends. But don't worry, we're always here to offer you the best value for your precious purchases!",
    },
    {
      question: "Do you accept payments made with foreign debit/credit cards?",
      answer: "We gladly accept payments made with foreign debit and credit cards. Please note that the payment amount will be required to be made in Indian rupees (INR). Our system will handle the currency conversion accordingly, and conversion charges may apply. Rest assured, we strive to make the payment process as seamless as possible for our international customers. If you have any further questions or need assistance, feel free to reach out to us.",
    },
    {
      question: "Will you send me an order confirmation?",
      answer: "Absolutely! We've got you covered. As soon as you place your order, we'll swing into action and send you an order confirmation through both email and SMS. You'll have all the details you need right at your fingertips!",
    },
    {
      question: "Can I receive another copy of my invoice if I misplace or lose it?",
      answer: "You certainly can. We will email you an e-copy of your invoice so you may access and download it.",
    },
  ];


  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const toggleFaqList = () => {
    setIsFaqListOpen((prev) => !prev);
    if (isFaqListOpen) {
      setOpenItems({});
    }
  };

  return (
    <div className="p-6 my-6 w-full">
      {/* Header */}
      <div
        className="flex justify-between items-center mb-6 cursor-pointer"
        onClick={toggleFaqList}
      >
        <h2 className="text-4xl font-bold text-[#000000]">FAQs for Billing & Payment</h2>
        {isFaqListOpen ? (
          <IoIosClose  className="w-12 h-12 text-gray-500" />
        ) : (
          <IoIosAdd className="w-12 h-12 text-gray-500" />
        )}
      </div>

      {/* FAQ Collapsible */}
      {isFaqListOpen && (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              {/* Question */}
              <div
                className="flex justify-between items-center py-3 font-bold text-gray-500 cursor-pointer"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-base text-[#404040] hover:text-black ">{faq.question}</h3>
                {openItems[index] ? (
                  <IoIosClose className="w-6 h-6 text-gray-600" />
                ) : (
                  <IoIosAdd className="w-6 h-6 text-gray-600" />
                )}
              </div>

              {/* Answer */}
              {openItems[index] && (
                <div className="pb-3 text-sm text-[#4D4D4D]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQs;
