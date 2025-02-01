import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { StrapiImage } from "../custom/Strapi-image";

export const BanglesDropdown = ({ bangles }) => (
  <div
    className="font-secondary pt-6 pl-6 mt-4 xl:mt-5 border-t border-gray-300 absolute w-[900px]  bg-white shadow-md z-50"
    style={{
      left: "-343.5px",
      right: "auto",
      ...(window.innerWidth >= 1280 && { left: "auto", right: "-410px" }),
    }}
  >
    <div className="grid grid-cols-3 pr-36">
      {/* First Column */}
      <div>
        <h3 className="font-medium text-secondary text-sm mb-2">
          SHOP BY STYLE
        </h3>
        <ul className="space-y-2 text-tertiary">
          <li>
            <Link
              href="/jewellery/bangles-bracelets/diamond-bangle"
              className="hover:text-primary text-xs"
            >
              Diamond Bangle
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/bangles-bracelets/flexi-bracelet"
              className="hover:text-primary text-xs"
            >
              Flexi Bracelet
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/bangles-bracelets/chain-bracelet"
              className="hover:text-primary text-xs"
            >
              Chain Bracelet
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/bangles-bracelets/oval-bracelet"
              className="hover:text-primary text-xs"
            >
              Oval Bracelet
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/bangles-bracelets/tennis-bracelet"
              className="hover:text-primary text-xs"
            >
              Tennis Bracelet
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/bangles-bracelets/mangalsutra-bracelet"
              className="hover:text-primary text-xs"
            >
              Mangalsutra Bracelet
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/bangles-bracelets/evil-eye-bracelet"
              className="hover:text-primary text-xs"
            >
              Evil Eye Bracelet
            </Link>
          </li>
        </ul>
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
                href="/jewellery/diamond-bracelet"
                className="hover:text-primary text-xs"
              >
                Diamond
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gold-bracelet"
                className="hover:text-primary text-xs"
              >
                Gold
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-8">
          <h3 className="font-medium text-secondary text-sm mb-2">SHOP FOR</h3>
          <ul className="space-y-2 text-tertiary">
            <li>
              <Link
                href="/jewellery/bracelet-for-women"
                className="hover:text-primary text-xs"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/bracelet-for-kids"
                className="hover:text-primary text-xs"
              >
                Kids
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Third Column */}
      <div className="flex flex-col justify-between items-start mb-5">
        {/* Image Section */}
        <div className=" w-[360px] relative h-[225px]">
          <Link href="/jewellery/bangles-bracelets">
            <StrapiImage
              src={bangles?.url}
              alt="Bangles"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        {/* Link Section */}
        <div className="mt-3 w-full">
          <Link
            href="/jewellery/bangles-bracelets"
            className="flex  items-center font-medium text-tertiary text-xs hover:text-primary"
          >
            <span>SHOP ALL BANGLES & BRACELETS</span>
            <GoChevronRight />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default BanglesDropdown;
