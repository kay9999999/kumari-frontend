import React, { useEffect, useState, useMemo } from "react";
import qs from "qs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import useFetch from "@/hooks/useFetch";
import ProductCard from "../custom/ProductCard";

// Helper: Fisher-Yates shuffle
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const RelatedProducts = ({ mainProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!mainProduct) return null;

  // Extract properties
  const currentProductId = mainProduct.id;
  const productCollection = mainProduct.collection || "";
  const mainCategories = mainProduct.categories?.map((cat) => cat.name) || [];
  const mainSubCategories =
    mainProduct.sub_categories?.map((sub) => sub.name) || [];

  // Query to get products from the same collection
  const query = qs.stringify(
    {
      populate: {
        imageVariants: {
          populate: { image: { fields: ["url"] } },
        },
        filter_values: { fields: ["value"] },
        categories: { fields: ["name"] },
        sub_categories: { fields: ["name"] },
      },
      filters: {
        id: { $ne: currentProductId },
        collection: { $eq: productCollection },
      },
      pagination: { limit: 50 }, // Fetch more than needed to randomize selection
    },
    { encodeValuesOnly: true }
  );

  const {
    data: relatedData,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch(`/api/products?${query}`);

  // Memoize related products selection to avoid re-randomization
  const computedRelatedProducts = useMemo(() => {
    if (!relatedData || relatedData.length === 0) return [];

    let candidates = shuffleArray([...relatedData]); // Clone & shuffle

    let sameCategory = [];
    let differentCategory = [];

    candidates.forEach((product) => {
      const productCategories =
        product.categories?.map((cat) => cat.name) || [];
      const productSubCategories =
        product.sub_categories?.map((sub) => sub.name) || [];

      const hasSameCategory = productCategories.some((cat) =>
        mainCategories.includes(cat)
      );
      const hasSameSubCategory = productSubCategories.some((sub) =>
        mainSubCategories.includes(sub)
      );

      if (hasSameCategory || hasSameSubCategory) {
        sameCategory.push(product);
      } else {
        differentCategory.push(product);
      }
    });

    sameCategory = shuffleArray(sameCategory);
    differentCategory = shuffleArray(differentCategory);

    let numSameCategory = Math.floor(Math.random() * 11); // Between 0-10
    let numDifferentCategory = 10 - numSameCategory;

    if (sameCategory.length < numSameCategory) {
      numDifferentCategory += numSameCategory - sameCategory.length;
      numSameCategory = sameCategory.length;
    }
    if (differentCategory.length < numDifferentCategory) {
      numSameCategory += numDifferentCategory - differentCategory.length;
      numDifferentCategory = differentCategory.length;
    }

    return shuffleArray([
      ...sameCategory.slice(0, numSameCategory),
      ...differentCategory.slice(0, numDifferentCategory),
    ]);
  }, [relatedData]); // Recompute only when `relatedData` changes

  useEffect(() => {
    if (fetchLoading) return;
    if (fetchError) {
      setError(fetchError);
      setLoading(false);
      return;
    }
    setRelatedProducts(computedRelatedProducts);
    setLoading(false);
  }, [computedRelatedProducts, fetchLoading, fetchError]);

  if (loading) return <p>Loading related products...</p>;
  if (error) return <p>Error loading related products.</p>;
  if (!relatedProducts || relatedProducts.length === 0)
    return <p>No related products found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 ">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop
        breakpoints={{
          640: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProducts;
