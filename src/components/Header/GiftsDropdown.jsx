import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { StrapiImage } from "../custom/Strapi-image";

export const GiftsDropdown = ({ gifts }) => (
  <div
    className="font-secondary pt-6 pl-6 mt-4  border-t border-gray-300 absolute w-[900px]  bg-white shadow-md z-50"
    style={{
      left: "-574.5px",
      right: "auto",
      ...(window.innerWidth >= 1280 && { left: "auto", right: "-251px" }),
    }}
  >
    <div className="grid grid-cols-3 pr-36">
      {/* First Column */}
      <div className="mb-4">
        <div>
          <h3 className="font-medium text-secondary text-sm mb-2">
            GIFTS BY OCCASSION
          </h3>
          <ul className="space-y-2 text-tertiary">
            <li>
              <Link
                href="/jewellery/birthday"
                className="hover:text-primary text-xs"
              >
                Birthday
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/anniversary"
                className="hover:text-primary text-xs"
              >
                Anniversary
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/wedding"
                className="hover:text-primary text-xs"
              >
                Wedding
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/festive"
                className="hover:text-primary text-xs"
              >
                Festive
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-8">
          <h3 className="font-medium text-secondary text-sm mb-2">
            GIFTS BY PRICE
          </h3>
          <ul className="space-y-2 ">
            <li>
              <Link
                href="/jewellery/gifts-under-10k"
                className="hover:text-primary text-sm font-medium"
              >
                Gifts under 10K
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gifts-under-20k"
                className="hover:text-primary text-sm font-medium"
              >
                Gifts under 20K
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gifts-under-30k"
                className="hover:text-primary text-sm font-medium"
              >
                Gifts under 30K
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Second Column */}

      <div>
        <h3 className="font-medium text-secondary text-sm mb-2">GIFTS FOR</h3>
        <ul className="space-y-2 text-tertiary">
          <li>
            <Link
              href="/jewellery/gifts-for-him"
              className="hover:text-primary text-xs"
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/gifts-for-her"
              className="hover:text-primary text-xs"
            >
              Women
            </Link>
          </li>
          <li>
            <Link href="gifts-for-kids" className="hover:text-primary text-xs">
              Kids & Newborn
            </Link>
          </li>
        </ul>
      </div>

      {/* Third Column */}
      <div className="flex flex-col justify-between items-start mb-14">
        {/* Image Section */}
        <div className=" w-[360px] relative h-[225px]">
          <Link href="/jewellery/gifts">
            <StrapiImage
              src={gifts?.url}
              alt="Gifts"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        {/* Link Section */}
        <div className=" mb-1 w-full">
          <Link
            href="/jewellery/gifts"
            className="flex items-center font-medium text-tertiary text-xs hover:text-primary"
          >
            <span>SHOP ALL GIFTS</span>
            <GoChevronRight />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default GiftsDropdown;
