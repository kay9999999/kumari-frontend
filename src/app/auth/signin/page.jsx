"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaFacebookF } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle the verified flag on page load.
  useEffect(() => {
    const jwt = searchParams.get("jwt");
    const email = searchParams.get("userEmail");
    if (jwt && email) {
      (async () => {
        const res = await signIn("credentials", {
          redirect: false,
          token: jwt,
          email,
          callbackUrl: "/account",
        });
        if (!res.error) {
          router.replace("/account");
        } else {
          toast.error("Automatic sign in failed. Please sign in manually.");
        }
      })();
    }
  }, [searchParams, router]);

  // If a user is already signed in and confirmed, redirect them to the homepage.
  useEffect(() => {
    if (session && session.user.confirmed) {
      router.replace("/account");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/account",
    });
    if (!res.error) {
      router.replace("/account");
    } else {
      toast.error(res.error);
    }

    // if (!res?.error) {
    //   const pendingUpdate = JSON.parse(
    //     localStorage.getItem("pendingProfileUpdate")
    //   );
    //   if (pendingUpdate) {
    //     const userId = res?.user.id;
    //     const token = res.session?.token;
    //     const updateRes = await fetch(
    //       `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/${userId}`,
    //       {
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(pendingUpdate),
    //       }
    //     );
    //     const updateData = await updateRes.json();
    //     console.log("Profile Update Response:", updateData);
    //     if (updateRes.ok) {
    //       localStorage.removeItem("pendingProfileUpdate");
    //     }
    //   }
    //   router.replace(res.url || "/");
    // } else {
    //  alert("Login failed. Please check your credentials.");
    // }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-16">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-16">
        <h2 className="mb-8 text-2xl md:text-4xl font-bold text-start text-[#1A1A1A]">
          Sign In
        </h2>
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
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              id="email"
              name="email"
              type="text"
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
                 peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm "
            >
              Email or Mobile
            </label>
          </div>
          <div className="mb-4 relative">
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
                 peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm "
            >
              Password
            </label>
          </div>
          <div className="text-right ">
            <a href="/forgot-password" className="text-sm cursor-pointer">
              Forgot your password?
            </a>
          </div>

          <div className="flex items-center ">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2 accent-[#e50068]"
            />
            <label htmlFor="rememberMe" className="text-[#4D4D4D]">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 ">
          <a href="/otp-signin" className="text-black hover:underline">
            Sign in using OTP
          </a>
        </p>
      </div>
      <div className="mt-10 mb-16 text-sm text-[#4D4D4D]">
        Don't have an account?{" "}
        <a href="/auth/register" className="hover:underline text-black">
          Create an Account
        </a>
      </div>
    </div>
  );
}
