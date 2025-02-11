"use client";
import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch"; // Assuming useFetch is your custom hook
import Category_Banner from "../../../components/custom/Category_Banner"; // Import the banner component
import ProductCard from "../../../components/custom/ProductCard";
import qs from "qs";
import FilterBar from "@/components/custom/FilterBar";
import { useRouter } from "next/router";

const CategoryPage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]); // Track multiple selected filters
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [expandedFilter, setExpandedFilter] = useState(null);

  const router = useRouter();
  const { category } = router.query;

  // Define your mapping: URL slug -> categories array
  const categoryMapping = {
    "pendants-necklaces": ["pendants", "necklaces", "chains", "charms"],
    rings: ["rings"],
  };

  const categories = categoryMapping[category] || [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Sidebar open by default on larger screens
      } else {
        setIsSidebarOpen(false); // Sidebar closed by default on smaller screens
      }
    };

    handleResize(); // Set initial state based on current screen size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch filters with their values populated
  const query = qs.stringify(
    {
      populate: {
        categories: {
          fields: ["name"], // Fetch category names
        },
        filter_values: {
          populate: {
            categories: {
              fields: ["name"], // Ensure values include category relationships
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const {
    data: filters,
    loading: filtersLoading,
    error: filtersError,
  } = useFetch(`/api/filters?${query}`);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Fetch banner by slug
  const bannerQuery = qs.stringify(
    {
      filters: { category },
      populate: ["image"],
    },
    { encodeValuesOnly: true }
  );
  const {
    data: bannerData,
    loading: bannerLoading,
    error: bannerError,
  } = useFetch(`/api/banners?${bannerQuery}`);

  // Construct the products endpoint dynamically
  const productsEndpoint = qs.stringify(
    {
      populate: {
        filter_values: { fields: ["value"] },
        imageVariants: {
          populate: {
            image: { fields: ["url"] },
          },
        },
      },
      filters: {
        categories: {
          name: {
            $in: categories, // Ensure products of both categories are fetched
          }, // Ensure only products of the current category are fetched
        },
        ...(selectedFilters.length
          ? {
              filter_values: {
                value: {
                  $in: selectedFilters,
                },
              },
            }
          : {}),
      },
    },
    { encodeValuesOnly: true }
  );

  // Fetch products
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch(`/api/products?${productsEndpoint}`);

  const handleFilterChange = (value) => {
    // Add or remove the filter value from the selectedFilters array
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Add 'ALL' filter logic
  const handleAllFilter = () => {
    setSelectedFilters([]); // Clear all other filters when 'ALL' is selected
  };

  // Generate breadcrumbs based on the URL
  const generateBreadcrumbs = () => {
    const pathSegments = ["home", "jewellery", category.replace("-", " ")];
    return pathSegments.map((segment, index) => {
      const href =
        segment === "home"
          ? "/"
          : `/${pathSegments.slice(1, index + 1).join("/")}`;
      const title = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize first letter
      return { title, href };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return <div></div>;
};

export default CategoryPage;
