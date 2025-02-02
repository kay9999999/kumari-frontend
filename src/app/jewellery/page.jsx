"use client";
import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch"; // Assuming useFetch is your custom hook
import Category_Banner from "../../components/custom/Category_Banner"; // Import the banner component
import ProductCard from "../../components/custom/ProductCard";
import qs from "qs";
import FilterBar from "@/components/custom/FilterBar";

const JewelleryPage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]); // Track multiple selected filters
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [expandedFilter, setExpandedFilter] = useState(null);

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
      populate: "filter_values",
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
      filters: { slug: "jewellery" },
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
      populate: "*",
      filters: {
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

  // Generate breadcrumbs
  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Jewellery", href: "/jewellery" },
  ];

  return (
    <div className="pt-3 mt-16">
      {/* Banner Section */}
      {bannerLoading ? (
        <p>Loading banner...</p>
      ) : bannerError ? (
        <p>Error loading banner.</p>
      ) : (
        bannerData && (
          <Category_Banner
            bannerData={bannerData[0]}
            breadcrumbs={breadcrumbs}
          />
        )
      )}

      <div>
        <FilterBar
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          expandedFilter={expandedFilter}
          setExpandedFilter={setExpandedFilter}
        />
      </div>

      <div className="flex">
        {/* Filters pop-up */}
        <div className="md:hidden">
          {/* Dimmed Background Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-60 z-20 transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={toggleSidebar} // Close sidebar when clicking on the dimmed area
          ></div>

          {/* Sidebar */}
          <div
            className={`fixed overflow-y-auto h-[500px] top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white shadow-lg z-30 p-8 rounded-lg ${
              isSidebarOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90 pointer-events-none"
            } transition-all duration-300`}
          >
            <button
              className="absolute top-3 font-extrabold right-5 text-black"
              onClick={toggleSidebar}
            >
              ✕ {/* Close icon */}
            </button>

            <div className="mt-8">
              {/* Add ALL Filter Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleAllFilter}
                  className={`py-1 px-4 border-2 rounded-md text-sm  ${
                    selectedFilters.length === 0
                      ? " text-[#333333] border-primary"
                      : " text-[#333333] border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  All
                </button>
              </div>

              {/* Display Selected Filters */}
              {selectedFilters.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-[#333333] mb-2">
                    Selected Filters:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filter, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-xs"
                      >
                        <span>{filter}</span>
                        <button
                          onClick={() => handleFilterChange(filter)}
                          className=" pl-1 text-xs text-white hover:text-red-400"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-b border-gray-200 mb-3"></div>

              {filtersLoading ? (
                <p>Loading filters...</p>
              ) : filtersError ? (
                <p>Error loading filters.</p>
              ) : (
                filters
                  ?.filter((filter) => {
                    // Include only if filter.type is "filter" or "both"
                    if (filter.type !== "filter" && filter.type !== "both") {
                      return false;
                    }

                    return true; // Include all other filters
                  })

                  .map((filter, index, arr) => (
                    <div
                      key={filter.id}
                      className={`mb-5 relative ${
                        index !== arr.length - 1
                          ? "pb-3 border-b border-gray-200"
                          : ""
                      }`}
                    >
                      {/* Expandable Filter Section */}
                      <div className="flex items-center justify-between text-[#333333] hover:text-primary">
                        <h3 className="font-medium">{filter.filter_group}</h3>
                        <button
                          className={`flex items-center justify-center w-6 h-6 text-xl  text-gray-500 hover:text-primary transition-transform duration-500 ${
                            expandedFilter === filter.id
                              ? "rotate-90"
                              : "rotate-0"
                          }`}
                          onClick={() =>
                            setExpandedFilter((prev) =>
                              prev === filter.id ? null : filter.id
                            )
                          }
                        >
                          <span
                            className={`block transition-all duration-500 ${
                              expandedFilter === filter.id
                                ? "rotate-45"
                                : "rotate-0"
                            }`}
                          >
                            +
                          </span>
                        </button>
                      </div>

                      {/* Dropdown Options */}
                      {expandedFilter === filter.id && (
                        <div className="flex flex-col gap-2 mt-2">
                          {filter.filter_values?.map((value) => (
                            <label
                              key={value.id}
                              className="flex items-center gap-2 text-customGray text-sm hover:text-primary"
                            >
                              <input
                                type="checkbox"
                                value={value.value}
                                checked={selectedFilters.includes(value.value)}
                                onChange={() => handleFilterChange(value.value)}
                                className="form-checkbox h-3 w-3 text-blue-600 border-gray-300 rounded"
                              />
                              <span>{value.value}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div
          className={` hidden md:block transition-all duration-300 ${
            isSidebarOpen ? "w-60" : "w-0"
          }`}
        >
          <div
            className={`h-full max-w-full  p-6 overflow-hidden transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } `}
          >
            <div className="mt-2">
              {/* Add ALL Filter Button */}
              <div className=" w-full mb-6 bg-slate-50 rounded-md">
                <button
                  onClick={handleAllFilter}
                  className={`py-1.5 pl-2 pr-[162px] border-2 rounded-md text-base ${
                    selectedFilters.length === 0
                      ? "text-[#333333] border-primary"
                      : "text-[#333333] border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  All
                </button>
              </div>

              {/* Display Selected Filters */}
              {selectedFilters.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-[#333333] mb-2">
                    Selected Filters:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filter, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-xs"
                      >
                        <span>{filter}</span>
                        <button
                          onClick={() => handleFilterChange(filter)}
                          className=" pl-1 text-xs text-white hover:text-red-400"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-b border-gray-200 mb-3"></div>

              {filtersLoading ? (
                <p>Loading filters...</p>
              ) : filtersError ? (
                <p>Error loading filters.</p>
              ) : (
                filters
                  ?.filter((filter) => {
                    if (filter.type !== "filter" && filter.type !== "both") {
                      return false;
                    }

                    return true;
                  })
                  .map((filter, index, arr) => (
                    <div
                      key={filter.id}
                      className={`mb-5 relative ${
                        index !== arr.length - 1
                          ? "pb-3 border-b border-gray-200"
                          : ""
                      }`}
                    >
                      {/* Expandable Filter Section */}
                      <div className="flex items-center justify-between text-[#333333] hover:text-primary">
                        <h3 className="font-medium">{filter.filter_group}</h3>
                        <button
                          className={`flex items-center justify-center w-6 h-6 text-xl text-gray-500 hover:text-primary transition-transform duration-500 ${
                            expandedFilter === filter.id
                              ? "rotate-90"
                              : "rotate-0"
                          }`}
                          onClick={() =>
                            setExpandedFilter((prev) =>
                              prev === filter.id ? null : filter.id
                            )
                          }
                        >
                          <span
                            className={`block transition-all duration-500 ${
                              expandedFilter === filter.id
                                ? "rotate-45"
                                : "rotate-0"
                            }`}
                          >
                            +
                          </span>
                        </button>
                      </div>

                      {/* Dropdown Options */}
                      {expandedFilter === filter.id && (
                        <div className="flex flex-col gap-2 mt-2">
                          {filter.filter_values?.map((value) => (
                            <label
                              key={value.id}
                              className="flex items-center gap-2 text-customGray text-sm hover:text-primary"
                            >
                              <input
                                type="checkbox"
                                value={value.value}
                                checked={selectedFilters.includes(value.value)}
                                onChange={() => handleFilterChange(value.value)}
                                className="form-checkbox h-3 w-3 text-blue-600 border-gray-300 rounded"
                              />
                              <span>{value.value}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className={`flex-1 transition-all duration-300`}>
          {productsLoading ? (
            <p>Loading products...</p>
          ) : productsError ? (
            <p>Error loading products. Check the console for more details.</p>
          ) : products?.length > 0 ? (
            <div
              className={`grid gap-4 p-4 ${
                isSidebarOpen
                  ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                  : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found for the selected filter(s).</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JewelleryPage;
