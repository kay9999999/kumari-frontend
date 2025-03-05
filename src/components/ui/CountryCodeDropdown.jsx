import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CountryCodeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { code: "+1", name: "US", flag: "https://flagcdn.com/w20/us.png" },
    { code: "+44", name: "UK", flag: "https://flagcdn.com/w20/gb.png" },
    { code: "+91", name: "India", flag: "https://flagcdn.com/w20/in.png" },
    { code: "+61", name: "Australia", flag: "https://flagcdn.com/w20/au.png" },
    { code: "+81", name: "Japan", flag: "https://flagcdn.com/w20/jp.png" },
  ];

  const selectedOption =
    options.find((opt) => opt.code === value) || options[2];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef}>
      <div
        className="h-12 bg-gray-50 border-none rounded-l-lg px-2 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.code}</span>

        {isOpen ? (
          <FiChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </div>
      {isOpen && (
        <div className=" top-12 left-0 bg-white border rounded-lg shadow-lg z-20 w-40">
          {options.map((option) => (
            <div
              key={option.code}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                onChange({
                  target: { name: "countryCode", value: option.code },
                });
                setIsOpen(false);
              }}
            >
              <span className="mr-1">{option.code}</span>
              <img
                src={option.flag}
                alt={option.name}
                className="w-5 h-5 mr-1"
              />
              <span>({option.name})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PhoneInput = () => {
  const [formData, setFormData] = useState({
    phone: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" flex items-center border rounded-lg group focus-within:border-pink-500 focus-within:ring focus-within:ring-pink-500">
      <CountryCodeDropdown
        value={formData.countryCode}
        onChange={handleChange}
      />
      <div className="flex-1 grid grid-rows-1 grid-cols-1">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder=""
          className="peer row-start-1 col-start-1 w-full p-4 border outline-none rounded-lg focus:border-pink-500 focus:ring focus:ring-pink-500"
          required
        />
        <label
          htmlFor="phone"
          className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-5 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
        >
          Phone Number
        </label>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
