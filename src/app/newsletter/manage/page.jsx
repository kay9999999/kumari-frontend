import Link from 'next/link';
import React from 'react';
import { PiLessThan } from "react-icons/pi";


const NewsletterSubscription = () => {
  return (
    <section className="my-24">
    
      <div id="header" className="w-full bg-white h-10">
        <div className="max-w-5xl mx-auto px-4 pb-1 flex justify-between items-center  h-full">
          <span className="whitespace-nowrap ">Hi, Username.</span>
          <Link href="/customer/account/" className="hover:underline flex items-center gap-1 whitespace-nowrap">
            <PiLessThan className="h-3 w-4" />
            <span className="text-sm">Go to Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="inset-x-0 bottom-0 border-b"></div>

      <div className="max-w-5xl mx-auto px-4 py-2 min-h-screen">
        <div className="w-full md:w-1/2 lg:w-2/5 space-y-6 mt-10 border-b ">
            <h1 className="text-4xl text-[#1A1A1A] font-bold whitespace-nowrap">Newsletter Subscription</h1>
            
            <div className="">
            <label className="block text-xl font-medium text-[#4D4D4D] mb-4">
                Subscription option
            </label>
            <div className="flex items-center pb-6 border-b">
                <input
                type="checkbox"
                id="general"
                name="subscription"
                value="general"
                className="w-4 h-4 border-2 border-pink-500 rounded focus:ring-pink-500 checked:bg-pink-500 checked:border-pink-500 appearance-none relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0 checked:after:-top-1 checked:after:text-white checked:after:text-sm"
                />
                <label htmlFor="general" className="ml-2 text-sm text-[#4D4D4D]">
                General Subscription
                </label>
            </div>
            </div>

            <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-sm hover:bg-gray-800 transition-colors"
            >
            Save Changes
            </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
