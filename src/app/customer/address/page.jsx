import React from 'react'
import Link from 'next/link'
import { PiLessThan } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";


const Address = () => {
  return (

    <section className='my-24'>

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


    <div className="max-w-5xl mx-auto min-h-screen flex items-center pt-10 px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Default Addresses</h1>
            {/* Shipping  */}
            <div className="mb-8 flex flex-col md:flex-row text-[#4D4D4D]">
            <h2 className="text-xl font-semibold md:w-1/4 mb-4 sm:mb-0">Shipping</h2>
            <div className="md:w-3/4">
            <div className="flex flex-col md:flex-row justify-between mb-10">
                <div className="mb-6 md:mb-0">
                <p className="font-semibold">Shipping Contact</p>
                <p>Username</p>
                <p>+91 1234567890</p>
                <div className="text-black cursor-pointer mt-1 flex items-center">
                    <Link href="/customer/account/edit" className="hover:underline">Edit</Link>
                </div>
                </div>
                <div>
                <p className="font-semibold text-[#4D4D4D]">Shipping Address</p>
                <div className="flex flex-col space-y-1">
                    <p className="text-left whitespace-nowrap">lorem ipsum</p>
                    <p className="text-left whitespace-nowrap">lorem ipsum</p>
                    <p className="text-left whitespace-nowrap">lorem ipsum 110075</p>
                    <p className="text-left whitespace-nowrap">India</p>
                </div>
                <Link href="/customer/account/sms/" className="text-black hover:underline cursor-pointer mt-1 block">
                    Edit shipping address
                </Link>
                </div>
            </div>
            </div>
            </div>

            {/* Billing  */}
            <div className="mb-8 flex flex-col md:flex-row">
                <h2 className="text-xl font-semibold md:w-1/4 mb-4 sm:mb-0 text-[#4D4D4D]">Billing</h2>
                <div className="md:w-3/4">
                <div className="flex flex-col md:flex-row justify-between mb-10 text-[#4D4D4D]">
                    <div className="mb-6 md:mb-0">
                    <p className="font-semibold">Billing Contact</p>
                    <p>Username</p>
                    <p>+91 1234567890</p>
                    <div className="text-black cursor-pointer mt-1 flex items-center">
                        <Link href="/customer/account/edit" className="hover:underline">Edit</Link>
                    </div>
                    </div>
                    <div>
                    <p className="font-semibold text-[#4D4D4D]">Billing Address</p>
                    <div className="flex flex-col space-y-1">
                        <p className="text-left whitespace-nowrap">lorem ipsum</p>
                        <p className="text-left whitespace-nowrap">lorem ipsum</p>
                        <p className="text-left whitespace-nowrap">lorem ipsum 110075</p>
                        <p className="text-left whitespace-nowrap">India</p>
                    </div>
                    <Link href="/customer/account/sms/" className="text-black hover:underline cursor-pointer mt-1 block">
                        Edit billing address
                    </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    {/* Additional Addresses */}
    <div className="w-full bg-[#fafafa]">
      <div className="max-w-5xl mx-auto min-h-screen flex flex-col gap-4 py-10 px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Additional Addresses</h1>
        <Link 
          href="/customer/address/new/" 
          className="w-full sm:w-1/2 md:w-1/3 min-h-44 bg-white flex flex-col gap-2 items-center justify-center rounded-lg"
        >
          <FaPlus className="w-8 h-8 text-[#b5b5b5]" />
          <span className="text-gray-700 font-medium">Add address</span>
        </Link>
      </div>
    </div>

  </section>
  )
}

export default Address
