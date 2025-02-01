import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { StrapiImage } from "../custom/Strapi-image";

export const EarringsDropdown = ({ earrings }) => (
  <div
    className="font-secondary pt-6 pl-6 mt-4 xl:mt-5 border-t border-gray-300 absolute w-[900px]  bg-white shadow-md z-50"
    style={{
      left: "-100px",
      right: "auto",
      ...(window.innerWidth >= 1280 && { left: "auto", right: "-812px" }),
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
              href="/jewellery/earrings/bali"
              className="hover:text-primary text-xs"
            >
              Bali
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/earrings/drops-danglers"
              className="hover:text-primary text-xs"
            >
              Drops & Danglers
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/earrings/studs-tops"
              className="hover:text-primary text-xs"
            >
              Studs & Tops
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/earrings/statement-earrings"
              className="hover:text-primary text-xs"
            >
              Statement Earrings
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/earrings/jhumkas"
              className="hover:text-primary text-xs"
            >
              Jhumkas
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/earrings/earcuff"
              className="hover:text-primary text-xs"
            >
              Earcuff
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/earrings/sui-dhaga"
              className="hover:text-primary text-xs"
            >
              Sui Dhaga
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
                href="/jewellery/diamond-earrings"
                className="hover:text-primary text-xs"
              >
                Diamond
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gold-earrings"
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
                href="/jewellery/earrings-for-women"
                className="hover:text-primary text-xs"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/earrings-for-kids"
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
        <div className="flex-grow w-[360px] relative h-[225px]">
          <Link href="/jewellery/earrings">
            <StrapiImage
              src={earrings?.url}
              alt="Earrings"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        {/* Link Section */}
        <div className="mt-2 w-full">
          <Link
            href="/jewellery/earrings"
            className="flex items-center font-medium text-tertiary text-xs hover:text-primary"
          >
            <span>SHOP ALL EARRINGS</span>
            <GoChevronRight />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default EarringsDropdown;
