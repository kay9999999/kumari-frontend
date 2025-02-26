import { RiVipDiamondFill } from "react-icons/ri";
import { StrapiImage } from "../custom/Strapi-image";
import { SlSocialLinkedin, SlSocialYoutube } from "react-icons/sl";
import { FaPinterestP, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = ({ data }) => {
  const { amex, visa, paypal } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" overflow-hidden mt-auto relative bg-primary">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-center mt-12">
          <div className="w-[45px] h-[45px]">
            <RiVipDiamondFill className="obect-cover w-full h-full text-white " />
          </div>
        </div>
        <div className="xl:pl-32 mt-4 pl-4 font-generic text-white">
          <p className="uppercase font-between">Hey Sweetheart!</p>
          <p className="text-sm mt-1">
            Let us in on your inner circle for some fantastic offers.
          </p>
        </div>
        <div className="pl-4 pr-4 xl:pl-32 xl:pr-32 relative pt-6 w-full   ">
          <input
            type="email"
            placeholder="Email"
            className="pl-4 pr-20 py-3.5 w-full border border-gray-800  focus:outline-none "
          />
          <button className="font-between text-tertiary absolute right-4 xl:right-32 top-1/2 transform -translate-y-1/2 py-1 mt-3 px-4  ">
            SUBSCRIBE
          </button>
        </div>
        {/* footer links  */}
        <div className=" xl:pl-32 xl:pr-32 mt-9 pl-4 font-generic text-white">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
            {/* KUMARI GUIDES */}
            <div>
              <h3 className="font-semibold mb-2">MIOROLA GUIDES</h3>
              <ul className=" text-sm space-y-2">
                <li className="hover:underline cursor-pointer">Style Guide</li>
                <li className="hover:underline cursor-pointer">Size Guide</li>
                <li className="hover:underline cursor-pointer">
                  Gemstone Guide
                </li>
                <li className="hover:underline cursor-pointer">
                  Diamond Guide
                </li>
                <li className="hover:underline cursor-pointer">Metal Guide</li>
                <li className="hover:underline cursor-pointer">Gift Guide</li>
              </ul>
            </div>

            {/* LET US HELP */}
            <div>
              <h3 className="font-semibold mb-2">LET US HELP</h3>
              <ul className="text-sm space-y-2">
                <li className="hover:underline cursor-pointer">Order Status</li>
                <li className="hover:underline cursor-pointer">
                  Shipping & Returns
                </li>
                <li className="hover:underline cursor-pointer">
                  Buyback & Exchange
                </li>
                <li className="hover:underline cursor-pointer">
                  Cancellation & Refund
                </li>
                <li className="hover:underline cursor-pointer">FAQs</li>
                <li className="hover:underline cursor-pointer">Contact Us</li>
              </ul>
            </div>

            {/* ABOUT US */}
            <div>
              <h3 className="font-semibold mb-2">ABOUT US</h3>
              <ul className="text-sm space-y-2">
                <li className="hover:underline cursor-pointer">Our Story</li>
                <li className="hover:underline cursor-pointer">
                  Store Locator
                </li>
                <li className="hover:underline cursor-pointer">In the Press</li>
                <li className="hover:underline cursor-pointer">
                  Customer Reviews
                </li>
                <li className="hover:underline cursor-pointer">Blog</li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="font-semibold mb-2">LEGAL</h3>
              <ul className="text-sm space-y-2">
                <li className="hover:underline cursor-pointer">
                  Terms & Conditions
                </li>
                <li className="hover:underline cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:underline cursor-pointer">
                  Insurance Policy
                </li>
              </ul>
            </div>

            {/* ACCEPTED PAYMENTS */}
            <div className="lg:col-span-1 md:col-span-2">
              <h4 className="uppercase font-generic font-semibold whitespace-nowrap">
                Accepted Payments
              </h4>
              <ul className="flex space-x-3 ">
                <li>
                  <StrapiImage
                    src={amex.url}
                    alt="Amex"
                    width={50}
                    height={50}
                    className="mt-3.5"
                  />
                </li>
                <li>
                  <StrapiImage
                    src={visa.url}
                    alt="Visa"
                    width={50}
                    height={50}
                  />
                </li>
                <li>
                  <StrapiImage
                    src={paypal.url}
                    alt="PayPal"
                    width={50}
                    height={50}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* White Line Divider */}
        <div className="xl:pl-32 xl:pr-32 pl-4 pr-4">
          <div className="border-t border-white mt-6"></div>
        </div>

        {/* Social Links and Copyright Section */}
        <div className="lg:hidden mt-6 mb-4 xl:pl-32 xl:pr-32">
          {/* Social Links */}
          <div className="flex justify-center gap-5 lg:justify-end">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href="https://pinterest.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="text-white"
            >
              <FaPinterestP size={16} />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-white"
            >
              <SlSocialYoutube size={16} />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white"
            >
              <SlSocialLinkedin size={16} />
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-center lg:text-left mt-4 lg:mt-0">
            <p className="text-xs font-secondary font-semibold text-white">
              Copyright © {currentYear}, D.P. Jewelline Private Limited.
            </p>
          </div>
        </div>

        {/* Large Screen Layout */}
        <div className="hidden lg:pl-4 lg:pr-4 mb-4 lg:flex justify-between items-center xl:pl-32 xl:pr-32  mt-6">
          {/* Copyright Section */}
          <div className="text-xs font-secondary text-white  font-semibold">
            Copyright © {currentYear}, D.P. Jewelline Private Limited.
          </div>

          {/* Social Links */}
          <div className="flex gap-5">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-white"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href="https://pinterest.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="text-white"
            >
              <FaPinterestP size={16} />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-white"
            >
              <SlSocialYoutube size={16} />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white"
            >
              <SlSocialLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
