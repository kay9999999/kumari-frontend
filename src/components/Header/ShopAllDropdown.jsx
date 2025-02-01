import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { StrapiImage } from "../custom/Strapi-image";

export const ShopAllDropdown = ({ shopall }) => (
  <div
    className="font-secondary pt-6 pl-6 mt-4 xl:mt-5 border-t border-gray-300 absolute w-[900px]  bg-white shadow-md z-50"
    style={{
      left: "-502.5px",
      right: "auto",
      ...(window.innerWidth >= 1280 && { left: "auto", right: "-316px" }),
    }}
  >
    <div className="grid grid-cols-3 pr-36">
      {/* First Column */}
      <div className="mb-4">
        <div>
          <h3 className="font-medium text-secondary text-sm mb-2">
            ALL JEWELLERY
          </h3>
          <ul className="space-y-2 text-tertiary">
            <li>
              <Link
                href="/jewellery/lightweight-jewellery"
                className="hover:text-primary text-xs"
              >
                Lightweight Jewellery
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/nose-pins"
                className="hover:text-primary text-xs"
              >
                Nose pins
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/rose-gold-chains"
                className="hover:text-primary text-xs"
              >
                Rose Gold Chains
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gold-coins"
                className="hover:text-primary text-xs"
              >
                Gold Coins
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-8">
          <h3 className="font-medium text-secondary text-sm mb-2">SHOP FOR</h3>
          <ul className="space-y-2 text-tertiary">
            <li>
              <Link
                href="/jewellery/mens"
                className="hover:text-primary text-xs"
              >
                Mens
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/womens"
                className="hover:text-primary text-xs"
              >
                Womens
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/kids"
                className="hover:text-primary text-xs"
              >
                Kids & Newborn
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Second Column */}
      <div>
        <div>
          <h3 className="font-medium text-secondary text-sm mb-2">
            SHOP BY MATERIAL
          </h3>
          <ul className="space-y-2 text-tertiary">
            <li>
              <Link
                href="/jewellery/diamond"
                className="hover:text-primary text-xs"
              >
                Diamond
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gemstone"
                className="hover:text-primary text-xs"
              >
                Gemstone
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gold"
                className="hover:text-primary text-xs"
              >
                Gold
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/solitaire"
                className="hover:text-primary text-xs"
              >
                Solitaire
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-8">
          <h3 className="font-medium text-secondary text-sm mb-2">FEATURED</h3>
          <ul className="space-y-2 text-tertiary">
            <li>
              <Link
                href="/jewellery/new-arrivals"
                className="hover:text-primary text-xs"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/best-sellers"
                className="hover:text-primary text-xs"
              >
                Bestsellers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Third Column */}
      <div className="flex flex-col justify-between items-start mb-14">
        {/* Image Section */}
        <div className=" w-[360px] relative h-[225px]">
          <Link href="/jewellery">
            <StrapiImage
              src={shopall?.url}
              alt="ShopAll"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        {/* Link Section */}
        <div className="mb-1 w-full">
          <Link
            href="/jewellery"
            className="flex  items-center font-medium text-tertiary text-xs hover:text-primary"
          >
            <span>SHOP THE GOLD COLLECTION</span>
            <GoChevronRight />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default ShopAllDropdown;
