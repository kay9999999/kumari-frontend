import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { StrapiImage } from "../custom/Strapi-image";

export const RingsDropdown = ({ rings }) => (
  <>
    <div
      className="font-secondary pt-6 pl-6 mt-4  border-t border-gray-300 absolute w-[900px]  bg-white shadow-md z-50"
      style={{
        left: "-50px",
        right: "auto",
        ...(window.innerWidth >= 1280 && { left: "auto", right: "-910px" }),
      }}
    >
      <div className="grid grid-cols-3 pr-36 ">
        {/* First Column */}
        <div>
          <h3 className="font-medium text-secondary text-sm mb-2">
            SHOP BY STYLE
          </h3>
          <ul className="space-y-2 text-tertiary">
            <li>
              <Link
                href="/jewellery/rings/casual-rings"
                className="hover:text-primary text-xs"
              >
                Casual Rings
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/rings/bands"
                className="hover:text-primary text-xs"
              >
                Bands
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/rings/engagement-rings"
                className="hover:text-primary text-xs"
              >
                Engagement Rings
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/rings/statement-rings"
                className="hover:text-primary text-xs"
              >
                Statement Rings
              </Link>
            </li>
            <li>
              <Link
                href="/jewellery/rings/stackable-rings"
                className="hover:text-primary text-xs"
              >
                Stackable Rings
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
                  href="/jewellery/diamond-rings"
                  className="hover:text-primary text-xs"
                >
                  Diamond
                </Link>
              </li>
              <li>
                <Link
                  href="/jewellery/gold-rings"
                  className="hover:text-primary text-xs"
                >
                  Gold
                </Link>
              </li>
            </ul>
          </div>
          <div className="pt-8">
            <h3 className="font-medium text-secondary text-sm mb-2">
              SHOP FOR
            </h3>
            <ul className="space-y-2 text-tertiary">
              <li>
                <Link
                  href="/jewellery/rings-for-women"
                  className="hover:text-primary text-xs"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/jewellery/rings-for-men"
                  className="hover:text-primary text-xs"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/jewellery/rings-for-kids"
                  className="hover:text-primary text-xs"
                >
                  Kids
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col justify-between items-start mb-5 ">
          {/* Image Section */}
          <div className="flex-grow w-[360px] relative h-[225px] ">
            <Link href="/jewellery/rings">
              <StrapiImage
                src={rings?.url}
                alt="Rings"
                fill
                className="object-cover "
              />
            </Link>
          </div>

          {/* Link Section */}
          <div className="mt-2 w-full">
            <Link
              href="/jewellery/rings"
              className="flex items-center font-medium text-tertiary text-xs hover:text-primary"
            >
              <span>SHOP ALL RINGS</span>
              <GoChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default RingsDropdown;
