<div className="relative mt-4">
  <div
    className="flex text-[#4D4D4D] justify-between w-full border rounded p-4 cursor-pointer"
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

  {priceBreakupOpen && (
    <div className="relative flex flex-wrap text-sm px-2 z-10 space-y-3 border-r border-l border-b">
      {/* Metal Details Display  */}
      <div className="w-full flex justify-between">
        <div>
          {metalSelected}-{metalColorSelected} (6.07 gm)
        </div>
        <div>
          <span>₹43,826.63</span>
        </div>
      </div>

      {/* Diamonds Details Display */}
      <div className="w-full flex justify-between">
        <div>Natural Diamonds (0.2ct)</div>
        <div>
          <span>₹18,000</span>
        </div>
      </div>

      {/* Gemstone Details Display */}
      <div className="w-full space-y-2">
        <div>Gemstone (1.37ct)</div>

        <div className="w-full flex justify-between">
          <div className="ml-4">Sapphire</div>
          <div>
            <span>₹959.00</span>
          </div>
        </div>
      </div>

      {/* Making Charges Display */}
      <div className="w-full flex justify-between">
        <div>Making Charge</div>
        <div>
          <span>₹{makingCharges}</span>
        </div>
      </div>

      {/* Other Costs Display */}
      <div className="w-full space-y-2">
        <div>Findings & Other Components </div>

        <div className="w-full flex justify-between">
          <div className="ml-4">Ceramic</div>
          <div>
            <span>₹6700</span>
          </div>
        </div>
      </div>

      {/* Subtotal Display */}
      <div className="w-full flex justify-between">
        <div>SubTotal</div>
        <div>
          <span>₹79,523.62</span>
        </div>
      </div>

      {/* Tax Display */}
      <div className="w-full flex justify-between">
        <div>Tax (3%)</div>
        <div>
          <span>₹2,385.71</span>
        </div>
      </div>

      {/* Total Amount Display */}
      <div className="w-full font-semibold flex justify-between">
        <div>Total</div>
        <div>
          <span>₹81,909.33</span>
        </div>
      </div>
    </div>
  )}
</div>;
