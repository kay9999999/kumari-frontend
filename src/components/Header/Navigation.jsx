import Link from "next/link";
import RingsDropdown from "./RingsDropdown";
import EarringsDropdown from "./EarringsDropdown";
import PendantsDropdown from "./PendantsDropdown";
import BanglesDropdown from "./BanglesDropdown";
import ShopAllDropdown from "./ShopAllDropdown";
import GiftsDropdown from "./GiftsDropdown";
import CollectionDropdown from "./CollectionDropdown";

export const Navigation = ({
  handleMouseEnter,
  handleMouseLeave,
  dropdownOpenItem,
  rings,
  earrings,
  pendants,
  bangles,
  shopall,
  gifts,
  collection,
}) => {
  const links = [
    "/jewellery/rings",
    "/jewellery/earrings",
    "/jewellery/pendants-necklaces",
    "/jewellery/bangles-bracelets",
    "/jewellery",
    "/jewellery/gifts",
    "/collections",
    "/about-us",
  ];

  return (
    <nav id="nav-menu" className="hidden lg:flex gap-3 xl:gap-4 relative">
      {[
        "RINGS",
        "EARRINGS",
        "PENDANTS & NECKLACES",
        "BANGLES & BRACELETS",
        "SHOP ALL",
        "GIFTS",
        "COLLECTIONS",
        "ABOUT US",
      ].map((item, index) => (
        <div
          key={item}
          className="group relative"
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={links[index]}
            className="font-secondary font-semibold text-[11px] xl:text-sm hover:text-primary"
          >
            <span className="relative">
              {item}
              <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out origin-left"></span>
            </span>
          </Link>
          {dropdownOpenItem === item &&
            ((item === "RINGS" && <RingsDropdown rings={rings} />) ||
              (item === "EARRINGS" && (
                <EarringsDropdown earrings={earrings} />
              )) ||
              (item === "PENDANTS & NECKLACES" && (
                <PendantsDropdown pendants={pendants} />
              )) ||
              (item === "BANGLES & BRACELETS" && (
                <BanglesDropdown bangles={bangles} />
              )) ||
              (item === "SHOP ALL" && <ShopAllDropdown shopall={shopall} />) ||
              (item === "GIFTS" && <GiftsDropdown gifts={gifts} />) ||
              (item === "COLLECTIONS" && (
                <CollectionDropdown collection={collection} />
              )))}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
