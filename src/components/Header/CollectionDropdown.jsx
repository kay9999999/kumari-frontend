import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { StrapiImage } from "../custom/Strapi-image";

export const CollectionDropdown = ({ collection }) => {
  // Hardcoded names for the images
  const collectionName = [
    "Heart To Get",
    "Royal Rebel",
    "Starry Eyed",
    "Flower Child",
  ];

  const links = [
    "/collections/heart-to-get",
    "/collections/royal-rebel",
    "/collections/starry-eyed",
    "/collections/flower-child",
  ];

  return (
    <>
      <div
        className=" font-secondary pt-6 pl-6 mt-4 xl:mt-5 border-t border-gray-300 absolute w-[900px] bg-white shadow-md z-50"
        style={{
          left: "-622px",
          right: "auto",
          ...(window.innerWidth >= 1280 && { left: "auto", right: "-126.5px" }),
        }}
      >
        <div className="grid grid-cols-4 gap-5 mb-5 pr-6">
          {collection.map((item, index) => (
            <div key={item.id} className="text-center">
              {/* Image */}
              <Link href={links[index]}>
                <div className="relative w-full h-[280px]">
                  <StrapiImage
                    src={item.url}
                    alt={collectionName[index] || "Collection Image"}
                    fill
                    className="object-cover w-full h-full "
                  />
                </div>
                {/* Name */}
                <p className="mt-2 text-xs font-medium text-tertiary hover:text-primary">
                  {collectionName[index]}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="  flex justify-center mb-5 w-full">
          <Link
            href="#"
            className="flex items-center font-medium text-tertiary text-xs hover:text-primary"
          >
            <span>ALL COLLECTIONS</span>
            <GoChevronRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CollectionDropdown;
