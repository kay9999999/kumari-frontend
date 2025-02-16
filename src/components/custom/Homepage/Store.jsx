import React from "react";
import { getStrapiURL } from "@/lib/utils";
import Image from "next/image";

const Store = ({ response }) => {
  const storeImages = response?.data?.store || [];

  return (
    <div className="w-full h-full mt-16 mb-8">
      <a href="#">
        {/* Image for smaller screens */}
        {storeImages.length > 0 && (
          <div className="block md:hidden w-full h-full ">
            <Image
              src={`${getStrapiURL()}${storeImages[0]?.url || ""}`}
              alt="Store for Mobile"
              width={1920}
              height={1080}
              className="w-full h-auto"
              quality={100}
            />
          </div>
        )}

        {/* Image for larger screens */}
        {storeImages.length > 1 && (
          <div className="hidden md:block w-full h-full">
            <Image
              src={`${getStrapiURL()}${storeImages[1]?.url || ""}`}
              alt="Store for Desktop"
              width={1920}
              height={1080}
              className="w-full h-auto "
              quality={100}
            />
          </div>
        )}

        {storeImages.length === 0 && (
          <div className="text-center text-red-500">
            No images available for the store.
          </div>
        )}
      </a>
    </div>
  );
};

export default Store;
