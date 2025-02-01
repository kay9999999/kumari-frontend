import BlackStrip from "./BlackStrip";
import Logo from "./Logo";
import Link from "next/link";
import { TfiLocationPin } from "react-icons/tfi";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { StrapiImage } from "../custom/Strapi-image";
import { GoChevronRight } from "react-icons/go";

export const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  logo,
  activeDropdown,
  setActiveDropdown,
  rings,
  earrings,
  pendants,
  bangles,
  shopall,
  gifts,
  collection,
}) => {
  const toggleDropdown = (section) => {
    setActiveDropdown((prev) => (prev === section ? "" : section));
  };

  const titles = ["Heart To Get", "Royal Rebel", "Starry Eyed", "Flower Child"];
  const links = [
    "/collections/heart-to-get",
    "/collections/royal-rebel",
    "/collections/starry-eyed",
    "/collections/flower-child",
  ];

  return (
    <div
      className={`overflow-y-auto fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-500 ease-in-out lg:hidden ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Black Strip */}
      <BlackStrip />
      <div className="flex bg-white justify-between items-center pt-2 pb-2 pr-6 border-b-2">
        <button
          className="pl-2 text-gray-700 text-lg button-one"
          onClick={() => setIsMenuOpen(false)}
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <svg
            className={`hamburger`}
            viewBox="0 0 100 100"
            width="25"
            fill="#333"
          >
            <rect
              className={`line top`}
              width="70"
              height="10"
              x="15"
              y="25"
              rx="5"
            />
            <rect
              className={`line bottom`}
              width="70"
              height="10"
              x="15"
              y="65"
              rx="5"
            />
          </svg>
        </button>

        {/* Logo */}
        <Logo logo={logo} />
      </div>

      {/* Menu */}
      <div className=" mb-4 mt-5 pl-16 md:pl-32 flex flex-col gap-6">
        {[
          {
            label: "RINGS",
            subItems: {
              "SHOP BY STYLE": [
                { name: "Casual Rings", href: "/jewellery/rings/casual-rings" },
                { name: "Bands", href: "/jewellery/rings/bands" },
                {
                  name: "Engagement Rings",
                  href: "/jewellery/rings/engagement-rings",
                },
                {
                  name: "Statement Rings",
                  href: "/jewellery/rings/statement-rings",
                },
                {
                  name: "Stackable Rings",
                  href: "/jewellery/rings/stackable-rings",
                },
              ],
              "SHOP BY MATERIAL": [
                { name: "Diamond", href: "/jewellery/diamond-rings" },
                { name: "Gold", href: "/jewellery/gold-rings" },
              ],
              "SHOP FOR": [
                { name: "Women", href: "/jewellery/rings-for-women" },
                { name: "Men", href: "/jewellery/rings-for-men" },
                { name: "Kids", href: "/jewellery/rings-for-kids" },
              ],
            },
            image: rings,
            link: {
              name: "SHOP ALL RINGS",
              href: "/jewellery/rings",
            },
          },
          {
            label: "EARRINGS",
            subItems: {
              "SHOP BY STYLE": [
                { name: "Bali", href: "/jewellery/earrings/bali" },
                {
                  name: "Drops & Danglers",
                  href: "/jewellery/earrings/drops-danglers",
                },
                {
                  name: "Studs & Tops",
                  href: "/jewellery/earrings/studs-tops",
                },
                {
                  name: "Statement Earrings",
                  href: "/jewellery/earrings/statement-earrings",
                },
                { name: "Jhumkas", href: "/jewellery/earrings/jhumkas" },
                { name: "Earcuff", href: "/jewellery/earrings/earcuff" },
                { name: "Sui Dhaga", href: "/jewellery/earrings/sui-dhaga" },
              ],
              "SHOP BY MATERIAL": [
                { name: "Diamond", href: "/jewellery/diamond-earrings" },
                { name: "Gold", href: "/jewellery/gold-earrings" },
              ],
              "SHOP FOR": [
                { name: "Women", href: "/jewellery/earrings-for-women" },
                { name: "Kids", href: "/jewellery/earrings-for-kids" },
              ],
            },
            image: earrings,
            link: { name: "SHOP ALL EARRINGS", href: "/jewellery/earrings" },
          },
          {
            label: "PENDANTS & NECKLACES",
            subItems: {
              "SHOP BY STYLE": [
                {
                  name: "Statement Pendant",
                  href: "/jewellery/pendants-necklaces/statement-pendant",
                },
                {
                  name: "Spiritual Pendant",
                  href: "/jewellery/pendants-necklaces/spiritual-pendant",
                },
                {
                  name: "Spiritual Necklace",
                  href: "/jewellery/pendants-necklaces/spiritual-necklace",
                },
                {
                  name: "Lariats",
                  href: "/jewellery/pendants-necklaces/lariats",
                },
                {
                  name: "Necklace Mangalsutra",
                  href: "/jewellery/pendants-necklaces/necklace-mangalsutra",
                },
                {
                  name: "Fancy Mangalsutra",
                  href: "/jewellery/pendants-necklaces/fancy-mangalsutra",
                },
                {
                  name: "Light weight mangalsutra",
                  href: "/jewellery/pendants-necklaces/light-weight-mangalsutra",
                },
                {
                  name: "Statement Necklace",
                  href: "/jewellery/pendants-necklaces/statement-necklace",
                },
                {
                  name: "Charms",
                  href: "/jewellery/pendants-necklaces/charms",
                },
                {
                  name: "Chains",
                  href: "/jewellery/pendants-necklaces/chains",
                },
              ],
              "SHOP BY MATERIAL": [
                {
                  name: "Diamond",
                  href: "/jewellery/diamond-pendant-necklace",
                },
                { name: "Gold", href: "/jewellery/gold-pendant-necklace" },
              ],
              "SHOP FOR": [
                {
                  name: "Women",
                  href: "/jewellery/pendant-necklace-for-women/",
                },
                { name: "Kids", href: "/jewellery/pendant-necklace-for-kids" },
              ],
            },
            image: pendants,
            link: {
              name: "SHOP ALL PENDANTS & NECKLACES",
              href: "/jewellery/pendants-necklaces",
            },
          },
          {
            label: "BANGLES & BRACELETS",
            subItems: {
              "SHOP BY STYLE": [
                {
                  name: "Diamond Bangle",
                  href: "/jewellery/bangles-bracelets/diamond-bangle",
                },
                {
                  name: "Flexi Bracelet",
                  href: "/jewellery/bangles-bracelets/flexi-bracelet",
                },
                {
                  name: "Chain Bracelet",
                  href: "/jewellery/bangles-bracelets/chain-bracelet",
                },
                {
                  name: "Oval Bracelet",
                  href: "/jewellery/bangles-bracelets/oval-bracelet",
                },
                {
                  name: "Tennis Bracelet",
                  href: "/jewellery/bangles-bracelets/tennis-bracelet",
                },
                {
                  name: "Mangalsutra Bracelet",
                  href: "/jewellery/bangles-bracelets/mangalsutra-bracelet",
                },
                {
                  name: "Evil eye bracelet",
                  href: "/jewellery/bangles-bracelets/evil-eye-bracelet",
                },
              ],
              "SHOP BY MATERIAL": [
                { name: "Diamond", href: "/jewellery/diamond-bracelet" },
                { name: "Gold", href: "/jewellery/gold-bracelet" },
              ],
              "SHOP FOR": [
                { name: "Women", href: "/jewellery/bracelet-for-women" },
                { name: "Kids", href: "/jewellery/bracelet-for-kids" },
              ],
            },
            image: bangles,
            link: {
              name: "SHOP ALL BANGLES & BRACELETS",
              href: "/jewellery/bangles-bracelets",
            },
          },
          {
            label: "SHOP ALL",
            subItems: {
              "ALL JEWELLERY": [
                {
                  name: "Lightweight Jewellery",
                  href: "/jewellery/lightweight-jewellery",
                },
                { name: "Nose pins", href: "/jewellery/nose-pins" },
                {
                  name: "Rose Gold Chains",
                  href: "/jewellery/rose-gold-chains",
                },
                { name: "Gold Coins", href: "/jewellery/gold-coins" },
              ],
              "SHOP FOR": [
                { name: "Mens", href: "/jewellery/mens" },
                { name: "Womens", href: "/jewellery/womens" },
                { name: "Kids & Newborn", href: "/jewellery/kids" },
              ],
              "SHOP BY MATERIAL": [
                { name: "Diamond", href: "/jewellery/diamond" },
                { name: "Gemstone", href: "/jewellery/gemstone" },
                { name: "Gold", href: "/jewellery/gold" },
                { name: "Solitaire", href: "/jewellery/solitaire" },
              ],
              FEATURED: [
                { name: "New Arrivals", href: "/jewellery/new-arrivals" },
                { name: "Bestsellers", href: "/jewellery/best-sellers" },
              ],
            },
            image: shopall,
            link: { name: "SHOP THE GOLD COLLECTION", href: "/jewellery/gold" },
          },
          {
            label: "GIFTS",
            subItems: {
              "GIFTS BY OCCASSION": [
                { name: "Birthday", href: "/jewellery/birthday" },
                { name: "Anniversary", href: "/jewellery/anniversary" },
                { name: "Wedding", href: "/jewellery/wedding" },
                { name: "Festive", href: "/jewellery/festive" },
              ],
              "GIFTS BY PRICE": [
                { name: "Gifts under 10K", href: "/jewellery/gifts-under-10k" },
                { name: "Gifts under 20K", href: "/jewellery/gifts-under-20k" },
                { name: "Gifts under 30K", href: "/jewellery/gifts-under-30k" },
              ],
              "GIFTS FOR": [
                { name: "Men", href: "/jewellery/gifts-for-him" },
                { name: "Women", href: "/jewellery/gifts-for-her" },
                { name: "Kids & Newborn", href: "/jewellery/gifts-for-kids" },
              ],
            },
            image: gifts,
            link: { name: "SHOP ALL GIFTS", href: "/jewellery/gifts" },
          },
        ].map((menu, index) => (
          <div key={index} className="flex flex-col">
            <button
              className="font-secondary font-between text-sm flex justify-between items-center whitespace-nowrap"
              onClick={() => toggleDropdown(menu.label)}
            >
              {menu.label}
              {menu.subItems && (
                <span className="mr-4 md:mr-24 flex-shrink-0">
                  {activeDropdown === menu.label ? (
                    <RxChevronUp className="text-gray-600 text-xl " />
                  ) : (
                    <RxChevronDown className="text-gray-600 text-xl" />
                  )}
                </span>
              )}
            </button>
            {menu.subItems && activeDropdown === menu.label && (
              <div className="pl-4 mt-5  text-sm flex flex-col gap-6">
                {Object.entries(menu.subItems).map(
                  ([subHeader, subLinks], subIndex) => (
                    <div key={subIndex} className="flex flex-col gap-4">
                      <h4 className=" font-medium text-secondary">
                        {subHeader}
                      </h4>
                      {subLinks.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="text-tertiary text-xs hover:text-primary"
                          onClick={() => setIsMenuOpen(false)} // Add this
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )
                )}
                {/* Image Placeholder */}
                {menu.image && (
                  <div className="w-3/4 h-3/4 sm:w-[450px] md:w-[500px] md:h-[300px]">
                    <Link
                      href={menu.link.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <StrapiImage
                        src={menu.image?.url}
                        alt={`${menu.label} Image`}
                        width={500}
                        height={300}
                        className="object-cover w-full h-full "
                      />
                    </Link>
                  </div>
                )}
                {/* Link Section */}
                {menu.link && (
                  <div className=" w-full">
                    <Link
                      href={menu.link.href}
                      className="flex items-center font-medium text-tertiary text-xs hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{menu.link.name}</span> <GoChevronRight />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {/* Collections Dropdown */}
        <div className="flex flex-col ">
          <button
            className="font-secondary font-between text-sm flex justify-between items-center whitespace-nowrap"
            onClick={() => toggleDropdown("COLLECTIONS")}
          >
            COLLECTIONS
            <span className="mr-4 md:mr-24 flex-shrink-0">
              {activeDropdown === "COLLECTIONS" ? (
                <RxChevronUp className="text-gray-600 text-xl" />
              ) : (
                <RxChevronDown className="text-gray-600 text-xl" />
              )}
            </span>
          </button>
          {activeDropdown === "COLLECTIONS" && (
            <div>
              <div className="mt-4 md:mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:gap-y-10 gap-x-0">
                  {collection.map((image, index) => (
                    <Link
                      href={links[index]}
                      key={index}
                      className="flex flex-col items-center w-3/4 h-3/4 sm:w-[150px] md:w-[160px] md:h-[200px]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <StrapiImage
                        src={image.url}
                        alt={titles[index] || "Collection Image"}
                        width={160}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                      <h4 className="mt-2 cursor-pointer text-tertiary text-center text-sm font-medium hover:text-primary">
                        {titles[index]}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mb-2 w-full">
                <Link
                  href="#"
                  className="flex items-center font-medium text-tertiary text-xs hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>ALL COLLECTIONS</span>
                  <GoChevronRight />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* about us */}

        <Link href="#" className="font-secondary font-between text-sm ">
          ABOUT US
        </Link>

        {/* Additional Items */}
        <Link
          href="#"
          className="font-secondary font-between text-sm flex gap-1 items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/images/express-deliver1.webp"
            className=" text-gray-700 text-xl h-6 w-6 "
            title="Delivery"
          />
          EXPRESS DELIVERY
        </Link>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-left font-secondary font-between text-sm flex gap-1 "
        >
          <TfiLocationPin
            className=" text-gray-700 text-xl hover:text-gray-600 cursor-pointer"
            title="Location"
          />
          PINCODE
        </button>
      </div>
    </div>
  );
};
