"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("checking");

  const jwtToken = searchParams.get("jwt");
  const userEmail = searchParams.get("userEmail");
  const confirmationToken = searchParams.get("confirmation");
  const error = searchParams.get("error");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Handle errors first
        if (error) {
          console.error("Error from backend:", error);
          router.push(`/auth/error?message=${encodeURIComponent(error)}`);
          return;
        }

        // Case 1: Already have JWT and email
        if (jwtToken && userEmail) {
          console.log("Attempting sign-in with:", { jwtToken, userEmail });

          const result = await signIn("credentials", {
            redirect: false,
            token: jwtToken,
            email: userEmail,
          });

          console.log("SignIn result:", result);

          if (result?.error) {
            throw new Error(result.error);
          }

          // Verify session actually exists
          const session = await getSession();
          console.log("Session data:", session);

          if (session?.user) {
            router.push("/account");
          } else {
            throw new Error("Session creation failed");
          }
          return;
        }

        // Case 2: Need to verify confirmation token
        if (confirmationToken) {
          if (!/^[a-f0-9]{40}$/.test(confirmationToken)) {
            throw new Error("Invalid token format");
          }

          console.log("Redirecting to Strapi for verification...");
          window.location.href = `${
            process.env.NEXT_PUBLIC_STRAPI_API_URL
          }/api/auth/email-confirmation?confirmation=${encodeURIComponent(
            confirmationToken
          )}&redirect=${encodeURIComponent(window.location.href)}`;
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        router.push(`/auth/error?message=${encodeURIComponent(error.message)}`);
      }
    };

    handleAuth();
  }, [jwtToken, userEmail, confirmationToken, error, router]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Verification failed. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Processing verification...</p>
      </div>
    </div>
  );
}
