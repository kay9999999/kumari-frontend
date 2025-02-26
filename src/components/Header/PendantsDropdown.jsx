import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { StrapiImage } from "../custom/Strapi-image";

export const PendantsDropdown = ({ pendants }) => (
  <div
    className="font-secondary pt-6 pl-6 mt-4  border-t border-gray-300 absolute w-[900px]  bg-white shadow-md z-50"
    style={{
      left: "-175.5px",
      right: "auto",
      ...(window.innerWidth >= 1280 && { left: "auto", right: "-606px" }),
    }}
  >
    <div className="grid grid-cols-3 pr-36">
      {/* First Column */}
      <div className="mb-4">
        <h3 className="font-medium text-secondary text-sm mb-2">
          SHOP BY STYLE
        </h3>
        <ul className="space-y-2 text-tertiary">
          <li>
            <Link
              href="/jewellery/pendants-necklaces/statement-pendant"
              className="hover:text-primary text-xs"
            >
              Statement Pendant
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/spiritual-pendant"
              className="hover:text-primary text-xs"
            >
              Spiritual Pendant
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/spiritual-necklace"
              className="hover:text-primary text-xs"
            >
              Spiritual Necklace
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/lariats"
              className="hover:text-primary text-xs"
            >
              Lariats
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/necklace-mangalsutra"
              className="hover:text-primary text-xs"
            >
              Necklace Mangalsutra
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/fancy-mangalsutra"
              className="hover:text-primary text-xs"
            >
              Fancy Mangalsutra
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/light-weight-mangalsutra"
              className="hover:text-primary text-xs"
            >
              Light weight mangalsutra
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/statement-necklace"
              className="hover:text-primary text-xs"
            >
              Statement Necklace
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/charms"
              className="hover:text-primary text-xs"
            >
              Charms
            </Link>
          </li>
          <li>
            <Link
              href="/jewellery/pendants-necklaces/chains"
              className="hover:text-primary text-xs"
            >
              Chains
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
                href="/jewellery/diamond-pendant-necklace"
                className="hover:text-primary text-xs"
              >
                Diamond
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/gold-pendant-necklace"
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
                href="/jewellery/pendant-necklace-for-women"
                className="hover:text-primary text-xs"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/pendant-necklace-for-kids"
                className="hover:text-primary text-xs"
              >
                Kids
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Third Column */}
      <div className="flex flex-col justify-between items-start mb-24">
        {/* Image Section */}
        <div className=" w-[360px] relative h-[225px]">
          <Link href="/jewellery/pendants-necklaces">
            <StrapiImage
              src={pendants?.url}
              alt="Pendants"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        {/* Link Section */}
        <div className=" mb-2 w-full">
          <Link
            href="/jewellery/pendants-necklaces"
            className="flex items-center font-medium text-tertiary text-xs hover:text-primary"
          >
            <span>SHOP ALL PENDANTS & NECKLACES</span>
            <GoChevronRight />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default PendantsDropdown;
