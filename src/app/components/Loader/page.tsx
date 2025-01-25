"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100000);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-dark-blue overflow-hidden">
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-8 border-b-8 border-[#B88E2F] mx-auto mb-6">
            <Image
              src="/assets/img/Logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="text-white font-semibold text-lg mb-4">
            <p>We are preparing something amazing for you...</p>
            <p className="text-sm opacity-70">
              Please hold on, it won&apos;t take long!
            </p>
          </div>

          <div className="relative pt-4">
            <div className="absolute top-0 left-0 w-full bg-gray-300 h-2 rounded-full">
              <div className="h-2 bg-[#B88E2F] rounded-full animate-progress"></div>
            </div>
            <div className="absolute top-6 left-0 w-full text-center text-sm text-[#B88E2F]">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white font-semibold text-xl">
            Welcome to the Website!
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
