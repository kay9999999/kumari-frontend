import { getStrapiURL } from "@/lib/utils";

const Categories = ({ response }) => {
  const categories = response?.data?.categories || {};
  const categoriesHover = response?.data?.categories_hover || {};

  // Filter out invalid keys like "id" from categories
  const validCategories = Object.keys(categories).filter(
    (key) => categories[key]?.url
  );

  // Create links for each category
  const categoryLinks = {
    rings: "jewelry/categories/rings",
    earrings: "jewelry/categories/earrings",
    pendants: "jewelry/categories/pendants",
    necklaces: "jewelry/categories/necklaces",
    bracelets: "jewelry/categories/bracelets",
    charms: "jewelry/categories/charms",
  };

  return (
    <div className="m-8 md:m-10 xl:m-16">
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 gap-y-6">
        {validCategories.map((category) => (
          <a href={categoryLinks[category]} key={category}>
            <div className="image-wrapper relative group overflow-hidden">
              {/* Default Image */}
              <img
                src={`${getStrapiURL()}${categories[category]?.url}`}
                alt={`${category} image`}
                className="w-full h-auto object-contain"
                loading="lazy"
              />

              {/* Hover Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  src={`${getStrapiURL()}${categoriesHover[category]?.url}`}
                  alt={`${category} hover image`}
                  className="w-full h-auto object-cover transform scale-100 transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Category title */}
            <div className="title text-left mt-2 font-secondry font-semibold text-sm uppercase">
              {category}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;
