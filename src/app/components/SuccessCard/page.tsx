"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const SuccessCard: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Use searchParams only on the client side
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    setIsMounted(true);

    // Only access searchParams in useEffect to ensure it's on the client side
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  if (!isMounted || !searchParams) {
    return null;
  }

  const email = searchParams.get("email") || "unknown";
  const orderId = searchParams.get("orderId") || "12345XYZ";

  const handleNavigation = () => {
    setLoading(true);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#f9fafb] via-[#ececec] to-[#f9fafb]">
      <div className="bg-white rounded-xl p-8 w-full max-w-md text-center shadow-md relative">
        <div className="text-[#B88E2F] mb-6 animate-pulse">
          <FaCheckCircle className="h-20 w-20 mx-auto" />
        </div>

        <h1
          className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight"
          role="heading"
          aria-level={1}
        >
          Order Confirmed!
        </h1>

        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Thank you for your purchase! Your order has been successfully placed.
        </p>
        <p className="text-gray-600 text-sm mb-4">
          We&apos;ve sent the order details to your email:{" "}
          <span className="font-semibold text-gray-800">{email}</span>.
        </p>

        <p className="text-gray-600 text-sm">
          Your Order ID:{" "}
          <span className="font-semibold text-gray-800">{orderId}</span>
        </p>

        <button
          onClick={handleNavigation}
          disabled={loading}
          className={`mt-8 w-full px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-transform duration-300 ease-in-out transform ${
            loading
              ? "bg-gray-400 text-gray-800 cursor-not-allowed scale-95"
              : "bg-[#B88E2F] text-white hover:bg-[#b0882a] hover:scale-105"
          }`}
        >
          {loading ? "Processing..." : "Go Back Home"}
        </button>

        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#B88E2F] opacity-10 rounded-full"></div>
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-[#B88E2F] opacity-10 rounded-full"></div>
      </div>
    </div>
  );
};

export default SuccessCard;
