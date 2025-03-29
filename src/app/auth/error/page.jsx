"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code");

  const errorMessages = {
    missing_token: "Missing confirmation token.",
    invalid_token_format: "Invalid token format.",
    verification_failed: "Email verification failed.",
    default: "An error occurred.",
  };

  const errorMessage = errorMessages[errorCode] || errorMessages.default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-gray-600">{errorMessage}</p>
      </div>
    </div>
  );
}
