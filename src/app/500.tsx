import { useEffect, useState } from "react";

const Custom500 = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Optionally, a loading state could be shown here
  }

  const handleTryAgain = () => {
    window.location.reload(); // Reload the page without using useRouter
  };

  return (
    <div className="h-screen flex justify-center items-center bg-dark-blue">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-500 mb-6">
          We are experiencing some technical difficulties. Please try again.
        </p>
        <button
          onClick={handleTryAgain}
          className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-6 rounded-md focus:outline-none"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Custom500;
