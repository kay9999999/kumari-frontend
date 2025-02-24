import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Transition } from "@headlessui/react";
import useFetch from "@/hooks/useFetch";

const PriceBreakup = ({
  productSlug,
  metalCode,
  diamondQuality,
  priceBreakupOpen,
  setPriceBreakupOpen,
  setFinalPrice, // Receive function from Product Page
}) => {
  const url =
    productSlug && metalCode && diamondQuality
      ? `/api/pricing/calculate-price/${productSlug}?metalCode=${metalCode}&diamondQuality=${diamondQuality}`
      : null;

  const { data: pricingData, loading, error: pricingError } = useFetch(url);

  // Send final price to parent when pricingData is available
  React.useEffect(() => {
    if (pricingData?.breakdown?.finalPrice) {
      setFinalPrice(pricingData.breakdown.finalPrice);
    }
  }, [pricingData, setFinalPrice]);

  if (!pricingData) return null;

  return (
    <div className="relative mt-4">
      {/* Toggle Button */}
      <div
        className={`flex text-[#4D4D4D] justify-between w-full border rounded-t cursor-pointer p-4 ${
          priceBreakupOpen ? "border-b border-gray-300" : ""
        }`}
        onClick={() => setPriceBreakupOpen(!priceBreakupOpen)}
      >
        <div className="flex flex-col">
          <span className="text-sm">Price Breakup</span>
        </div>
        {priceBreakupOpen ? (
          <ChevronUp className="ml-2" />
        ) : (
          <ChevronDown className="ml-2" />
        )}
      </div>

      {/* Animated Dropdown Content */}
      <Transition
        show={priceBreakupOpen}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0 transform origin-top scale-y-0"
        enterTo="opacity-100 transform origin-top scale-y-100"
        leave="transition-all duration-300 ease-in"
        leaveFrom="opacity-100 transform translate-y-0 max-h-screen"
        leaveTo="opacity-0 transform -translate-y-2 max-h-0"
      >
        <div className="relative z-10 w-full border border-t-0 border-gray-200 rounded-b overflow-hidden">
          <div className="py-4 text-[#4D4D4D] text-[13px] px-3 space-y-4 border-r border-l border-b">
            {/* Metal Details */}
            <div className="w-full flex justify-between">
              <div>
                {pricingData?.metal?.metal_type} ({pricingData?.metal?.weight}
                gm)
              </div>
              <div>
                ₹
                {parseFloat(
                  pricingData?.metal?.metalPrice || 0
                ).toLocaleString()}
              </div>
            </div>

            {/* Diamonds Details */}
            <div className="w-full flex justify-between">
              <div>Natural Diamonds ({pricingData?.diamond?.weight}ct)</div>
              <div>
                ₹
                {parseFloat(
                  pricingData?.diamond?.diamondPrice || 0
                ).toLocaleString()}
              </div>
            </div>

            {/* Making Charges */}
            <div className="w-full flex justify-between">
              <div>Making Charge</div>
              <div>
                ₹
                {parseFloat(
                  pricingData?.additional?.makingCharges || 0
                ).toLocaleString()}
              </div>
            </div>

            {/* Other Costs */}
            {pricingData?.additional?.otherComponents && (
              <div className="w-full flex justify-between">
                <div>Other Components</div>
                <div>
                  ₹
                  {parseFloat(
                    pricingData.additional.otherComponents
                  ).toLocaleString()}
                </div>
              </div>
            )}

            {/* Subtotal */}
            <div className="w-full flex justify-between">
              <div>SubTotal</div>
              <div>
                ₹
                {parseFloat(
                  pricingData?.breakdown?.subtotal || 0
                ).toLocaleString()}
              </div>
            </div>

            {/* Tax */}
            <div className="w-full flex justify-between">
              <div>
                Tax ({parseFloat(pricingData?.breakdown?.tax || 0) * 100}%)
              </div>
              <div>
                ₹
                {parseFloat(
                  pricingData?.breakdown?.taxPrice || 0
                ).toLocaleString()}
              </div>
            </div>

            {/* Total Price */}
            <div className="w-full text-sm text-[#333333] font-semibold flex justify-between">
              <div>Total</div>
              <div>
                ₹
                {parseFloat(
                  pricingData?.breakdown?.finalPrice || 0
                ).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </Transition>

      {/* Loading and Error States */}
      {priceBreakupOpen && !pricingData && !pricingError && (
        <div className="p-4 text-sm">
          {loading ? "Loading price details..." : "Price details unavailable"}
        </div>
      )}
      {priceBreakupOpen && pricingError && (
        <div className="p-4 text-sm text-red-500">
          Error loading price details: {pricingError.message}
        </div>
      )}
    </div>
  );
};

export default PriceBreakup;
