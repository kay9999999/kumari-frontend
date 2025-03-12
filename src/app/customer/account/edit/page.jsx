"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import { PiLessThan } from "react-icons/pi";


// Validation Rule 
const ValidationRule = ({ isValid, text, isPasswordEmpty }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">
        {isPasswordEmpty ? (
          <span className="w-4 h-4 rounded-full  flex items-center justify-center">
            <IoCheckmarkCircleOutline className="w-4 h-4 text-gray-400" />
          </span>
        ) : isValid ? (
          <IoCheckmarkCircleOutline className="w-4 h-4 text-green-500" />
        ) : (
          <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
            <IoCheckmarkCircleOutline className="w-4 h-4 text-gray-700" />
          </span>
        )}
      </span>
      <span
        className={`text-sm ${
          isPasswordEmpty
            ? "text-gray-500"
            : isValid
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        {text}
      </span>

    </div>
  );
};

const EditAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pan: "",
    spouseName: "",
    dob: "",
    anniversary: "",
    changeEmail: false,
    changePassword: false,
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword:"",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [CurrentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCurrentPassword = () => {
    setCurrentPassword(!CurrentPassword);
  };

  const toggleNewPassword=()=>{
    setNewPassword(!newPassword);

  };

  const [validation, setValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "newPassword") {
      validatePassword(value);
    }
  };

  const validatePassword = (value) => {
    const minLength = value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setValidation({
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    });
  };

  const calculateStrength = () => {
    if (formData.newPassword.length === 0) return "No Password";
    const rulesSatisfied = Object.values(validation).filter((rule) => rule).length;
    if (rulesSatisfied <= 2) return "Weak";
    if (rulesSatisfied === 3) return "Medium";
    if (rulesSatisfied >= 4) return "Strong";
    return "";
  };

  const calculateStrengthPercentage = () => {
    const rulesSatisfied = Object.values(validation).filter((rule) => rule).length;
    const totalRules = Object.keys(validation).length;
    return (rulesSatisfied / totalRules) * 100;
  };

  const getStrengthColor = () => {
    const strength = calculateStrength();
    if (strength === "Weak") return "text-red-500";
    if (strength === "Medium") return "text-orange-500";
    if (strength === "Strong") return "text-green-500";
    return "text-gray-500";
  };

  const getStrengthBarColor = () => {
    const strength = calculateStrength();
    if (strength === "Weak") return "bg-red-500";
    if (strength === "Medium") return "bg-orange-500";
    if (strength === "Strong") return "bg-green-500";
    return "bg-gray-500";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    setErrors(newErrors);
  };

  return (
    <section className="w-full mt-24">
        <div className="w-full bg-white ">
              <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center mt-2 h-full">
                <span className="whitespace-nowrap text-[#4D4D4D] text-base">Hi, Username.</span>
                <Link href="/customer/account" className="hover:underline flex items-center gap-1 whitespace-nowrap">
                <PiLessThan className="h-3 w-4"/>
                <span className="text-sm">Go to Dashboard</span>
                </Link>
              </div>
            </div>
            <div className="inset-x-0 bottom-0 border-b"></div>
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center mt-2 h-full border-b">

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="my-4 ml-5">
            <h2 className="text-4xl max-md:text-sm font-bold text-[#1A1A1A] mb-6 max-sm:p-2">
              Edit account details
            </h2>
            <p className="text-lg">Account Information</p>
          </div>

          <div className="space-y-6 ml-5">
            {/* First Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                  required
                />
                <label
                  htmlFor="firstName"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  First Name
                </label>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              {/* Last Name */}
              <div className="grid grid-rows-1 grid-cols-1">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder=""
                  className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                  required
                />
                <label
                  htmlFor="lastName"
                  className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                >
                  Last Name
                </label>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* PAN */}
            <div className="grid grid-rows-1 grid-cols-1">
              <input
                type="text"
                id="pan"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                placeholder=""
                className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                required
              />
              <label
                htmlFor="pan"
                className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
              >
                PAN
              </label>
              {errors.pan && (
                <p className="text-red-500 text-sm mt-1">{errors.pan}</p>
              )}
            </div>

            {/* Spouse Name */}
            <div className="grid grid-rows-1 grid-cols-1">
              <input
                type="text"
                id="spouseName"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                placeholder=""
                className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                required
              />
              <label
                htmlFor="spouseName"
                className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
              >
                SPOUSE NAME
              </label>
              {errors.spouseName && (
                <p className="text-red-500 text-sm mt-1">{errors.spouseName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="grid grid-rows-1 grid-cols-1 relative">
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                onClick={(e) => e.target.showPicker()}
                className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500 text-black [&::-webkit-calendar-picker-indicator]:opacity-0"
                required
              />
              <label
                htmlFor="dob"
                className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
              >
                Date of Birth
              </label>
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Date of Anniversary */}
            <div className="grid grid-rows-1 grid-cols-1 relative">
              <input
                type="date"
                id="anniversary"
                name="anniversary"
                value={formData.anniversary}
                onChange={handleChange}
                onClick={(e) => e.target.showPicker()}
                className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500 text-black [&::-webkit-calendar-picker-indicator]:opacity-0"
                required
              />
              <label
                htmlFor="anniversary"
                className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
              >
                Date of Anniversary
              </label>
              {errors.anniversary && (
                <p className="text-red-500 text-sm mt-1">{errors.anniversary}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="changeEmail"
                  name="changeEmail"
                  checked={formData.changeEmail}
                  onChange={handleChange}
                  className="w-4 h-4 border-2 border-pink-500 rounded focus:ring-pink-500 checked:bg-pink-500 checked:border-pink-500 appearance-none relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0 checked:after:-top-1 checked:after:text-white checked:after:text-sm"
                />
                <label htmlFor="changeEmail" className="ml-2 text-gray-700">
                  Change Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="changePassword"
                  name="changePassword"
                  checked={formData.changePassword}
                  onChange={handleChange}
                  className="w-4 h-4 border-2 border-pink-500 rounded focus:ring-pink-500 checked:bg-pink-500 checked:border-pink-500 appearance-none relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0 checked:after:-top-1 checked:after:text-white checked:after:text-sm"
                />
                <label htmlFor="changePassword" className="ml-2 text-gray-700">
                  Change Password
                </label>
              </div>
            </div>

            {/* Change Email form */}
            {formData.changeEmail && (
              <div className="space-y-6 pt-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A]">
                  Change Email
                </h3>
                <div className="grid grid-rows-1 grid-cols-1 relative">
                  <input
                    type="email"
                    id="newEmail"
                    name="newEmail"
                    value={formData.newEmail}
                    onChange={handleChange}
                    placeholder=""
                    className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500 pr-10"
                    required
                  />
                  <label
                    htmlFor="newEmail"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                  >
                    New Email
                  </label>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <CiMail className="w-6 h-6" />
                  </div>
                  {errors.newEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.newEmail}</p>
                  )}
                </div>

                <div className="grid grid-rows-1 grid-cols-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder=""
                    className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                    required
                  />
                  <label
                    htmlFor="currentPassword"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                  >
                    Current Password
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>
              </div>
            )}

            {/* Change Password form */}
            {formData.changePassword && (
              <div className="space-y-6 pt-6">
                <h3 className="text-xl font-semibold text-[#1A1A1A]">
                  Change Password
                </h3>
                {/* Current Password */}
                <div className="grid grid-rows-1 grid-cols-1 relative">
                  <input
                    type={CurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder=""
                    className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                    required
                  />
                  <label
                    htmlFor="currentPassword"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                  >
                    Current Password
                  </label>
                  <button
                    type="button"
                    onClick={toggleCurrentPassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {CurrentPassword ? "Hide" : "Show"}
                  </button>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>
                {/* New Password */}
                <div className="grid grid-rows-1 grid-cols-1 relative">
                  <input
                    type={newPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder=""
                    className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                    required
                  />
                  <label
                    htmlFor="newPassword"
                    className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                  >
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={toggleNewPassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {newPassword ? "Hide" : "Show"}
                  </button>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>

                {/* Password Validation Rules */}
                <div className="space-y-2 mb-4">
                  <ValidationRule
                    isValid={validation.minLength}
                    text="8 or more characters"
                    isPasswordEmpty={formData.newPassword.length === 0}
                  />
                  <ValidationRule
                    isValid={validation.hasUpperCase}
                    text="At least one uppercase letter"
                    isPasswordEmpty={formData.newPassword.length === 0}
                  />
                  <ValidationRule
                    isValid={validation.hasLowerCase}
                    text="At least one lowercase letter"
                    isPasswordEmpty={formData.newPassword.length === 0}
                  />
                  <ValidationRule
                    isValid={validation.hasNumber}
                    text="At least one number"
                    isPasswordEmpty={formData.newPassword.length === 0}
                  />
                  <ValidationRule
                    isValid={validation.hasSpecialChar}
                    text="At least one special character"
                    isPasswordEmpty={formData.newPassword.length === 0}
                  />
                </div>
          {/* Password Strength Indicator */}
                  <div className="mt-4">
                    <p className={`text-sm font-medium ${getStrengthColor()}`}>
                      Strength: {calculateStrength()}
                    </p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getStrengthBarColor()}`}
                        style={{
                          width: `${calculateStrengthPercentage()}%`,
                        }}
                      ></div>
                    </div>
                  
                    {(calculateStrength() === "Weak" || calculateStrength() === "Medium") && (
                     <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                      <IoAlertCircleOutline />
                     <span >This is a required field.</span>
                      </div>
                    )}
                  </div>

                 {/* Confirm New Password */}
                 <div className="w-full">
                    <div className="grid grid-rows-1 grid-cols-1 relative mb-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        placeholder=""
                        className="peer row-start-1 col-start-1 w-full pt-4 pb-2 px-4 border outline-none focus:border-pink-500 focus:ring focus:ring-pink-500"
                        required
                      />
                      <label
                        htmlFor="confirmNewPassword"
                        className="row-start-1 col-start-1 text-gray-500 text-base transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:pt-4 peer-focus:text-sm peer-focus:-translate-y-0 peer-focus:pt-0 peer-valid:text-sm peer-valid:pt-0 pl-4 pointer-events-none"
                      >
                        Confirm New Password
                      </label>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                      
                      {errors.confirmNewPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
                      )}
                      
                    </div>
                    <span className="text-xs text-gray-500">In order to reset your password, please Sign Out and click on "Forgot Your Password?" from the Sign In page</span>
                </div>
                
              </div>
            )}

            {/* Save Changes Button */}
            <div className="mt-10 lg:pb-10">
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-4 rounded hover:opacity-85 transition duration-300 capitalize"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditAccount;
