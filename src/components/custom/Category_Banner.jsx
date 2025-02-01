"use client";

import React from "react";
import Image from "next/image";

const Category_Banner = ({ bannerData, breadcrumbs }) => {
  if (!bannerData) {
    return <p>Loading...</p>;
  }

  const getFullImageUrl = (imagePath) =>
    imagePath ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imagePath}` : "";

  // Extract images safely
  const mobileImageUrl = getFullImageUrl(bannerData.image?.[0]?.url);
  const tabletImageUrl = getFullImageUrl(bannerData.image?.[1]?.url);
  const desktopImageUrl = getFullImageUrl(bannerData.image?.[2]?.url);

  // Check if at least one image exists
  const hasImage = mobileImageUrl || tabletImageUrl || desktopImageUrl;

  return (
    <div className="w-full">
      {/* Breadcrumbs Section */}
      <nav className="bg-gray-100 py-2 mx-auto lg:pt-4 xl:pt-6 px-4 text-xs">
        <ul className="flex space-x-2 text-gray-900">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && <span className="mr-1.5">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600">{crumb.title}</span>
              ) : (
                <a href={crumb.href} className="hover:underline">
                  {crumb.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Only Show Image Section if at least one image exists */}
      {hasImage && (
        <div className="relative w-full h-[400px] md:h-[475px] lg:h-[490px]">
          <picture>
            <source media="(max-width: 640px)" srcSet={mobileImageUrl} />
            <source
              media="(min-width: 641px) and (max-width: 1024px)"
              srcSet={tabletImageUrl}
            />
            <source media="(min-width: 1025px)" srcSet={desktopImageUrl} />
            <Image
              src={desktopImageUrl || tabletImageUrl || mobileImageUrl}
              alt={bannerData.heading || "Category Banner"}
              fill
              className="object-fill"
            />
          </picture>
        </div>
      )}

      {/* Show Heading and Description Only If Available */}
      {(bannerData.heading || bannerData.description) && (
        <div className="bg-gray-50 text-center text-customGray pt-4 px-4 pb-8">
          {bannerData.heading && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-primary mb-2">
              {bannerData.heading}
            </h1>
          )}
          {bannerData.description && (
            <p className="max-w-3xl mx-auto text-sm md:text-base">
              {bannerData.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Category_Banner;
