import Link from "next/link";

const Breadcrumbs = ({ product }) => {
  // Handle both array and object product formats
  const mainProduct = Array.isArray(product) ? product[0] : product;
  if (!mainProduct) return null;

  // Get first category in original order
  const category = mainProduct?.categories?.[0];
  // Get first subcategory in original order
  const subCategory = mainProduct?.sub_categories?.[0];
  const productName = mainProduct.title;

  // Formatting helper
  const formatName = (str) =>
    str?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="relative">
      <div className="mx-auto max-w-screen-xl w-auto px-4 md:px-5">
        <ol className="flex flex-wrap items-center space-x-2 md:text-[11px] text-[10px]">
          {/* Home Link */}
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="pl-1"> / </span>
          </li>

          {/* Base Category */}
          <li>
            <Link href="/jewellery" className="hover:underline">
              Jewellery
            </Link>
            <span className="pl-1"> / </span>
          </li>

          {/* Dynamic Category - First Added */}
          {category?.slug && (
            <li>
              <Link
                href={`/jewellery/${category.slug || category.slug}`}
                className="hover:underline"
              >
                {formatName(category.slug)}
              </Link>
              <span className="pl-1"> / </span>
            </li>
          )}

          {/* Dynamic Subcategory - First Added */}
          {subCategory?.name && (
            <li>
              <Link
                href={`/jewellery/${category?.slug || category?.slug}/${
                  subCategory.name || subCategory.name
                }`}
                className="hover:underline"
              >
                {formatName(subCategory.name)}
              </Link>
              <span className="pl-1"> / </span>
            </li>
          )}

          {/* Product Name */}
          <li className="text-gray-500" aria-current="page">
            {productName}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Breadcrumbs;
