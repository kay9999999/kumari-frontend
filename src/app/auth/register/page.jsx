"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaEnvelope } from "react-icons/fa";
import { useSession } from "next-auth/react";
export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user.confirmed) {
      router.replace("/account");
    }
  }, [session, router]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const mobile = e.target.mobile.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const newsletter = e.target.newsletter.checked;
    const rememberMe = e.target.rememberMe.checked;

    // Store custom fields temporarily
    localStorage.setItem(
      "pendingProfileUpdate",
      JSON.stringify({ firstName, lastName, mobile })
    );

    try {
      // Step 1: Register the user with Strapi (username set to email)
      const registerRes = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: email,
            email,
            password,
          }),
        }
      );

      const registerData = await registerRes.json();
      console.log("Register Response:", registerData);

      if (!registerRes.ok) {
        localStorage.removeItem("pendingProfileUpdate"); // Clean up on failure
        setError(registerData.error.message || "Registration failed");
        return;
      }

      setSuccess(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (err) {
      console.error("Registration Error:", err);
      localStorage.removeItem("pendingProfileUpdate"); // Clean up on error
      setError("An error occurred during registration");
    }
  };

  // Define the handleResendEmail function inside the component
  const handleResendEmail = async () => {
    // You can access the email field using document.getElementById,
    // but using a controlled component or ref is a more React-friendly approach.
    const email = document.getElementById("email").value;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/resend-email-confirmation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSuccess(
          "Verification email resent successfully! Please check your email."
        );
      } else {
        setError(data.message || "Failed to resend verification email.");
      }
    } catch (err) {
      setError("An error occurred while resending the verification email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-16 mb-8">
        <h2 className="mb-8 text-2xl md:text-4xl font-bold text-start text-[#1A1A1A]">
          Sign Up
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="flex flex-col gap-4 justify-center sm:flex-row sm:gap-5 mb-8">
          <button
            className="bg-white border text-black px-4 py-2 rounded text-xs flex justify-center items-center shadow-md hover:shadow-lg transition duration-200"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <span className="w-[30px] h-[30px] mr-2 flex-shrink-0 flex items-center justify-center">
              <FcGoogle size={28} />
            </span>
            <span>Continue to Google</span>
          </button>
          <button
            className="bg-white border text-black px-4 py-2 rounded text-xs flex justify-center items-center shadow-md hover:shadow-lg transition duration-200"
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
          >
            <span className="w-[30px] h-[30px] mr-2 flex-shrink-0 flex items-center justify-center">
              <FaFacebookF size={28} color="#3b5998" />
            </span>
            <span>Continue to Facebook</span>
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <p className="text-start mb-4 text-sm text-[#404040] tracking-wide">
          If you already have an account, sign in with your email address or
          mobile number.
          <br />
          <br />
          Enjoy the great benefits and exclusive offers by creating your
          account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-base font-semibold mb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder=""
                  required
                  className="peer block w-full pt-5 pb-3 px-2 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                    peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                    peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                    peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm"
                >
                  First Name
                </label>
              </div>
              <div className="relative">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder=""
                  required
                  className="peer block w-full pt-5 pb-3 px-2 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                    peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                    peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                    peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm"
                >
                  Last Name
                </label>
              </div>
            </div>
            <div className="relative mb-4">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder=""
                required
                className="peer block w-full pt-5 pb-3 px-2 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
              />
              <label
                htmlFor="mobile"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                  peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                  peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                  peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm"
              >
                Mobile Number
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                defaultChecked
                className="mr-2 accent-[#e50068]"
              />
              <label htmlFor="newsletter" className="text-[#4D4D4D]">
                Sign Up for Newsletter
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2">
              Sign In Information
            </h3>
            <div className="relative mb-4">
              <input
                id="email"
                name="email"
                type="email"
                placeholder=""
                required
                className="peer block w-full pt-5 pb-3 px-2 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
              />
              <span className="absolute right-0 top-0 mt-5 mr-2 text-gray-400">
                <FaEnvelope />
              </span>
              <label
                htmlFor="email"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                  peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                  peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                  peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm"
              >
                Email
              </label>
            </div>
            <div className="relative mb-4">
              <input
                id="password"
                name="password"
                type="password"
                placeholder=""
                required
                className="peer block w-full pt-5 pb-3 px-2 border rounded-lg focus:ring-2 focus:ring-[#e50068] focus:outline-none transition-all duration-300"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-gray-500 transition-all duration-300
                  peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
                  peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                  peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm"
              >
                Password
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                defaultChecked
                className="mr-2 accent-[#e50068]"
              />
              <label htmlFor="rememberMe" className="text-[#4D4D4D]">
                Remember Me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
          >
            Sign Up
          </button>
        </form>
        {/* Button to trigger email resend */}
        <button
          onClick={handleResendEmail}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
        >
          Resend Verification Email
        </button>
        <p className="text-center mt-4 text-[#4D4D4D] text-sm">
          By clicking Sign Up, you agree to our{" "}
          <a href="/terms" className="text-black hover:underline">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-black hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <div className="mt-4 mb-16 text-sm text-[#4D4D4D]">
        Already have an account?{" "}
        <a href="/auth/signin" className="hover:underline text-black">
          Sign In
        </a>
      </div>
    </div>
  );
}
