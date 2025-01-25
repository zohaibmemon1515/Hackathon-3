"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    id: 1,
    src: "/assets/img/Inspiration1.png",
    title: "Inner Peace",
    subtitle: "01 — Bed Room",
  },
  {
    id: 2,
    src: "/assets/img/Inspiration2.png",
    title: "Cozy Corner",
    subtitle: "02 — Living Room",
  },
];

const Inspiration = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <section className="bg-[#fdfbf8] md:py-16 px-6 md:px-0 py-20">
      <div
        className="max-w-7xl mx-auto flex flex-col gap-14 items-center 
    md:flex-row lg:justify-around xl:px-6 lg:px-6 md:px-6"
      >
        <div
          className="flex flex-col items-center text-center 
      md:items-start md:text-left lg:w-[40%] md:w-[50%]"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            50+ Beautiful rooms inspiration
          </h1>
          <p className="text-gray-700 mt-6 text-sm md:text-sm lg:text-base">
            Our designer already made a lot of beautiful prototypes of rooms
            that inspire you.
          </p>
          <Link
            href="/Pages/Blog"
            passHref
            className="inline-block bg-[#b58e36] font-semibold text-white py-3 px-6 mt-6 rounded-lg hover:bg-[#a0782d]"
          >
            Explore More
          </Link>
        </div>

        <div className="flex flex-col items-center w-full lg:items-end lg:w-[60%] md:w-[50%] mt-6 md:mt-0">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={images[currentIndex].id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-5 left-5 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm text-gray-500">
                    {images[currentIndex].subtitle}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {images[currentIndex].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-5 right-6 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full ${
                    currentIndex === index
                      ? "bg-[#b58e36]"
                      : "bg-black opacity-50"
                  }`}
                ></button>
              ))}
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inspiration;
