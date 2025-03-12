"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { PiLessThan } from "react-icons/pi";
import PhoneInput from '@/components/ui/CountryCodeDropdown';

const SmsUpdate = () => {
 
const [loading, setLoading] = useState(false);
const [phone, setPhone] = useState("");
const [countryCode, setCountryCode] = useState("+91");


 const handlePhoneChange = (value) => {
   setPhone(value);
 };

 const handleCountryCodeChange = (newCode) => {
   setCountryCode(newCode);
 };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);

   
  };

  return (
    <section className="mt-20 w-full ">
      <div className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center mt-2 h-full">
          <span className="whitespace-nowrap text-[#4D4D4D] text-base">Hi, Username.</span>
          <Link href="/customer/account" className="hover:underline flex items-center gap-1 whitespace-nowrap">
            <PiLessThan className="h-3 w-4" />
            <span className="text-sm">Go to Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="inset-x-0 bottom-0 border-b"></div>

    
      <div className="max-w-5xl mx-auto px-4 py-2 min-h-screen">
        <form onSubmit={handleSaveChanges} className="w-full md:w-1/2 lg:w-2/5 ">
          <div className="my-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2">
              Edit account details
            </h2>
            <p className="text-lg">Mobile Information</p>
          </div>

          {/* PhoneInput Component*/}
          <PhoneInput
                value={phone}
                onChange={handlePhoneChange}
                countryCode={countryCode}
                onCountryCodeChange={handleCountryCodeChange}
                hasError={false} 
      />

          <div className="mt-10 lg:pb-10">
            <button
              type="submit"
              className={`w-full bg-black text-white px-4 py-4 rounded hover:opacity-85 transition duration-300 capitalize ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SmsUpdate;
