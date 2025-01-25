import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 xl:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-8 ">
            <h2 className="text-2xl font-bold text-gray-800">Funiro.</h2>
            <address className="text-gray-500 not-italic opacity-70 font-semibold lg:text-base md:text-sm text-base">
              400 University Drive Suite 200 Coral Gables, <br />
              FL 33134 USA
            </address>
          </div>

          <div className="sm:block md:hidden mt-5">
            <div className="flex gap-20">
              <div className="flex flex-col gap-8">
                <h3 className="text-gray-600 opacity-80 font-semibold">
                  Links
                </h3>
                <ul className="text-gray-800 space-y-8 font-semibold lg:text-base md:text-sm text-base">
                  <li>
                    <Link href="/" className="hover:text-[#B88E2F]">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/Pages/Shop" className="hover:text-[#B88E2F]">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/Pages/Blog" className="hover:text-[#B88E2F]">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Pages/Contact"
                      className="hover:text-[#B88E2F]"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-8">
                <h3 className="text-gray-600 opacity-80 font-semibold">Help</h3>
                <ul className="text-gray-800 space-y-8 font-semibold lg:text-base md:text-sm text-base">
                  <li className="hover:text-[#B88E2F] flex gap-1">
                    Payments <span className="hidden lg:block">Options</span>
                  </li>
                  <li className="hover:text-[#B88E2F] flex">Returns</li>
                  <li className="hover:text-[#B88E2F] flex gap-1">
                    Privacy <span className="hidden lg:block">Policies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-20 mt-0">
            <div className="flex flex-col gap-8">
              <h3 className="text-gray-600 opacity-80 font-semibold">Links</h3>
              <ul className="text-gray-800 space-y-8 font-semibold lg:text-base md:text-sm text-base">
                <li>
                  <Link href="/" className="hover:text-[#B88E2F]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/Pages/Shop" className="hover:text-[#B88E2F]">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/Pages/Blog" className="hover:text-[#B88E2F]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/Pages/Contact" className="hover:text-[#B88E2F]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-8">
              <h3 className="text-gray-600 opacity-80 font-semibold">Help</h3>
              <ul className="text-gray-800 space-y-8 font-semibold lg:text-base md:text-sm text-base">
                <li className="hover:text-[#B88E2F] flex gap-1">
                  Payments <span className="hidden lg:block">Options</span>
                </li>
                <li className="hover:text-[#B88E2F] flex">Returns</li>
                <li className="hover:text-[#B88E2F] flex gap-1">
                  Privacy <span className="hidden lg:block">Policies</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:mt-0 mt-5">
            <h3 className="text-gray-600 font-semibold opacity-80">
              Newsletter
            </h3>
            <form className="flex flex-wrap sm:flex-nowrap gap-0">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="flex-1 border lg:w-1/4 md:w-[15%] border-gray px-2 py-1 text-sm focus:outline-none focus:ring-0 active:border-[#B88E2F] focus:border-[#B88E2F]"
              />
              <button
                type="submit"
                className="text-sm font-semibold text-white bg-[#B88E2F] px-3 py-2"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray mt-10 pt-6 text-start max-w-7xl mx-auto px-6">
        <p className="text-gray-500 text-base font-semibold">
          © 2023 Funiro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
