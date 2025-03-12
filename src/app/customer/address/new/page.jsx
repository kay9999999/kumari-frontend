"use client"
import React from 'react'
import Link from 'next/link'
import { PiLessThan } from "react-icons/pi";
import { useState } from 'react';
import PhoneInput from '@/components/ui/CountryCodeDropdown';

const page = () => {

const [errors, setErrors] = useState({});
 const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    postalCode: "",   
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
   
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "newPassword") {
      validatePassword(value);
    }
  };

  return (
    <section className="w-full my-24">
        <div className="w-full bg-white ">
              <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center mt-2 h-full">
                <span className="whitespace-nowrap text-[#4D4D4D] text-base">Hi, Username.</span>
                <Link href="/customer/account/" className="hover:underline flex items-center gap-1 whitespace-nowrap">
                <PiLessThan className="h-3 w-4"/>
                <span className="text-sm">Go to Dashboard</span>
                </Link>
              </div>
            </div>
            <div className="inset-x-0 bottom-0 border-b"></div>

            <div className="max-w-5xl mt-8 mx-auto px-4 pt-2 flex items-center">
                <div className="w-full md:w-1/2 lg:w-2/5 my-4">
                <h2 className="text-4xl max-md:text-2xl font-bold text-[#1A1A1A] mb-6 ">
              Add New Address
            </h2>
            <p className="text-lg font-semibold text-[#4D4D4D]">Contact</p>
                </div>
            </div>

      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center h-full">
      
      <div className="mt-4 space-y-4 ">
                      {/* First Name LAst Name*/}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-rows-1 grid-cols-1">
                            <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                            required
                            />
                            <label
                            htmlFor="firstName"
                            className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                            >
                            First Name
                            </label>
                            {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        
                        <div className="grid grid-rows-1 grid-cols-1">
                            <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder=""
                            className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                            required
                            />
                            <label
                            htmlFor="lastName"
                            className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                            >
                            Last Name
                            </label>
                            {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>
                      </div>

                      {/* Company */}
                      <div className="grid grid-rows-1 grid-cols-1">
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder=" "
                          className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                          required
                        />
                        <label
                          htmlFor="company"
                          className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                        >
                          Company
                        </label>
                      </div>

                      {/* Phone Number */}
                      <PhoneInput />

                      <div className="w-full md:w-1/2 lg:w-2/5">
                        <p className="text-lg mt-10 font-semibold text-[#4D4D4D]">Address</p>
                      </div>

                      {/* Apartment/Suite/Building */}
                      <div className="grid grid-rows-1 grid-cols-1">
                        <input
                          type="text"
                          id="address1"
                          name="address1"
                          value={formData.address1}
                          onChange={handleChange}
                          placeholder=" "
                          className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                          required
                        />
                        <label
                          htmlFor="address1"
                          className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                        >
                          Apartment/Suite/Building
                        </label>
                      </div>

                      {/* Street Address */}
                      <div className="grid grid-rows-1 grid-cols-1">
                        <input
                          type="text"
                          id="address2"
                          name="address2"
                          value={formData.address2}
                          onChange={handleChange}
                          placeholder=" "
                          className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                          required
                        />
                        <label
                          htmlFor="address2"
                          className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                        >
                          Street Address
                        </label>
                      </div>

                     {/* City  */}
                     <div className="grid grid-rows-1 grid-cols-1">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder=" "
                          className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                          required
                        />
                        <label
                          htmlFor="city"
                          className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                        >
                          City
                        </label>
                      </div>

                      {/* State/Province */}
                      <div className="grid grid-rows-1 grid-cols-1 bg-white">
                        <select
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent"
                          required
                        >
                          <option value="">Please select a region, state or province</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Dadra and Nagar Haveli and Daman and Diu">
                            Dadra and Nagar Haveli and Daman and Diu
                          </option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                          <option value="Ladakh">Ladakh</option>
                        </select>
                        <label
                          htmlFor="state"
                          className="row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none"
                        >
                          State/Province
                        </label>
                      </div>

                      {/* Postal Code */}
                      <div className="grid grid-rows-1 grid-cols-1">
                        <input
                          type="number"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          placeholder=" "
                          className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
                          required
                        />
                        <label
                          htmlFor="postalCode"
                          className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                        >
                          Postal Code
                        </label>
                      </div>

                      {/* Country */}
                      <div className="grid grid-rows-1 grid-cols-1 bg-white">
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="peer row-start-1 col-start-1 w-full p-4 pt-6 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500 appearance-none bg-transparent"
                          required
                        >
                          <option value="India">India</option>
                        </select>
                        <label
                          htmlFor="country"
                          className="row-start-1 col-start-1 text-gray-500 text-sm pt-1 pl-4 pointer-events-none"
                        >
                          Country
                        </label>
                      </div>

                     {/* Add Button */}
                      <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 ">
                        Save Address
                      </button>
                </div>
          </div>
 </section>
  )
}

export default page
