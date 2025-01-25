import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import Image from "next/image";

const BlogBanner = () => {
  return (
    <div
      className="relative h-screen lg:h-[400px] bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/img/Banner.png')" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-auto px-4 sm:px-6">
        <Image
          src="/assets/img/Logo.png"
          alt="Logo"
          width={70}
          height={70}
          className=""
        ></Image>
        <h1 className="text-5xl mt-5 font-semibold text-black sm:text-5xl md:text-5xl">
          Blog
        </h1>
        <div className="flex items-center justify-center mt-4 text-base font-medium text-gray-600 sm:text-base gap-2">
          <Link href="/">Home</Link>
          <HiChevronRight className="text-gray-500" />
          <span>Blog</span>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
