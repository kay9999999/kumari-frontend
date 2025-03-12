"use client"
import React from 'react'
import Link from 'next/link'
import { CiHeart } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineDollar } from "react-icons/ai";
import { useState, useEffect } from 'react';
import styles from "./account.module.css"

const CustomerAccount = () => {

const [hasAddress, setHasAddress] = useState(false); 

  const cards = [ 
    {
      icon: <CiHeart className="w-8 h-8" />,
      title: "Your Wishlist",
      description: "You have 4 item(s) in your wishlist.",
      buttonText: "See your wishlist",
      link: "/wishlist/", 
    },
    {
      icon: <BsBox className="w-8 h-8" />,
      title: "Your Orders",
      description: "You do not have placed any order yet.",
      
    },
    {
      icon: <HiOutlineShoppingBag className="w-8 h-8" />,
      title: "Shared Shopping Carts",
      description: "You haven't shared your shopping bag with anyone.",
    },
    {
      icon: <AiOutlineDollar className="w-8 h-8" />,
      title: "Your Store Credit Balance: ₹0",
      description: "You can use your store credit to buy products during checkout.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      const headerOffset = header.offsetTop;

      if (window.pageYOffset > headerOffset) {
        header.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
      } else {
        header.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="my-24">
      <div id="header" className="w-full bg-white h-12">
        <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center mt-2 h-full">
          <span className="whitespace-nowrap ">Hi, Username.</span>
          <Link href="/customer/account/logout/" className="hover:underline whitespace-nowrap">
            Sign out
          </Link>
        </div>
      </div>
      <div className="inset-x-0 bottom-0 border-b"></div>

      {/* Cards */}
      <div className="bg-gray-100 pt-12 w-full">
        <div className="px-4">
          <div
            id={styles.cardSlider}
            className="flex overflow-x-auto space-x-6 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-[320px] h-40 bg-white p-4 rounded-lg shadow flex-shrink-0 flex flex-col text-left"
              >
                {/* Card links conditions */}
                {card.link ? (
                  <Link href={card.link}>
                    <div className='space-y-1 mt-2 cursor-pointer'>
                      <div className="mb-2">{card.icon}</div>
                      <h3 className="text-base font-semibold text-[#4D4D4D] mb-2">
                        {card.title}
                      </h3>
                      <p className="text-[#808080] text-sm flex-grow">{card.description}</p>
                      {card.buttonText && (
                        <button className="mt-2 hover:underline self-start">
                          {card.buttonText}
                        </button>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className='space-y-1 mt-2'>
                    <div className="mb-2">{card.icon}</div>
                    <h3 className="text-base font-semibold text-[#4D4D4D] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[#808080] text-sm flex-grow">{card.description}</p>
                    {card.buttonText && (
                      <button className="mt-2 hover:underline self-start">
                        {card.buttonText}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account Settings*/}
      <div className="max-w-5xl mx-auto min-h-screen flex items-center py-10 px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Account Settings</h1>

          {/* Information */}
          <div className="mb-8 flex flex-col md:flex-row">
            <h2 className="text-lg font-semibold md:w-1/4 mb-4 sm:mb-0">Information</h2>
            <div className="md:w-3/4">
            
              {/* Account & Mobile Details */}
              <div className="flex flex-col md:flex-row justify-between mb-10">
                <div className="mb-6 md:mb-0">
                  <p className="font-medium">Account Details</p>
                  <p className="text-gray-600">Username</p>
                  <p className="text-gray-600">username@gmail.com</p>
                  <div className="text-black cursor-pointer mt-1 flex items-center">
                    <Link href="/customer/account/edit" className="hover:underline">Edit:</Link>
                    <div className="h-4 border-l border-gray-300 mx-2"></div> 
                    <Link href="/customer/account/edit/" className="hover:underline">Change password</Link>
                </div>
                </div>
                <div>
                  <p className="font-medium">Mobile Details</p>
                  <p className="text-gray-600">+91 700000000</p>
                  <Link href="/customer/account/sms/" className="text-black hover:underline cursor-pointer mt-1">
                    Manage
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="mb-8">
                <p className="font-medium">Address Book</p>
                <p className="text-gray-600">
                  You do not have any address stored in your account.
                </p>
                <Link href="/customer/address/new/" className="text-black hover:underline cursor-pointer mt-1">
                  {hasAddress ? "Manage Address" : "Add an Address"}
                </Link>
              </div>
            </div>
          </div>

  {/* Conditional render Shipping & Billing */}
  {hasAddress && (
        <>
          {/* Shipping  */}
          <div className="mb-8 flex flex-col md:flex-row">
            <h2 className="text-lg font-semibold md:w-1/4 mb-4 sm:mb-0">Shipping</h2>
            <div className="md:w-3/4">
              <div className="flex flex-col md:flex-row justify-between mb-10">
                <div className="mb-6 md:mb-0">
                  <p className="font-medium">Shipping Contact</p>
                  <p className="text-gray-600">Username</p>
                  <p className="text-gray-600">+91 1234567890</p>
                  <div className="text-black cursor-pointer mt-1 flex items-center">
                    <Link href="/customer/account/edit" className="hover:underline">Edit</Link>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Shipping Address</p>
                  <div className="flex flex-col space-y-1">
                    <p className="text-gray-600 text-left whitespace-nowrap">lorem ipsum</p>
                    <p className="text-gray-600 text-left whitespace-nowrap">lorem ipsum</p>
                    <p className="text-gray-600 text-left whitespace-nowrap">lorem ipsum 110075</p>
                    <p className="text-gray-600 text-left whitespace-nowrap">India</p>
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
            <h2 className="text-lg font-semibold md:w-1/4 mb-4 sm:mb-0">Billing</h2>
            <div className="md:w-3/4">
              <div className="flex flex-col md:flex-row justify-between mb-10">
                <div className="mb-6 md:mb-0">
                  <p className="font-medium">Billing Contact</p>
                  <p className="text-gray-600">Username</p>
                  <p className="text-gray-600">+91 1234567890</p>
                  <div className="text-black cursor-pointer mt-1 flex items-center">
                    <Link href="/customer/account/edit" className="hover:underline">Edit</Link>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Billing Address</p>
                  <div className="flex flex-col space-y-1">
                    <p className="text-gray-600 text-left whitespace-nowrap">lorem ipsum</p>
                    <p className="text-gray-600 text-left whitespace-nowrap">lorem ipsum</p>
                    <p className="text-gray-600 text-left whitespace-nowrap">lorem ipsum 110075</p>
                    <p className="text-gray-600 text-left whitespace-nowrap">India</p>
                  </div>
                  <Link href="/customer/account/sms/" className="text-black hover:underline cursor-pointer mt-1 block">
                    Edit billing address
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
          
          {/* Payment */}
          <div className="mb-10 flex flex-col md:flex-row">
            <h2 className="text-lg font-semibold md:w-1/4 mb-4 md:mb-0">Payment</h2>
            <div className="md:w-3/4">
              <p className="font-medium">Stored Cards</p>
              <p className="text-gray-600 whitespace-nowrap">
                You can store your credit cards<br /> securely for a faster checkout.
              </p>
              <Link href="/stripe/customer/cards/" className="text-black hover:underline cursor-pointer mt-1">
                Add a card
              </Link>
            </div>
          </div>

          {/* Subscription */}
          <div className="flex flex-col md:flex-row">
            <h2 className="text-lg font-semibold md:w-1/4 mb-4 md:mb-0">Subscription</h2>
            <div className="md:w-3/4">
              <p className="font-medium">Newsletter Subscription</p>
              <p className="text-gray-600">
                You haven’t subscribed to our newsletter.
              </p>
              <Link href="/newsletter/manage/" className="text-black hover:underline cursor-pointer mt-1">
                Manage subscription
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerAccount;
