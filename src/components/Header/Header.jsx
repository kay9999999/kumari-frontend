"use client";
import { useState, useEffect } from "react";
import { MobileMenu } from "./MobileMenu";
import { IoBagOutline } from "react-icons/io5";
import { SlHeart } from "react-icons/sl";
import { GoSearch } from "react-icons/go";
import { TfiLocationPin } from "react-icons/tfi";
import BlackStrip from "./BlackStrip";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";

const Header = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dimmedNavItem, setDimmedNavItem] = useState(null);
  const [dropdownOpenItem, setDropdownOpenItem] = useState(null);
  const [dropdownTimer, setDropdownTimer] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);
  const {
    logo,
    rings,
    earrings,
    pendants,
    bangles,
    shopall,
    gifts,
    collection,
  } = data;

  const cartItems = useSelector((state) => state.cart.products);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMouseEnter = (item) => {
    // Clear any existing timer
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
      setDropdownTimer(null);
    }

    if (item !== "ABOUT US") {
      setDimmedNavItem(item); // Set the hovered link
    }

    setDropdownOpenItem(item); // Open the dropdown
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setDropdownOpenItem(null);
      setDimmedNavItem(null);
    }, 250);

    setDropdownTimer(timer);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      {/* Black Strip */}
      {isAtTop && <BlackStrip />}

      {/* Header Section */}
      <div className=" relative z-50">
        {/* Navbar */}
        <div className=" flex bg-white justify-between items-center pt-1 pb-1 relative ">
          <button
            className={`pl-2 lg:hidden text-gray-700 text-lg button-one`}
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            data-state={isMenuOpen ? "opened" : "closed"}
          >
            <svg
              className="hamburger"
              viewBox="0 0 100 100"
              width="30"
              fill="#000000"
            >
              <rect className="line top" width="60" height="8" x="20" y="25" />
              <rect
                className="line middle"
                width="60"
                height="6"
                x="20"
                y="46"
              />
              <rect
                className="line bottom"
                width="60"
                height="8"
                x="20"
                y="65"
              />
            </svg>
          </button>

          <div className="lg:hidden text-xl pl-3 cursor-pointer hover:text-gray-600">
            <GoSearch />
          </div>

          {/* Logo */}
          <Logo logo={logo} />

          {/* Navigation Links */}
          <Navigation
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            dropdownOpenItem={dropdownOpenItem}
            rings={rings}
            earrings={earrings}
            pendants={pendants}
            bangles={bangles}
            shopall={shopall}
            gifts={gifts}
            collection={collection}
          />

          {/* Icons */}
          <div className="flex-shrink-0 flex items-center gap-3 xl:gap-5 pr-2 xl:pr-4">
            <img
              src="/images/express-deliver1.webp"
              className="hidden lg:block h-10 w-10"
              title="Delivery"
            />
            <TfiLocationPin
              className="hidden lg:block text-gray-700 text-xl hover:text-gray-600 cursor-pointer"
              title="Location"
            />
            <GoSearch className="hidden lg:block text-gray-700 text-xl cursor-pointer hover:text-gray-600" />
            <SlHeart className="text-xl cursor-pointer hover:text-gray-600" />
            <div className="relative inline-block">
              <IoBagOutline className="text-xl cursor-pointer hover:text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute top-5 right-1 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold leading-none text-white bg-black rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dimmed Background with Fade-In Animation */}
      <div
        className={`fixed inset-0 transition-opacity duration-700 z-40 pointer-events-none ${
          dimmedNavItem
            ? "bg-black bg-opacity-60 opacity-80"
            : "bg-black bg-opacity-60 opacity-0"
        }`}
      ></div>

      {/* Mobile Menu Overlay */}

      <div className={`lg:hidden`}>
        {isMenuOpen && (
          <MobileMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            logo={logo}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            rings={rings}
            earrings={earrings}
            pendants={pendants}
            bangles={bangles}
            shopall={shopall}
            gifts={gifts}
            collection={collection}
          />
        )}
      </div>
      <div className="border-t border-gray-300"></div>
    </header>
  );
};

export default Header;
