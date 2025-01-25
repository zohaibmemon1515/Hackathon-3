import Link from "next/link";
const Hero = () => {
    return (
      <section
        className="relative lg:h-full lg:py-32 h-screen bg-cover bg-center flex items-center justify-end px-6"
        style={{ backgroundImage: "url('/assets/img/Hero.png')" }}
      >
        <div className="w-full max-w-7xl mx-auto flex justify-end xl:pr-6 lg:pr-0">
          <div className="bg-[#FFF3E3] bg-opacity-90 w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-lg shadow-lg lg:mt-20">
            <p className="text-xs sm:text-sm uppercase text-[#333333] font-semibold">New Arrival</p>
            <h1 className="text-2xl sm:text-[2.5rem] font-bold text-yellow-700 leading-snug sm:leading-tight">
              Discover Our New Collections
            </h1>
            <p className="text-sm sm:text-base text-[#333333] mt-4 font-medium">
              Discover premium furniture designed to elevate your home. Enjoy
              timeless designs, unmatched comfort, and outstanding craftsmanship.
            </p>
            <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-700 text-white font-bold rounded-lg hover:bg-yellow-600 transition">
              <Link href="/Pages/Shop">
              Explore Now
              </Link>
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  
